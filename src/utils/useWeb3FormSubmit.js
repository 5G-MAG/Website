import { useState } from 'react';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Requires a real Web3Forms access key, obtained by whoever owns the
// destination inbox: submit the address at https://web3forms.com, confirm
// the email Web3Forms sends, then paste the key it gives you wherever a
// form using this hook is rendered. Until then, submission shows a clear
// inline error instead of silently failing.
export const PLACEHOLDER_WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

// Shared submit flow for every Web3Forms-backed form on the site (Contact,
// Early Access, ...): builds the payload from a <form> element, posts it,
// and tracks idle/submitting/success/error state so each form component
// only has to render its own fields.
export default function useWeb3FormSubmit(accessKey, subject) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  async function submit(form, extraFields = {}) {
    if (!accessKey || accessKey === PLACEHOLDER_WEB3FORMS_KEY) {
      setStatus('error');
      setErrorMessage(
        'This form is not fully configured yet — it needs a real Web3Forms access key.'
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      access_key: accessKey,
      subject,
      // Honeypot: left unchecked by real visitors, auto-filled by most
      // bots. Web3Forms silently drops submissions where this is truthy.
      botcheck: form.botcheck.checked,
      ...extraFields,
    };

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong — please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the form service — check your connection and try again.');
    }
  }

  return { status, errorMessage, submit };
}

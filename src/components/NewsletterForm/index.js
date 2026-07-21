import { useEffect, useState } from 'react';
import styles from './styles.module.css';

// Brevo's embedded signup form is the only safe way to wire a mailing list
// into a static, GitHub-Pages-hosted site: it's a public, form-scoped
// endpoint meant to be exposed in HTML (same trust model as a Web3Forms
// access key). Brevo's general REST API key is NOT — it grants broad
// account access (read/write on every contact, campaigns, etc.), so it
// must never be embedded in client-side code; anyone viewing page source
// could lift it and use up your account's quota or read your contact list.
//
// Setup (one-time, in the Brevo dashboard):
//   1. Contacts -> Lists -> create a list (e.g. "5G-MAG Updates").
//   2. Contacts -> Forms -> Create a form -> Classic form, attach it to
//      that list, enable double opt-in (required for GDPR-compliant
//      consent — Brevo emails the subscriber a confirmation link before
//      they're actually added).
//   3. In the form's "Setup" step, set the confirmation-page redirect to
//      this site with a query param, e.g.
//      https://<this-site>/early-access?newsletter=subscribed — that's
//      how the component below shows an inline "thanks" message even
//      though the actual submission is a real page navigation to Brevo,
//      not a fetch() call (kept deliberately plain-HTML-form rather than
//      AJAX, since Brevo's form endpoint isn't documented as CORS-enabled
//      for cross-origin fetch the way Web3Forms explicitly is).
//   4. Share tab -> copy the exact <form> HTML Brevo generates. Its
//      "action" URL and hidden input names (list ID, locale, a per-form
//      token, etc.) are unique per account/form — replace the
//      placeholders below with exactly what Brevo gives you.
const PLACEHOLDER_ACTION = 'YOUR_BREVO_FORM_ACTION_URL';
const DEFAULT_HIDDEN_FIELDS = {
  // Typical Brevo classic-form hidden fields — confirm/replace these
  // against the real embed code from step 4 above, field names can vary.
  email_address_check: '',
  locale: 'en',
};

export default function NewsletterForm({
  action = PLACEHOLDER_ACTION,
  hiddenFields = DEFAULT_HIDDEN_FIELDS,
  successParam = 'newsletter',
  successValue = 'subscribed',
}) {
  const [subscribed, setSubscribed] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(successParam) === successValue) {
      setSubscribed(true);
    }
  }, [successParam, successValue]);

  const notConfigured = !action || action === PLACEHOLDER_ACTION;

  function handleSubmit(event) {
    if (!consentChecked) {
      event.preventDefault();
      setShowConsentError(true);
      return;
    }
    if (notConfigured) {
      event.preventDefault();
    }
  }

  if (subscribed) {
    return (
      <div className={styles.notice}>
        <strong>Thanks for subscribing!</strong>
        <p>Check your inbox to confirm your email address.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} action={action} method="POST" onSubmit={handleSubmit}>
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className={styles.row}>
        <input
          type="email"
          name="EMAIL"
          placeholder="you@example.com"
          required
          autoComplete="email"
          className={styles.emailInput}
        />
        <button type="submit" className="button button--primary">
          Subscribe
        </button>
      </div>

      <label className={styles.consentRow}>
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => {
            setConsentChecked(e.target.checked);
            setShowConsentError(false);
          }}
        />
        <span>
          I agree to receive 5G-MAG email updates (no spam, promised) and have read the{' '}
          <a href="https://www.5g-mag.com/privacy" target="_blank" rel="noreferrer">
            privacy notice
          </a>
          .
        </span>
      </label>

      {showConsentError && (
        <p className={styles.errorText}>Please confirm you agree before subscribing.</p>
      )}
      {notConfigured && (
        <p className={styles.errorText}>
          This form is not fully configured yet — it needs a real Brevo form action URL.
        </p>
      )}
    </form>
  );
}

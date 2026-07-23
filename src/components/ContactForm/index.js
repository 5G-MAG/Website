import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import useWeb3FormSubmit from '@site/src/utils/useWeb3FormSubmit';
import styles from './styles.module.css';

// Shared free-tier sitekey Web3Forms provides for zero-signup hCaptcha use.
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

export default function ContactForm({ accessKey, subject, submitLabel = 'Send message' }) {
  const { status, errorMessage, submit } = useWeb3FormSubmit(accessKey, subject);
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    await submit(
      form,
      {
        name: form.name.value,
        email: form.email.value,
        organization: form.organization.value,
        message: form.message.value,
      },
      captchaToken
    );
    // Tokens are single-use — always reset so the next attempt gets a fresh one.
    captchaRef.current?.resetCaptcha();
    setCaptchaToken('');
  }

  if (status === 'success') {
    return (
      <div className={styles.notice}>
        <strong>Thanks — your message has been sent.</strong>
        <p>We&apos;ll get back to you as soon as we can.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="checkbox"
        name="botcheck"
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <label className={styles.field}>
        <span>
          Organization <span className={styles.optional}>(optional)</span>
        </span>
        <input type="text" name="organization" autoComplete="organization" />
      </label>

      <label className={styles.field}>
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>

      <HCaptcha sitekey={HCAPTCHA_SITEKEY} reCaptchaCompat={false} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken('')} ref={captchaRef} />

      {status === 'error' && <p className={styles.errorText}>{errorMessage}</p>}

      <button type="submit" className="button button--primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

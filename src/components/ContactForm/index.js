import useWeb3FormSubmit from '@site/src/utils/useWeb3FormSubmit';
import styles from './styles.module.css';

export default function ContactForm({ accessKey, subject, submitLabel = 'Send message' }) {
  const { status, errorMessage, submit } = useWeb3FormSubmit(accessKey, subject);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    submit(form, {
      name: form.name.value,
      email: form.email.value,
      organization: form.organization.value,
      message: form.message.value,
    });
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

      {status === 'error' && <p className={styles.errorText}>{errorMessage}</p>}

      <button type="submit" className="button button--primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import projectsData from '@site/src/data/projects.json';
import useWeb3FormSubmit from '@site/src/utils/useWeb3FormSubmit';
import styles from './styles.module.css';

// "Dependency" repos (forks 5G-MAG maintains internally, e.g. open5gs) are
// not something an external contributor would request early access to —
// only real reference-tool projects are offered here.
const REQUESTABLE_PROJECTS = projectsData.filter((p) => p.name !== 'Dependency').map((p) => p.name);

// Shared free-tier sitekey Web3Forms provides for zero-signup hCaptcha use.
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

export default function EarlyAccessForm({
  accessKey,
  subject = 'New Early Access Request — 5G-MAG website',
}) {
  const { status, errorMessage, submit } = useWeb3FormSubmit(accessKey, subject);
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    await submit(
      form,
      {
        name_affiliation: form.name_affiliation.value,
        github_handle: form.github_handle.value,
        is_contributor: form.is_contributor.value,
        requested_project: form.requested_project.value,
        is_member: form.is_member.value,
        email: form.email.value,
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
        <strong>Thanks for submitting!</strong>
        <p>We&apos;ll come back to you soon.</p>
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

      <label className={styles.field}>
        <span>Name / Affiliation</span>
        <input type="text" name="name_affiliation" required />
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Your GitHub handle</span>
          <input type="text" name="github_handle" required placeholder="e.g. octocat" />
        </label>
        <label className={styles.field}>
          <span>Your e-mail</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <label className={styles.field}>
        <span>Request access to</span>
        <select name="requested_project" required defaultValue="">
          <option value="" disabled>
            Choose a project…
          </option>
          {REQUESTABLE_PROJECTS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Are you a 5G-MAG Reference Tools contributor?</span>
          <select name="is_contributor" required defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label className={styles.field}>
          <span>Are you a 5G-MAG member?</span>
          <select name="is_member" required defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>

      <HCaptcha sitekey={HCAPTCHA_SITEKEY} reCaptchaCompat={false} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken('')} ref={captchaRef} />

      {status === 'error' && <p className={styles.errorText}>{errorMessage}</p>}

      <p className={styles.legal}>
        By submitting this form, you are consenting to be contacted by 5G-MAG Association.
      </p>

      <button type="submit" className="button button--primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}

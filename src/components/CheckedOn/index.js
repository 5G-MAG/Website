import styles from './styles.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function format(value) {
  // YAML reads an unquoted 2026-10-16 as a date, so accept both a date and a string.
  const iso = value instanceof Date ? value.toISOString() : String(value || '');
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : null;
}

// "Checked on 16 Oct 2026 against TS 26.501 V19.4.0": shown at the foot of a Technology or Specifications page when
// its frontmatter has `checked: 2026-10-16` (a date) and, optionally, `checkedAgainst: TS 26.501 V19.4.0`. The date
// is set by the editor who checked the page; nothing is derived from the repository history.
export default function CheckedOn({ checked, against }) {
  const date = format(checked);
  if (!date) return null;
  return (
    <p className={styles.checked}>
      Checked on {date}
      {against ? ` against ${against}` : ''}.
    </p>
  );
}

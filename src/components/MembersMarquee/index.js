import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import { MEMBERS } from '@site/src/data/members';
import styles from './styles.module.css';

// Doubled so the track can loop seamlessly: translating the doubled track
// exactly -50% lands back on an identical copy of the start, with no visible
// seam. Order is fixed (not shuffled) so the loop point is never obvious.
function LogoTile({ member, withBaseUrl, ariaHidden }) {
  return (
    <a
      className={styles.tile}
      href={member.href}
      target="_blank"
      rel="noreferrer"
      title={member.name}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
    >
      <img
        src={withBaseUrl(`/assets/images/members/${member.logo}`)}
        alt={ariaHidden ? '' : member.name}
        loading="lazy"
      />
    </a>
  );
}

export default function MembersMarquee() {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {MEMBERS.map((m) => (
          <LogoTile key={m.name} member={m} withBaseUrl={withBaseUrl} />
        ))}
        {/* Duplicate, hidden from assistive tech and tab order — visual-only
            continuation of the loop. */}
        {MEMBERS.map((m) => (
          <LogoTile key={`${m.name}-dup`} member={m} withBaseUrl={withBaseUrl} ariaHidden />
        ))}
      </div>
    </div>
  );
}

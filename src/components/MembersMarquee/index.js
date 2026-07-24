import { useEffect, useState } from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { MEMBERS } from '@site/src/data/members';
import styles from './styles.module.css';

// Fisher-Yates — used client-side only (see the effect below), never during
// the build's static render, so server HTML and the client's first paint
// stay identical and React never sees a hydration mismatch.
function shuffle(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Doubled so the track can loop seamlessly: translating the doubled track
// exactly -50% lands back on an identical copy of the start, with no visible
// seam.
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
  // Starts as the plain MEMBERS order (matches what the build's static HTML
  // rendered) and is reshuffled once the component mounts in the browser —
  // a fresh random order per page load, without an SSR/hydration mismatch.
  const [members, setMembers] = useState(MEMBERS);

  useEffect(() => {
    setMembers(shuffle(MEMBERS));
  }, []);

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {members.map((m) => (
          <LogoTile key={m.name} member={m} withBaseUrl={withBaseUrl} />
        ))}
        {/* Duplicate, hidden from assistive tech and tab order — visual-only
            continuation of the loop. */}
        {members.map((m) => (
          <LogoTile key={`${m.name}-dup`} member={m} withBaseUrl={withBaseUrl} ariaHidden />
        ))}
      </div>
    </div>
  );
}

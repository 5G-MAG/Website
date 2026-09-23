import Link from '@docusaurus/Link';
import GodeeperCard from '@site/src/components/GodeeperCard';
import { DOMAIN_PILLARS } from '@site/src/data/domainPillars';

// Shared "What We Work On" grid -- used identically by the homepage and
// /about, so the two pages tell one consistent story instead of two
// slightly different ones. A pillar with chips shows them as links inside
// the card; a pillar with none (RTC, NTN) instead sets href on the card
// itself, so the whole card is the link rather than a redundant single
// chip repeating the card's own title.
export default function DomainPillarGrid() {
  return (
    <div className="godeeper-grid godeeper-grid--4col">
      {DOMAIN_PILLARS.map((p) => (
        <GodeeperCard
          key={p.title}
          title={p.title}
          icon={p.icon}
          href={p.href}
          body={
            p.chips.length ? (
              <div className="domain-pillar-chips">
                {p.chips.map((c) => (
                  <Link key={c.label} to={c.href} className="domain-pillar-chip">
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : null
          }
        />
      ))}
    </div>
  );
}

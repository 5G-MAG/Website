import Link from '@docusaurus/Link';
import GodeeperCard from '@site/src/components/GodeeperCard';
import { DOMAIN_PILLARS } from '@site/src/data/domainPillars';

// "What We Work On" grid, currently rendered only on /about (the homepage
// links to /about#what-we-work-on instead of rendering its own copy -- see
// SHOWCASE_SLIDES' comment in index.js). Kept as its own component, not
// inlined into about/index.js, so a page can render it directly if that
// changes again. A pillar with chips shows them as links inside the card;
// a pillar with none (RTC, NTN) instead sets href on the card itself, so
// the whole card is the link rather than a redundant single chip repeating
// the card's own title.
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

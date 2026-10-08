import Link from '@docusaurus/Link';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import { icon } from '@site/src/components/GodeeperCard';
import { ICON_CATALOG } from '@site/src/data/baskets';

// The one shared 3-card row every per-project /tech page opens its "How
// It Works, Today" section with (raised directly: "build generic cards
// for the technical analysis - specifications - software accelerator" --
// each of the 17 pages had been hand-copying its own icon path consts
// for these three, which is exactly the drift risk raised earlier ("you
// are not using the right icons... this is a disaster if not all
// updated automatically"). Icons now come from the one shared
// ICON_CATALOG (src/data/taxonomy.json) instead of a hardcoded const
// per page, so a future icon-catalog change reaches every page for free.
//
// `accent` is accepted but no longer applied to these 3 cards (2026-09-27,
// direct instruction: "revert the colors in the tech analysis
// specification reference tools card per project... only the
// repositories will keep the color") -- left in the signature rather than
// removed from all 18 flagship-page call sites, which still pass it in.
//
// `analysisHref`/`standardsHref`/`softwareHref`: the three destinations
// (this project's own tech_url or a sub-analysis page, standards_url,
// doc_url) -- one single "Explore More" link each, not a multi-link
// footer (raised directly: "just add a 'Explore More' for each one").
// `analysisHref` in particular often has no single obviously-correct
// sub-page to send a reader to when a project's Technical Analysis
// spans several of them -- pick one as a placeholder (e.g. the first/
// primary overview) rather than agonizing over ranking them ("you will
// have to take a random decision of what to pick"). `softwareHref`
// omitted or null renders the placeholder card instead of a fabricated
// link -- taxonomy.json's own doc_url is null for a real handful of
// projects (NTN, RTC, NPN, TSC as of this writing). `softwarePlaceholderRepo`:
// the one real repo some of those still have with no dedicated page of
// their own (e.g. RTC's rt-3gpp-swap) -- shown as a link on the
// placeholder instead of silently hiding it. `softwareIsTestbed`: true
// renders "Software Accelerator" with the Testbeds icon/desc instead of
// Reference Tools' -- raised directly ("given we have testbeds maybe
// make clear if it is reference tools or testbed").
export default function ProjectDestinationCards({
  analysisHref,
  standardsHref,
  softwareHref,
  softwareIsTestbed = false,
  softwarePlaceholderRepo,
}) {
  return (
    <div className="godeeper-grid">
      <HubDestinationCard
        title="Technical Analysis"
        desc="A blueprint of how this technology works, and what it's good for."
        href={analysisHref}
        linkLabel="Explore More"
        icon={icon(iconPaths('doc-report'))}
      />
      <HubDestinationCard
        title="Specifications"
        desc="The real specifications this technology is built on."
        href={standardsHref}
        linkLabel="Explore More"
        icon={icon(iconPaths('certificate'))}
      />
      {softwareHref ? (
        <HubDestinationCard
          title="Software Accelerator"
          desc={
            softwareIsTestbed
              ? 'Built by the community, putting the specification to the test.'
              : 'Built by the community, turning the specification into working code.'
          }
          href={softwareHref}
          linkLabel="Explore More"
          icon={icon(iconPaths(softwareIsTestbed ? 'flask' : 'code'))}
        />
      ) : (
        <div className="godeeper-card godeeper-card--static">
          <div className="godeeper-card__band" style={{ background: 'var(--ifm-color-emphasis-500)' }}>
            {icon(iconPaths('code'))}
            <h3>Software Accelerator</h3>
          </div>
          <div className="godeeper-card__body">
            <p>There are no Reference Tools for this topic yet.</p>
            <p>
              <Link to="/contributing">Contribute to build them &rarr;</Link>
            </p>
            {softwarePlaceholderRepo && (
              <p>
                <a href={softwarePlaceholderRepo.href}>{softwarePlaceholderRepo.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function iconPaths(key) {
  const paths = ICON_CATALOG[key];
  return (
    <>
      {(paths || []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

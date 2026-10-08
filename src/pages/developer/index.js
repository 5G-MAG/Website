import BalancedLogo from '@site/src/components/BalancedLogo';
import { FACT_PROJECTS, FACT_REPOSITORIES, FACT_CLONES, FACT_DEV_CALL } from '@site/src/data/facts';
import StatRow from '@site/src/components/StatRow';
import OpenSourceFromTheStart from '@site/src/components/OpenSourceFromTheStart';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import EarlyAccessCallout from '@site/src/components/EarlyAccessCallout';
import ProjectIcon from '@site/src/components/ProjectIcon';
import HubDestinationCard from '@site/src/components/HubDestinationCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import VideoGrid from '@site/src/components/VideoGrid';
import { icon } from '@site/src/components/GodeeperCard';
import styles from './index.module.css';
// Shared with /reference-tools, /tutorials and /testbeds; see the comment
// there for why (2026-08-24 findability audit; extended here for the
// All Repositories section's own filter bar).
import filterStyles from '../reference-tools/styles.module.css';
import youtubePlaylists from '@site/static/data/youtube-playlists.json';
import { mergeDeveloperVideos } from '@site/src/data/developerVideos';
import { ALL_REPOS, CONTRIBUTORS, ICON_CATALOG, filterRepos } from '@site/src/data/baskets';

// A repo row's own project icon -- the same taxonomy.json `icon` catalog
// key every other hub page reads (r.projectIcon, set in ALL_REPOS), not
// ProjectIcon/SLIDE_ICONS above (a different, PRODUCT_TYPES-only icon set
// keyed by card label, not a taxonomy icon key). Same pattern reference-
// tools/testbeds/tech/homepage each keep their own copy of.
function iconForCatalogKey(key) {
  const paths = key && ICON_CATALOG[key];
  if (!paths || !paths.length) return null;
  return icon(
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

const DEV_HERO_ICON_PATH = (
  <>
    <path d="M7 8l-4 4l4 4" />
    <path d="M17 8l4 4l-4 4" />
    <path d="M14 4l-4 16" />
  </>
);

// Labels and descriptions sourced from the 5G-MAG Portfolio Slides (slide 9:
// "The Media Connectivity Software Accelerator") rather than written from
// scratch -- except the Tutorials card, whose label the deck calls "Application
// Prototypes": every page under it is a real, working, already-built walkthrough,
// not a prototype-stage one.
const PRODUCT_TYPES = [
  {
    icon: 'Reference Tools',
    label: 'Reference Tools',
    description: 'Standards, turned into open code anyone can build on.',
    href: '/reference-tools',
  },
  {
    icon: 'Testbeds',
    label: 'Testbeds & Evaluation Frameworks',
    description: 'Reproducible test environments and benchmark frameworks.',
    href: '/testbeds',
  },
  {
    icon: 'Tutorials',
    label: 'Tutorials',
    description: 'Step-by-step guides to run and test the Reference Tools.',
    href: '/tutorials',
  },
  {
    icon: 'Developer Tools',
    label: 'Developer Tools',
    description: 'Tools for 5G-MAG members that support the transition of standards into deployments.',
    href: '/developer-tools',
  },
];

const PILLARS = [
  {
    title: 'Early feedback and validation',
    body: 'Implementation evidence that informs specification development before standards are finalised.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Software projects & Dev community',
    body: 'A community of standards experts, developers and implementers, building software projects together.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'No duplication and fast deployment',
    body: 'Shared reference implementations mean no one builds the same thing twice.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 5v14l8 -7z" />
        <path d="M13 5v14l8 -7z" />
      </svg>
    ),
  },
  {
    title: 'Open by design and IPR-friendly',
    body: 'IPR-friendly licensing, designed from the start for broad industry participation.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
  },
];

function PillarCard({ title, body, icon }) {
  return (
    <div className={styles.pillarCard}>
      {icon && <div className={styles.pillarIcon}>{icon}</div>}
      <h3 className={styles.pillarTitle}>{title}</h3>
      <p className={styles.pillarBody}>{body}</p>
    </div>
  );
}

function ProductTypeCard({ icon, label, description, href }) {
  return (
    <HubDestinationCard
      icon={<ProjectIcon name={icon} />}
      title={label}
      desc={description}
      href={href}
    />
  );
}

export default function Home() {
  const demoRigImg = useBaseUrl('/assets/images/gallery/reference-tools-demo-rig.jpg');
  const camaraDemoImg = useBaseUrl('/assets/images/gallery/camara-dedicated-networks-demo.png');
  // Hooks can't be called inside the CONTRIBUTORS.map callback below
  // (rules-of-hooks); resolve the directory once and concatenate.
  const contributorsBaseUrl = useBaseUrl('/assets/images/contributors/');
  const overviewPdfUrl = useBaseUrl('/docs/Reference_Tools_Overview.pdf');
  const location = useLocation();
  const [repoQuery, setRepoQuery] = useState('');
  const filteredRepos = useMemo(() => filterRepos(repoQuery), [repoQuery]);

  // Picks up ?tool=... from the homepage's own search (src/pages/index.js's
  // handleToolSearch) so that search continues here instead of landing on
  // an unfiltered list the visitor has to redo -- client-only (useEffect),
  // since the query string isn't part of the statically built page.
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('tool');
    if (q) setRepoQuery(q);
  }, [location.search]);
  return (
    <Layout
      title="Software Accelerator"
      description="Open-source reference implementations — from specifications to working code"
    >
      <HubHero
        title="Media Connectivity Software Accelerator"
        icon={DEV_HERO_ICON_PATH}
        actions={[
          <Link key="community" className="button button--primary" to="/community">
            Developer Community
          </Link>,
          <a
            key="overview"
            className="button button--outline button--primary"
            href={overviewPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Overview &#8595;
          </a>,
        ]}
      />

      <main>
        {/* Why It Matters, first -- why this exists, before the browsable
            destinations below (raised directly: "motivation first and
            then the 3 cards"). */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why It Matters</h2>
            <p className={styles.sectionSubtitle}>
              Media and network technologies move fast, and open source usually arrives only
              after a standard is frozen — with additional cost at every stage along the way. The
              Accelerator closes both gaps.
            </p>

            <div className={styles.pillarGrid}>
              {PILLARS.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
            <div className={styles.pillarActions}>
              <Link className="button button--primary button--lg" to="/community">
                Learn about the Developer Community
              </Link>
            </div>
          </div>
        </section>

        {/* Product Types -- the actual browsable destinations (Reference
            Tools, Testbeds, Tutorials, Developer Tools), the cards after Why It Matters. */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What You&apos;ll Find Here</h2>
            <p className={styles.sectionSubtitle}>
              Reference Tools, Testbeds and Evaluation Frameworks, Tutorials and Developer Tools —
              under one open developer community.
            </p>
            <div className={styles.productGrid}>
              {PRODUCT_TYPES.map((item) => (
                <ProductTypeCard key={item.href} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Standards and Open Source, then the Accelerator in numbers: the order of
            the 5G-MAG General Deck's Software Accelerator part (aligned 2026-09-29). */}
        <OpenSourceFromTheStart />
        <StatRow
          alt
          title="Software Accelerator in numbers"
          subtitle="Counted daily from the project pages and GitHub."
          facts={[FACT_PROJECTS, FACT_REPOSITORIES, FACT_CLONES, FACT_DEV_CALL]}
        />

        {/* Contributors -- reordered ahead of License/Early Access
            (2026-09-26, direct instruction: "order of importance after
            reference tools, testbeds and showcase is: Developer Community,
            License, Early Access, Developer Exchanges"). memberCard picks up
            the same colored top-border/hover-lift language as every other
            card on this page (2026-08-26: raised directly, this section
            read as visually flat/an afterthought next to the bold cards
            around it). Left as plain .section, not .sectionAlt: the next
            section (License Model) already uses .sectionAlt, and two tinted
            sections back to back would trade one rhythm problem for
            another. */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Growing community of developers</h2>
            <p className={styles.sectionSubtitle}>
              Organizations contributing to the Media Connectivity Software Accelerator.
            </p>
            <div className={styles.membersGrid}>
              {CONTRIBUTORS.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  title={c.name}
                  className={styles.memberCard}
                >
                  <BalancedLogo src={`${contributorsBaseUrl}${c.logo}`} />
                  <span className={styles.memberCardName}>{c.name.split(' - ')[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="container" style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
            <Link to="/community#becoming-a-contributor">Become a contributor &rarr;</Link>
          </div>
        </section>

        {/* License Model -- content taken from the Overview deck (slide 10,
            "A note on the Open-Source Software Licenses"), not written fresh
            here: same two blocks, "What is the License Model?" and "How to
            Contribute?", reproduced from that slide rather than paraphrased
            from docs/home/license.mdx as before. */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>License Model</h2>
            <p className={styles.sectionSubtitle}>Protecting IPR. Enabling industry collaboration.</p>

            <div className={styles.licenseGrid}>
              <div className={styles.licenseBox}>
                <h3 className={styles.licenseBoxTitle}>What is the License Model?</h3>
                <ul className={styles.licenseList}>
                  <li>
                    The 5G-MAG Public License v1.0 is a modified version of Apache 2.0 which allows:
                    <ul>
                      <li>
                        <strong>Free Non-Commercial Use:</strong> freely use, copy, modify, and
                        distribute the code for non-commercial purposes, including study, academic
                        research, testing, and validation.
                      </li>
                      <li>
                        <strong>Commercial Exploitation:</strong> use the reference tools and
                        software within commercial services, trials, and live deployments, but with{' '}
                        <strong>FRAND Patent Licensing</strong>: if used commercially, the built-in
                        patent clause ensures that any essential contributor patents are made
                        available under <strong>FRAND</strong> (Fair, Reasonable, and
                        Non-Discriminatory) terms.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Repositories with software derived from other licenses keep their own license
                    according to their own terms.
                  </li>
                </ul>
              </div>

              <div className={styles.licenseBox}>
                <h3 className={styles.licenseBoxTitle}>How to Contribute?</h3>
                <ul className={styles.licenseList}>
                  <li>Sign an Individual or Corporate Contributor License Agreement (CLA).</li>
                  <li>Anybody can become a contributor (no need to be a 5G-MAG member to contribute code).</li>
                  <li>
                    5G-MAG members get priority in support from the 5G-MAG Project Office, and
                    additional development resources may be provided. 5G-MAG members define
                    priorities and where to dedicate resources.
                  </li>
                  <li>
                    Membership of 5G-MAG remains open to the industry, to boost and scale your
                    software project by joining forces.
                  </li>
                </ul>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link className="button button--primary" to="/license">
                See the full License Model &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Early Access */}
        <section className={styles.section}>
          <div className="container">
            <EarlyAccessCallout />
          </div>
        </section>

        {/* Our Work In Action: photos + videos together */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Our Work In Action</h2>
            <p className={styles.sectionSubtitle}>
              Reference Tools running on real hardware, at real events — and recent demos and
              tutorials from the developer community.
            </p>
            <div className={styles.photoGrid}>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src={demoRigImg}
                  alt="5G-MAG Reference Tools demo rig with SDR hardware and phones running 5GMS and volumetric demos"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  A Reference Tools demo rig — SDR hardware and phones running live 5GMS and
                  volumetric video demos.
                </p>
              </figure>
              <figure className={styles.photoFigure}>
                <img
                  className={styles.photoImg}
                  src={camaraDemoImg}
                  alt="CAMARA Dedicated Networks reference tool demo interface"
                  loading="lazy"
                />
                <p className={styles.photoCaption}>
                  The CAMARA Dedicated Networks reference tool, reserving a network area on a live
                  map.
                </p>
              </figure>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <VideoGrid videos={mergeDeveloperVideos(youtubePlaylists.developer?.videos, 4)} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600 }}>
              <Link to="/developer/exchanges">Browse the Developer Exchanges video gallery &rarr;</Link>
            </div>
          </div>
        </section>

        {/* All Repositories -- raised directly: a visitor who knows a
            specific tool's name (e.g. "CMMF Encoder") but not which
            project owns it had no way to reach it from the homepage in
            fewer than ~5 clicks. Plain .section (not .sectionAlt): "Our
            Work In Action" right above already uses .sectionAlt, and
            two tinted sections back to back would trade one rhythm
            problem for another (same reasoning as Contributors' own
            comment above). */}
        <section
          id="all-repositories"
          className={styles.section}
          style={{ scrollMarginTop: 'calc(var(--ifm-navbar-height) + 0.5rem)' }}
        >
          <div className="container">
            <h2 className={styles.sectionTitle}>All Repositories</h2>
            <p className={styles.sectionSubtitle}>
              Every real code repository across every Reference Tools and Testbeds project, in
              one place. Know the name of a specific tool but not which project it belongs to?
              Search for it here.
            </p>
            <div className={filterStyles.filterBar}>
              <input
                type="search"
                className={filterStyles.filterInput}
                placeholder={`Search ${ALL_REPOS.length} repositories by name, project or technology…`}
                value={repoQuery}
                onChange={(e) => setRepoQuery(e.target.value)}
                aria-label="Search all repositories"
              />
              {repoQuery && (
                <span className={filterStyles.filterCount}>
                  {filteredRepos.length} of {ALL_REPOS.length}
                </span>
              )}
            </div>
            {filteredRepos.length === 0 ? (
              <p className={filterStyles.filterEmpty}>
                No repositories match &ldquo;{repoQuery}&rdquo;. Try a broader name (e.g. the
                project, or a technology like &ldquo;Android&rdquo;).
              </p>
            ) : (
              <div className={styles.repoList}>
                {filteredRepos.map((r) => (
                  <div key={r.key} className={styles.repoRow}>
                    <span className={styles.repoProjectIcon}>{iconForCatalogKey(r.projectIcon)}</span>
                    <div className={styles.repoMain}>
                      <a href={r.url} target="_blank" rel="noreferrer" className={styles.repoName}>
                        {r.name}
                      </a>
                      {/* only the MBS branch is named on the site; every other entry is read as its main branch */}
                      {r.branch === '5mbs' && <span className={styles.repoBranch}>{r.branch}</span>}
                      {r.description && <p className={styles.repoDesc}>{r.description}</p>}
                    </div>
                    <div className={styles.repoMeta}>
                      <Link to={r.projectHref} className={styles.repoProject}>
                        {r.projectName}
                      </Link>
                      {r.software.length > 0 && (
                        <div className={styles.repoTags}>
                          {r.software.map((s) => (
                            <span key={s} className={styles.repoTag}>
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <JoinTheEffort id="community" alt />
      </main>
    </Layout>
  );
}

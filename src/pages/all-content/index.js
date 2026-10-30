import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import contentIndex from '@site/static/data/content-index.json';
import { ALL_PROJECTS, BASKETS, BASKET_PAGE, displayNameOf, projectTitleOf } from '@site/src/data/baskets';
import styles from '../tech/index.module.css';
import page from './styles.module.css';

const LIST_ICON_PATH = (
  <>
    <path d="M9 6l11 0" />
    <path d="M9 12l11 0" />
    <path d="M9 18l11 0" />
    <path d="M5 6l0 .01" />
    <path d="M5 12l0 .01" />
    <path d="M5 18l0 .01" />
  </>
);

// Pages that are not documentation files (the hubs and the area pages), by area. Everything else is drawn from the content
// index (static/data/content-index.json), so a new page appears here by itself under the area of its address.
const AREAS = [
  {
    key: 'solutions',
    title: 'Solutions and Technology',
    text: 'The areas of work and the technical analysis of every project.',
    hubs: [
      ...BASKETS.map((b) => ({ url: BASKET_PAGE[b.key], title: b.title })).filter((h) => h.url),
      { url: '/tech', title: 'Where We Stand: all projects by area' },
    ],
    prefix: ['tech'],
    group: 'project',
  },
  {
    key: 'standardisation',
    title: 'Standardisation',
    text: 'Specifications, feedback and requirements, and contributions to standards bodies and other industry fora.',
    hubs: [
      { url: '/standards', title: 'Standardisation' },
      { url: '/ls', title: 'Liaison Statements & Inputs' },
      { url: '/surveys', title: 'Industry Surveys' },
    ],
    prefix: ['standards'],
  },
  {
    key: 'accelerator',
    title: 'Software Accelerator',
    text: 'The open-source software: Reference Tools, Testbeds, Validation Tools, Playgrounds and the tutorials that run them.',
    hubs: [
      { url: '/developer', title: 'Software Accelerator' },
      { url: '/reference-tools', title: 'Reference Tools' },
      { url: '/testbeds', title: 'Testbeds' },
      { url: '/validation', title: 'Validation Tools' },
      { url: '/playgrounds', title: 'Playgrounds' },
      { url: '/tutorials', title: 'Tutorials' },
      { url: '/kits', title: 'Deployment Kits' },
      { url: '/developer-tools', title: 'Developer Tools' },
      { url: '/community', title: 'Developer Community' },
    ],
    prefix: ['reference-tools', 'testbeds', 'validation', 'playgrounds', 'kits', 'developer-tools', 'tutorials'],
    group: 'tool',
  },
  {
    key: 'deployments',
    title: 'Deployments',
    text: 'Demos, plugfests, testing and interoperability.',
    hubs: [{ url: '/deployments', title: 'Deployments' }],
    prefix: ['deployments'],
  },
  {
    key: 'about',
    title: 'About, Membership, Events and News',
    text: 'The association, how to join, what is coming up and what has happened.',
    hubs: [
      { url: '/about', title: 'About Us' },
      { url: '/membership', title: 'Membership' },
      { url: '/events', title: 'Events' },
      { url: '/news', title: 'News' },
      { url: '/videos', title: 'Videos' },
      { url: '/podcast', title: 'Podcast' },
      { url: '/magazine', title: 'Magazine' },
    ],
    prefix: ['about', 'structure', 'partnerships', 'decks', 'contact', 'membership', 'events', 'workshops', 'subscribe', 'privacy', 'contributing', 'license', 'early-access', 'community', 'public-call', 'internal-call', 'fmt', 'surveys'],
  },
];

const sectionOf = (url) => url.split('/').filter(Boolean)[0] || '';
const NAMES = new Map(ALL_PROJECTS.map((p) => [`/${(p.tech_url || '').replace(/^\//, '')}`, projectTitleOf(p)]));
ALL_PROJECTS.forEach((p) => {
  if (p.doc_url) NAMES.set(p.doc_url.replace(/\/$/, ''), displayNameOf(p));
});

function groupsOf(area) {
  const pages = contentIndex.filter((p) => area.prefix.includes(sectionOf(p.url)));
  const map = new Map();
  for (const p of pages) {
    const parts = p.url.split('/').filter(Boolean);
    const depth = area.group ? 2 : 1;
    const key = '/' + parts.slice(0, Math.min(depth, parts.length)).join('/');
    const label = NAMES.get(key) || parts.slice(0, Math.min(depth, parts.length)).slice(-1)[0].replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    if (!map.has(key)) map.set(key, { key, label, items: [] });
    map.get(key).items.push(p);
  }
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export default function AllContent() {
  const total = contentIndex.length;
  return (
    <Layout
      title="All content"
      description="Every section and page of the Media Connectivity Association website in one place, from the solution areas to the tutorials."
    >
      <HubHero
        title="All content"
        icon={LIST_ICON_PATH}
        actions={[
          <Link key="home" className="button button--primary" to="/">Home</Link>,
          <Link key="tut" className="button button--outline button--primary" to="/tutorials">Tutorials</Link>,
        ]}
      />
      <main>
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionSubtitle}>
              Every section of the site with its pages, {total} documentation pages in all. Use the search at the top
              of any page to find a word.
            </p>
            {AREAS.map((area) => {
              const groups = groupsOf(area);
              return (
                <div key={area.key} className={page.area} id={area.key}>
                  <h2 className={page.areaTitle}>{area.title}</h2>
                  <p className={page.areaText}>{area.text}</p>
                  <ul className={page.hubs}>
                    {area.hubs.map((h) => (
                      <li key={h.url}><Link to={h.url}>{h.title}</Link></li>
                    ))}
                  </ul>
                  {groups.length > 0 && (
                    <div className={page.groups}>
                      {groups.map((g) => (
                        <details key={g.key} className={page.group}>
                          <summary>
                            {g.label} <span className={page.count}>{g.items.length}</span>
                          </summary>
                          <ul className={page.items}>
                            {g.items.map((i) => (
                              <li key={i.url}><Link to={i.url}>{i.title}</Link></li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </Layout>
  );
}

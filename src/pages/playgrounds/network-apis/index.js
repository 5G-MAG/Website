import { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import RepoRows from '@site/src/components/RepoRows';
import { ALL_REPOS } from '@site/src/data/baskets';
import styles from '../../tech/index.module.css';
import page from './styles.module.css';

const PLAY_ICON_PATH = <path d="M7 4v16l13 -8l-13 -8" />;
const REPO = 'https://github.com/5G-MAG/rt-camara-examples';

// The three ways to use the examples repository. All of them connect to the same sandbox.
const WAYS = [
  {
    id: 'portal',
    name: 'Browser portal',
    for: 'Node.js, for production teams',
    text: 'A guided portal for the Dedicated Networks APIs: areas, networks, accesses and profiles, with a one-click Quick Booking shortcut.',
    code: ['git clone https://github.com/5G-MAG/rt-camara-examples', 'cd rt-camara-examples/management-portal/DedicatedNetworks', 'npm install', 'npm start'],
    tutorial: { label: 'Tutorial: Dedicated Networks Portal', to: '/reference-tools/network-apis/tutorials/dedicated-networks-portal' },
  },
  {
    id: 'mcp',
    name: 'AI assistant',
    for: 'MCP server, in plain language',
    text: 'A Python MCP server offers the four Dedicated Networks APIs as 12 tools and 4 guided workflows. Ask in plain language: the assistant finds the service area, picks a profile, reserves the network and gives devices access.',
    code: ['cd rt-camara-examples/mcp-servers/dedicated-networks', '# then add the server to your AI assistant, following its README'],
    tutorial: { label: 'Tutorial: Dedicated Networks with MCP Server', to: '/reference-tools/network-apis/tutorials/dedicated-networks-mcp-server' },
  },
  {
    id: 'insomnia',
    name: 'API client',
    for: 'Insomnia, for developers',
    text: 'Ready-made collections for Dedicated Networks, QoS Booking and Quality on Demand. Import one, set the sandbox address and send the calls one by one.',
    code: ['insomnia/Insomnia_Using_DedicatedNetworks.yaml', 'insomnia/Insomnia_Using_QoSBooking.yaml', 'insomnia/Insomnia_Using_QualityonDemand.yaml'],
    tutorial: { label: 'The collections on GitHub', to: `${REPO}/tree/main/insomnia` },
  },
];

export default function NetworkApisPlayground() {
  const [way, setWay] = useState(WAYS[0].id);
  const current = WAYS.find((w) => w.id === way);
  const ericsson = useBaseUrl('/assets/logos/Ericsson.svg');
  const repos = ALL_REPOS.filter((r) => r.slug === 'rt-camara-examples');

  return (
    <Layout
      title="CAMARA Dedicated Network APIs Playground"
      description="Try the CAMARA Dedicated Network APIs: reserve a dedicated network for a live production from a portal or an AI assistant, with the open-source examples and a members-only Ericsson sandbox."
    >
      <HubHero
        title="CAMARA Dedicated Network APIs Playground"
        icon={PLAY_ICON_PATH}
        actions={[
          <Link key="join" className="button button--primary" to="/membership#request-membership">
            Become a member
          </Link>,
          <a key="try" className="button button--outline button--primary" href="#ways">
            Try the examples
          </a>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={page.intro}>
              <div className={page.introMain}>
                <span className={page.badges}>
                  <span className={page.badge}>Network APIs</span>
                  <span className={page.badge}>CAMARA</span>
                  <span className={`${page.badge} ${page.lock}`}>Sandbox: members only, on request</span>
                </span>
                <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>Book a network for a live production</h2>
                <p className={page.lead}>
                  Find a service area on a map, reserve a dedicated network there for a time window, give a camera or
                  device access to it, and dismantle both when the show ends. Do it from a browser, by asking an AI
                  assistant, or call by call in an API client.
                </p>
                <ul className={page.ticks}>
                  <li>The examples are open source and public.</li>
                  <li>The sandbox they connect to is private: members only, on request.</li>
                  <li>It is a ready kit: you run it on your own computer, with nothing to build.</li>
                </ul>
              </div>
              <aside className={page.side}>
                <h3>What is in the Playground</h3>
                <p><b>Examples and tools.</b> The <a href={REPO}>rt-camara-examples</a> repository: a portal, an MCP server and Insomnia collections.</p>
                <p><b>Sandbox.</b> A CAMARA sandbox for the Dedicated Networks APIs. Private.</p>
                <p><b>Tutorials.</b> Step by step, for the portal and for the MCP server.</p>
                <span className={page.credit}>
                  <img src={ericsson} alt="Ericsson" />
                  <span>Thank you, Ericsson, for providing the sandbox</span>
                </span>
              </aside>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`} id="ways">
          <div className="container">
            <h2 className={styles.sectionTitle}>Three ways to play</h2>
            <p className={styles.sectionSubtitle}>
              All three use the same examples repository and the same sandbox. Pick the one that suits you.
            </p>
            <div className={page.tabs} role="tablist">
              {WAYS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  role="tab"
                  aria-selected={w.id === way}
                  className={`${page.tab} ${w.id === way ? page.tabOn : ''}`}
                  onClick={() => setWay(w.id)}
                >
                  {w.name}
                  <small>{w.for}</small>
                </button>
              ))}
            </div>
            <div className={page.pane} role="tabpanel">
              <p>{current.text}</p>
              <pre className={page.code}>{current.code.join('\n')}</pre>
              <p>
                <Link to={current.tutorial.to}>{current.tutorial.label} &rarr;</Link>
              </p>
              <p className={page.note}>
                To connect to the sandbox you need its address and your credentials. They come with membership, on request.
              </p>
            </div>
          </div>
        </section>

        {repos.length > 0 && (
          <section className={styles.section}>
            <div className="container">
              <h2 className={styles.sectionTitle}>The code</h2>
              <p className={styles.sectionSubtitle}>
                Part of the <Link to="/tech/network-apis">Network APIs</Link> project of the Media Connectivity Software
                Accelerator.
              </p>
              <RepoRows clusters={[{ label: null, repos }]} />
            </div>
          </section>
        )}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>More Playgrounds</h2>
            <p className={styles.sectionSubtitle}>
              Each Playground belongs to a project and is listed on the Playgrounds page with the project it comes from.
            </p>
            <div className={page.cta}>
              <Link className="button button--primary" to="/playgrounds">See all Playgrounds</Link>
            </div>
          </div>
        </section>
        <JoinTheEffort variant="tool" />
      </main>
    </Layout>
  );
}

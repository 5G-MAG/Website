import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import MediaConnectivityDiagram from '@site/src/components/MediaConnectivityDiagram';
import GodeeperCard from '@site/src/components/GodeeperCard';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { DISCOVER_WORK } from '@site/src/data/discoverWork';
import { SCOPE_PILLARS } from '@site/src/data/scopePillars';
import { FACT_SPEC_ISSUES, FACT_SDO_INPUTS, FACT_REPOSITORIES, FACT_CLONES } from '@site/src/data/facts';
import styles from '../tech/index.module.css';

const ABOUT_ICON_PATH = (
  <>
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </>
);

const LOOP_FACTS = [FACT_SPEC_ISSUES, FACT_SDO_INPUTS, FACT_REPOSITORIES, FACT_CLONES];

export default function About() {
  return (
    <Layout title="About Us" description="About 5G-MAG, The Media Connectivity Association.">
      <HubHero
        title="About Us"
        icon={ABOUT_ICON_PATH}
        actions={[
          <Link
            key="join"
            className="button button--primary"
            to="/membership#request-membership"
          >
            Become a member
          </Link>,
          <a
            key="overview"
            className="button button--outline button--primary"
            href="pathname:///docs/Overview.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download an Overview &#8595;
          </a>,
        ]}
      />

      <div className="container" style={{ marginTop: '1.75rem' }}>
        <p className="topic-lead">5G-MAG is a neutral platform bridging standards and real-world deployments: keeping connected media applications open, interoperable and deployable at scale.</p>
      </div>

      <main>
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Scope: Media and Connectivity</h2>
            <p className={styles.sectionSubtitle}>
              &ldquo;We are not a standards body. We do not write specs. We translate them into
              things that run.&rdquo;
            </p>

            <div style={{ margin: '0 0 2rem' }}>
              <MediaConnectivityDiagram />
            </div>

            <div className="godeeper-grid godeeper-grid--4col">
              {SCOPE_PILLARS.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Running the Loop: From Standards to Products</h2>
            <p className={styles.sectionSubtitle}>
              We take in specifications from standards bodies, feed back real-world requirements,
              accelerate software implementation, and validate technologies through interop and
              plugfests — before it ships into products.
            </p>

            <svg
              viewBox="0 0 1046 480"
              style={{ width: '100%', maxWidth: '1000px', display: 'block', margin: '0 auto 1rem' }}
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="loopArrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill="#00A0D2" />
                </marker>
              </defs>
              <rect
                x="154"
                y="150"
                width="210"
                height="210"
                rx="14"
                fill="#001125"
                stroke="#00A0D2"
                strokeWidth="2"
              />
              <text
                x="259"
                y="180"
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="#ffffff"
                letterSpacing="0.5"
              >
                STANDARDS BODIES
              </text>
              <g>
                <rect
                  x="169"
                  y="200"
                  width="85"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="211.5"
                  y="220"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#00335c"
                >
                  3GPP
                </text>
              </g>
              <g>
                <rect
                  x="264"
                  y="200"
                  width="85"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="306.5"
                  y="220"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#00335c"
                >
                  ETSI
                </text>
              </g>
              <g>
                <rect
                  x="169"
                  y="238"
                  width="85"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="211.5"
                  y="258"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#00335c"
                >
                  MPEG
                </text>
              </g>
              <g>
                <rect
                  x="264"
                  y="238"
                  width="85"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="306.5"
                  y="258"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#00335c"
                >
                  IETF
                </text>
              </g>
              <g>
                <rect
                  x="169"
                  y="276"
                  width="85"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="211.5"
                  y="296"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#00335c"
                >
                  GSMA
                </text>
              </g>
              <g>
                <rect
                  x="264"
                  y="276"
                  width="85"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="306.5"
                  y="296"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#00335c"
                >
                  DVB
                </text>
              </g>
              <g>
                <rect
                  x="229"
                  y="314"
                  width="60"
                  height="30"
                  rx="15"
                  fill="#ffffff"
                  stroke="#00A0D2"
                  strokeWidth="1.5"
                />
                <text
                  x="259"
                  y="336"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#00335c"
                >
                  …
                </text>
              </g>
              <rect
                x="816"
                y="150"
                width="210"
                height="170"
                rx="14"
                fill="#001125"
                stroke="#00A0D2"
                strokeWidth="2"
              />
              <g
                transform="translate(893,168) scale(2)"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                <path d="M12 12l8 -4.5" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-8 -4.5" />
              </g>
              <text
                x="921"
                y="262"
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="#ffffff"
              >
                PRODUCTS &amp;
              </text>
              <text
                x="921"
                y="282"
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="#ffffff"
              >
                DEPLOYMENTS
              </text>
              <g>
                <circle cx="62" cy="235" r="42" fill="#ffffff" stroke="#00A0D2" strokeWidth="3" />
                <g
                  transform="translate(45,218) scale(1.4)"
                  fill="none"
                  stroke="#00A0D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                </g>
                <text
                  x="62"
                  y="298"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Requirements
                </text>
              </g>
              <g>
                <circle cx="456" cy="235" r="42" fill="#ffffff" stroke="#00A0D2" strokeWidth="3" />
                <g
                  transform="translate(439,218) scale(1.4)"
                  fill="none"
                  stroke="#00A0D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4 M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2 M9 17l0 -5 M12 17l0 -1 M15 17l0 -3" />
                </g>
                <text
                  x="456"
                  y="298"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Explainers &amp;
                </text>
                <text
                  x="456"
                  y="314"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Profiles
                </text>
              </g>
              <g>
                <circle cx="590" cy="235" r="42" fill="#ffffff" stroke="#00A0D2" strokeWidth="3" />
                <g
                  transform="translate(573,218) scale(1.4)"
                  fill="none"
                  stroke="#00A0D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 8l-4 4l4 4 M17 8l4 4l-4 4 M14 4l-4 16" />
                </g>
                <text
                  x="590"
                  y="298"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Software
                </text>
                <text
                  x="590"
                  y="314"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Accelerator
                </text>
              </g>
              <g>
                <circle cx="724" cy="235" r="42" fill="#ffffff" stroke="#00A0D2" strokeWidth="3" />
                <g
                  transform="translate(707,218) scale(1.4)"
                  fill="none"
                  stroke="#00A0D2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5 M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5 M3 21l2.5 -2.5 M18.5 5.5l2.5 -2.5 M10 11l-2 2 M13 14l-2 2" />
                </g>
                <text
                  x="724"
                  y="298"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Interop &amp;
                </text>
                <text
                  x="724"
                  y="314"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="#00335c"
                >
                  Testing
                </text>
              </g>
              <path
                d="M104 235 L152 235"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="3"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M364 235 L412 235"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="3"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M498 235 L546 235"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="3"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M632 235 L680 235"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="3"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M766 235 L814 235"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="3"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M456 193 Q 422 172.5 388 161.25"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M388 161.25 Q 354 150 320 148"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
              />
              <path
                d="M590 193 Q 512.5 142.5 435 131.25"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M435 131.25 Q 357.5 120 280 148"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
              />
              <path
                d="M724 193 Q 603 116.5 482 105.25"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
                markerEnd="url(#loopArrow)"
              />
              <path
                d="M482 105.25 Q 361 94 240 148"
                fill="none"
                stroke="#00A0D2"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
              />
              <text
                x="482"
                y="88"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontStyle="italic"
                fill="#00A0D2"
              >
                Feedback
              </text>
            </svg>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.sectionSubtitle}>
              Based on open specifications, to address market needs. Together with our members we
              are running the loop from specifications to products — keeping connected media
              applications and network technologies open, interoperable and deployable at scale.
            </p>
            <div className="godeeper-grid godeeper-grid--4col">
              {DISCOVER_WORK.map((p) => (
                <GodeeperCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The Work, in Numbers</h2>
            <p className={styles.sectionSubtitle}>Proof the loop runs, not just a description of it.</p>
            <div className="summary-container">
              {LOOP_FACTS.map((f) => (
                <div key={f.label} className="summary-card">
                  <h3>{f.label}</h3>
                  <span className="summary-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <JoinTheEffort />
      </main>
    </Layout>
  );
}

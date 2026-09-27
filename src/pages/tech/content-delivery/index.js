import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import ProjectDestinationCards from '@site/src/components/ProjectDestinationCards';
import ProjectRepoSection from '@site/src/components/ProjectRepoSection';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import ProjectContributors from '@site/src/components/ProjectContributors';
import { ALL_PROJECTS, displayNameOf } from '@site/src/data/baskets';
import styles from '../index.module.css';

// The page title/H1 uses taxonomy.json's own `name` field directly (direct
// instruction: "the name should be the one in the taxonomy"). ProjectRepoSection
// still needs displayNameOf() separately below: it matches against
// ALL_REPOS's own projectName field, which baskets.js builds from
// displayNameOf(), not from `name` (same value here, but derived properly
// so a later taxonomy.json displayName addition doesn't silently break it).
const PROJECT = ALL_PROJECTS.find((p) => p.tech_url === '/tech/content-delivery');
const PROJECT_NAME = PROJECT.name;

// A per-project "flagship" page, following the 5gms pilot
// (src/pages/tech/5gms/index.js) -- replacing the former
// docs/tech/content-delivery.mdx doc. Same Layout/HubHero every hub page
// uses, not the doc-tier topic-banner.
//
// 2026-09-27: docs/tech/content-delivery/overview.mdx now exists as a
// structural placeholder (real content still lives in this page's own "How
// It Works" section below, not yet migrated there) and techTopics.js's own
// entry carries `autogen: 'content-delivery'`, so the topic now DOES have a
// real sidebar presence -- analysisHref below points at it directly rather
// than at the in-page "#how-it-works" anchor.
const PACKAGE_ICON = (
  <>
    <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12v9" />
    <path d="M12 12l-8 -4.5" />
  </>
);

// This project's own basket accent (BASKET_ACCENT['content-delivery'] in
// src/data/baskets.js) -- a plain literal here rather than importing the
// whole map for one color, same reasoning as the 5gms page's own ACCENT.
const ACCENT = '#00a0d2';

const FLUTE_VS_ROUTE = [
  { aspect: 'Intent', flute: 'Reliable file download', route: 'Real-time timed-object delivery' },
  { aspect: 'Object model', flute: 'Files described by an FDT', route: 'Timed objects in Source/Repair Flows' },
  { aspect: 'Latency vs completeness', flute: 'Completeness first', route: 'Timeliness first' },
  { aspect: 'Metadata carriage', flute: 'FDT Instances', route: 'Compound objects (FCAST-style) plus signalling metadata' },
  { aspect: 'Typical use', flute: 'MBMS file/download delivery (TS 26.346)', route: 'ATSC 3.0 ROUTE/DASH; low-latency broadcast segments' },
];

export default function ContentDelivery() {
  const coverImg = useBaseUrl('/assets/images/projects/multimedia.png');
  return (
    <Layout
      title={PROJECT_NAME}
      description="Compares the FLUTE and ROUTE transport protocols used to deliver DASH, HLS, and CMAF media over broadcast and multicast networks."
    >
      <HubHero
        title={PROJECT_NAME}
        icon={PACKAGE_ICON}
        actions={[
          <p key="subtitle" style={{ color: 'var(--cta-accent)', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
            Content delivery origin, packaging, protocols and related tools
          </p>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(240px, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                <p>
                  Content delivery over broadcast and multicast networks relies on transport
                  protocols that can deliver files and media objects one-way, without a return
                  channel from each receiver. This project covers File Delivery over Unidirectional
                  Transport (FLUTE) and Real-time Object delivery over Unidirectional Transport
                  (ROUTE), which underpin 5G-MAG&apos;s broadcast and multicast work.
                </p>
                <p>
                  5G-MAG maintains open-source implementations, including the FLUTE library used
                  in the 5G Broadcast tools, a media origin, and a Coded Multisource Media Format
                  (CMMF) encoder.
                </p>
                {PROJECT.sdos?.length > 0 && (
                  <div className={styles.capabilityTags}>
                    {PROJECT.sdos.map((s) => (
                      <span key={s} className={styles.capabilityTag}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <img
                src={coverImg}
                alt={PROJECT_NAME}
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}
              />
            </div>
            <div className={styles.whyMattersBlock}>
              <h3 className={styles.whyMattersTitle}>The Problem It Solves</h3>
              <p className={styles.whyMattersBody}>
                A broadcast or multicast bearer has no return channel, so a receiver can never ask for
                a retransmission — reliability has to come from somewhere else, and Forward Error
                Correction carried by FLUTE and ROUTE is that mechanism. Keeping the media format
                (DASH, HLS, CMAF) and the transport (FLUTE for files, ROUTE for real-time objects)
                strictly separate is what lets the same packaged content run over either one: a
                broadcaster packages a CMAF asset once, and it can be delivered over FLUTE for a
                download-style MBMS scenario or over ROUTE for ATSC 3.0-style real-time delivery,
                without repackaging for each transport.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectDestinationCards
              accent={ACCENT}
              analysisHref="/tech/content-delivery/overview"
              standardsHref="/standards/content-delivery"
              softwareHref="/reference-tools/content-delivery/"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Open Source, Built Together</h2>
            <ProjectContributors />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <ProjectRepoSection projectNames={displayNameOf(PROJECT)} accent={ACCENT} />
          </div>
        </section>

        <section className={styles.section} id="how-it-works">
          <div className="container">
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              A broadcast/multicast media chain has two separable concerns. The <strong>format</strong>{' '}
              layer packages and addresses media as segments and manifests (DASH, HLS, CMAF). The{' '}
              <strong>transport</strong> layer moves those objects to receivers over a one-way path
              with no per-receiver return channel (FLUTE, ROUTE). On unicast, a DASH or HLS client
              pulls segments over HTTP and can retransmit on loss. On a broadcast or multicast
              bearer there is no acknowledgement path, so the transport layers reliability on top
              of UDP/IP multicast using Forward Error Correction (FEC) rather than retransmission.
              5G-MAG&apos;s reference tooling works mainly at the transport layer, delivering
              DASH-, HLS- or CMAF-packaged content over 5G Broadcast (LTE-based) and 5G Multicast
              Broadcast Services (MBS).
            </p>

            <p>
              <strong>Key specifications:</strong> IETF{' '}
              <a href="https://www.rfc-editor.org/rfc/rfc3926">RFC 3926</a> (FLUTE version 1, the
              profile 3GPP mandates) and{' '}
              <a href="https://www.rfc-editor.org/rfc/rfc6726">RFC 6726</a> (FLUTE version 2,
              reference only for 3GPP use),{' '}
              <a href="https://www.rfc-editor.org/rfc/rfc9223">RFC 9223</a> (ROUTE), 3GPP{' '}
              <a href="https://www.3gpp.org/dynareport/26346.htm">TS 26.346</a> (MBMS, FLUTE file
              delivery).
            </p>

            <h3>Transport building blocks (LCT, ALC, FEC)</h3>
            <p>
              FLUTE and ROUTE are both built on the IETF Reliable Multicast Transport (RMT)
              building blocks:
            </p>
            <ul>
              <li>
                <strong>LCT</strong> (Layered Coding Transport) defines the common packet header,
                session and transport-object identification, and congestion-control signalling used
                by both protocols. Each packet carries a Transport Session Identifier (TSI) and a
                Transport Object Identifier (TOI). Current IETF text is RFC 5651; the profile 3GPP
                actually mandates (see the note below) uses its predecessor, RFC 3451.
              </li>
              <li>
                <strong>ALC</strong> (Asynchronous Layered Coding) is the protocol instantiation
                that combines LCT with an FEC building block and, optionally, layered congestion
                control. It gives massively scalable one-way delivery: any number of receivers can
                join without the sender knowing about them. Current IETF text is RFC 5775; the
                3GPP-mandated profile uses its predecessor, RFC 3450.
              </li>
              <li>
                <strong>FEC</strong> allows a receiver to recover lost packets from redundancy
                carried in the stream, which is essential when there is no feedback channel to
                request retransmission. Both FLUTE and ROUTE carry FEC Object Transmission
                Information so a receiver knows how to reconstruct each object.
              </li>
            </ul>

            <h3>FLUTE (RFC 3926, version 1)</h3>
            <div className="admonition admonition-note alert alert--secondary">
              <div className="admonition-heading">
                <span>Which FLUTE version applies</span>
              </div>
              <div className="admonition-content">
                <p>
                  Two generations of FLUTE exist. <strong>RFC 3926 specifies version 1</strong>, and
                  that is the profile 3GPP mandates: TS 26.517 clause 6.2.1 binds the Object
                  Distribution Method to the MBMS Download Profile of TS 26.346, whose clause 7.2.0
                  requires RFC 3926 together with RFC 3450 (ALC) and RFC 3451 (LCT). RFC 6726
                  revises FLUTE as version 2 and is current IETF text, but it is not what a 3GPP
                  deployment implements. See{' '}
                  <Link to="/standards/content-delivery">Standards: Content Delivery Protocols</Link>{' '}
                  for the full chain.
                </p>
              </div>
            </div>
            <p>
              FLUTE (File Delivery over Unidirectional Transport) delivers complete files. Its
              defining addition on top of ALC is the <strong>File Delivery Table (FDT)</strong>, an
              in-band XML description that maps each transport object (by TOI) to file metadata: a
              Content-Location (the URI the file will be known by), Content-Type, length, and FEC
              parameters. A receiver reads the FDT Instances, learns which objects are being
              carried, collects the packets for the objects it wants, applies FEC, and reconstructs
              the files. FLUTE is the file-delivery method of 3GPP MBMS ({' '}
              <a href="https://www.3gpp.org/dynareport/26346.htm">TS 26.346</a>). When DASH content
              is delivered over MBMS download delivery, each DASH segment is a FLUTE object and the
              FDT Content-Location matches the Segment URL in the MPD, so the receiver can
              reassemble a playable DASH presentation from the one-way stream.
            </p>

            <h3>ROUTE (RFC 9223)</h3>
            <p>
              ROUTE (Real-Time Transport Object Delivery over Unidirectional Transport) targets
              timed media rather than bulk files. It is aligned with FLUTE but adds real-time
              behaviour: objects are delivered so they can be used as they arrive, which matters
              for low-latency streaming. ROUTE organises delivery into <strong>Source Flows</strong>{' '}
              (carrying the media objects, per RFC 5775 source data) and optional{' '}
              <strong>Repair Flows</strong> (carrying FEC repair data), and it reuses FCAST (RFC
              6968) principles so that object metadata and content can be sent together as a
              compound object. Timed segments (typically CMAF/DASH segments) are delivered as ROUTE
              objects with enough signalling for the receiver to hand each segment to the player
              promptly. ROUTE is the transport used by ATSC 3.0 (ROUTE/DASH) and is supported
              alongside FLUTE in 5G broadcast/multicast systems.
            </p>

            <h4>FLUTE compared with ROUTE</h4>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <table className={styles.feeTable}>
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>FLUTE (RFC 3926 v1)</th>
                    <th>ROUTE (RFC 9223)</th>
                  </tr>
                </thead>
                <tbody>
                  {FLUTE_VS_ROUTE.map((r) => (
                    <tr key={r.aspect}>
                      <td className={styles.feeTableTier}>{r.aspect}</td>
                      <td>{r.flute}</td>
                      <td>{r.route}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Both run over UDP/IP (including multicast IP), both use LCT/ALC and FEC, and both are
              one-way.
            </p>

            <h3>Formats delivered over these transports</h3>
            <ul>
              <li>
                <strong>DASH</strong> (ISO/IEC 23009-1): a Media Presentation Description (MPD)
                describes Representations at different bitrates as time-addressable segments.
                3GP-DASH ({' '}
                <a href="https://www.3gpp.org/dynareport/26247.htm">TS 26.247</a>) is the 3GPP
                profile; DVB-DASH (ETSI TS 103 285) is the DVB profile with additional
                interoperability constraints (for example excluding multiplexed representations and{' '}
                <code>SegmentList</code> addressing). When DASH is broadcast, the MPD itself is
                delivered as one of the transport objects.
              </li>
              <li>
                <strong>HLS</strong> (RFC 8216): M3U8 playlists reference media segments; a
                receiver that has recovered the playlist and segments from the transport plays them
                as if fetched over HTTP.
              </li>
              <li>
                <strong>CMAF</strong> (ISO/IEC 23000-19): a segmented container derived from the ISO
                Base Media File Format. A single set of CMAF segments can be referenced by both a
                DASH MPD and an HLS playlist, so a broadcaster packages once and can deliver over
                FLUTE or ROUTE and consume with either client. CMAF chunks are also what enable
                low-latency delivery, which pairs naturally with ROUTE.
              </li>
            </ul>

            <h3>End-to-end flow</h3>
            <p>
              Content is encoded, packaged as CMAF segments and described by a DASH MPD or HLS
              playlist. For a download model the segments and manifest are carried as FLUTE objects
              (as in MBMS), with FDT Content-Locations matching the manifest URLs. For a real-time
              model the same segments are carried as ROUTE objects in Source Flows with FEC in
              Repair Flows (as in ATSC 3.0). At the receiver, FEC recovers any lost packets, the
              objects are reassembled, the manifest is reconstructed, and the player renders the
              presentation exactly as if the segments had been pulled over HTTP. This is why the
              format and transport layers can be developed and reasoned about separately, and why
              5G-MAG&apos;s FLUTE and ROUTE tooling is format-agnostic above the segment level.
            </p>

            <h3>Coded Multisource Media Format (CMMF)</h3>
            <p>
              ETSI TS 103 973 (Coded Multisource Media Format, V1.1.1, October 2024) is a separate
              container format for carrying coded media from more than one network source at once.
              An encoder takes an already-packaged media format (such as ISO BMFF or CMAF) and
              produces coded bitstreams that can be delivered from several sources simultaneously;
              CMMF carries no manifest of its own, so bitstreams for an asset can be created or
              discarded independently. This is a lower-layer container for the multisource media
              itself, distinct from DASH-IF content steering (CTA-5006), which is a client-side,
              manifest-level choice of <em>which</em> source to use. 5G-MAG&apos;s{' '}
              <a href="https://github.com/5G-MAG/rt-cmmf-encoder">CMMF Encoder reference
              implementation</a> is tracked as part of this project&apos;s own repositories. This
              section is a starting placeholder: deeper clause-level analysis of TS 103 973 awaits
              a full reading of the published standard text.
            </p>

            <p>
              The slide deck below introduces the content delivery protocols in scope; download the
              file for the full detail.
            </p>
            <div className="pdf-embed-wrapper">
              <iframe
                loading="lazy"
                className="pdf-embed"
                src={useBaseUrl('/docs/Reference_Tools_Multimedia_delivery_protocols.pdf')}
                title="Content Delivery Protocols reference tools overview slide deck"
              ></iframe>
            </div>
            <p>
              <a href={useBaseUrl('/docs/Reference_Tools_Multimedia_delivery_protocols.pdf')}>
                Download the slide deck with more information
              </a>{' '}
              &middot; the{' '}
              <a href="https://github.com/orgs/5G-MAG/projects/44/views/22">Execution Plan</a>{' '}
              tracks current implementation work.
            </p>

            <p>
              <strong>Related:</strong>{' '}
              <Link to="/standards/content-delivery">Standards: Content Delivery Protocols</Link>{' '}
              &middot; <Link to="/standards/cmmf">Standards: CMMF (Multisource Delivery)</Link>{' '}
              &middot; <Link to="/reference-tools/content-delivery/">Content Delivery Protocols
              Reference Tools</Link> &middot;{' '}
              <Link to="/tech/5g-broadcast">5G Broadcast - TV and Radio Services</Link> and{' '}
              <Link to="/tech/5g-mbs">5G Multicast Broadcast Services (MBS)</Link>: the delivery systems
              these transports run over
            </p>
          </div>
        </section>


        <JoinTheEffort alt />
      </main>
    </Layout>
  );
}

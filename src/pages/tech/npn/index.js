import ProjectHome from '@site/src/components/ProjectHome';
import styles from '../index.module.css';
import Link from '@docusaurus/Link';

const ICON = (
  <>
    <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
    <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
  </>
);

export default function NPN() {
  return (
    <ProjectHome
      techUrl="/tech/npn"
      icon={ICON}
      accent="#d1477a"
      description="Private 5G (SNPN and PNI-NPN) deployment models, identity/onboarding, and QoS/spectrum considerations for live production."
      analysisHref="/tech/npn/overview"
      standardsHref="/standards/npn"
      why={
        <>
          <p className={styles.whyMattersBody}>
                A broadcaster deploying its own private 5G network doesn&apos;t want to become a full
                mobile operator with its own subscriber database: NPN avoids that: the Release 17
                Credentials Holder split lets a broadcaster&apos;s existing central identity system
                authenticate devices onto a venue-operated SNPN directly, and UE onboarding lets a
                whole fleet of cameras and devices be provisioned automatically rather than configured
                one by one. Together they are what makes dedicated, controllable 5G infrastructure for
                live production practical to actually deploy, in place of the legacy satellite, ISDN
                or fibre contribution links it replaces.
              </p>
        </>
      }
    >
      <p>
                  Non-Public Networks (NPNs) are private 5G deployments operated for a specific
                  organisation or use case, defined in 3GPP Release 16. In media production, NPNs
                  allow broadcasters to deploy dedicated 5G infrastructure for live production
                  workflows, replacing legacy contribution links (satellite, ISDN, fibre) with a
                  programmable, low-latency wireless fabric. 5G-MAG&apos;s work covers deployment
                  models, spectrum access strategies, User Equipment (UE) registration and
                  on-boarding, and the specific requirements of live production environments such as
                  time-sensitive communications.
                </p>
                <p>
                  <strong>No dedicated reference tool exists for NPN.</strong> This area is
                  documented through the analysis below. Live production over an NPN often needs
                  deterministic timing, so for time-sensitive media transport over NPNs see also{' '}
                  <Link to="/tech/tsc">Time-Sensitive Communications (TSC)</Link>.
                </p>
    </ProjectHome>
  );
}

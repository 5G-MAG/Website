import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HubHero from '@site/src/components/HubHero';
import JoinTheEffort from '@site/src/components/JoinTheEffort';
import { ALL_PROJECTS, BASKET_ACCENT, displayNameOf, isValidationTool } from '@site/src/data/baskets';
import styles from '../tech/index.module.css';
import { CategoryCard, topicFor } from '../reference-tools';

const VALIDATION_ICON_PATH = (
  <>
    <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
    <path d="M14 19l2 2l4 -4" />
    <path d="M9 8h4" />
    <path d="M9 12h2" />
  </>
);

// Every validation tool that has a page, the same card as Reference Tools and Testbeds. One without a page yet is
// listed below as coming soon.
const WITH_PAGE = ALL_PROJECTS.filter((p) => isValidationTool(p) && p.doc_url);
const WITHOUT_PAGE = ALL_PROJECTS.filter((p) => isValidationTool(p) && !p.doc_url);

export default function ValidationTools() {
  return (
    <Layout
      title="Validation Tools"
      description="Tools from 5G-MAG that check the conformance of an implementation or a stream against a specification, and do nothing else."
    >
      <HubHero
        title="Validation Tools"
        icon={VALIDATION_ICON_PATH}
        actions={[
          <Link key="contribute" className="button button--primary" to="/contributing">
            Contribute
          </Link>,
          <Link key="license" className="button button--outline button--primary" to="/license">
            License Model
          </Link>,
          <Link key="early-access" className="button button--outline button--primary" to="/early-access">
            Early Access
          </Link>,
        ]}
      />

      <main>
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionSubtitle}>
              A validation tool checks that an implementation or a stream conforms to a specification. It does not
              simulate a network and runs no experiments. For how validators are used at plugfests and in
              interoperability work, see <Link to="/deployments/testing">Testing and interoperability</Link>.
            </p>
            <div className={styles.categoryColumns}>
              <CategoryCard
                title="Validation Tools"
                accent={BASKET_ACCENT.testbeds}
                desc={<>Each tool is part of a project, and its repository is public or on request; see <Link to="/early-access">Early Access</Link>.</>}
                topics={[
                  ...WITH_PAGE.map(topicFor),
                  // A validator without a page yet is listed in the same box, as a row that does not link.
                  ...WITHOUT_PAGE.map((p) => ({ title: displayNameOf(p), desc: 'Coming soon.', iconKey: p.icon })),
                ]}
              />
            </div>
          </div>
        </section>
        <JoinTheEffort alt variant="tool" />
      </main>
    </Layout>
  );
}

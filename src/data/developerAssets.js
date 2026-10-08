// The Standards2Deployments tooling shown on /developer-assets, in the Software Accelerator menu and on the
// Developer Community page. Descriptions restate the repository's own READMEs.
export const DEVELOPER_ASSETS = [
  {
    id: '3gpp-explorer',
    title: '3GPP Explorer',
    icon: 'doc-report',
    summary: 'Follow 3GPP work and collect the agreed change requests of the work items you choose.',
    body: [
      'A small local web application. It downloads the current 3GPP Work Plan and lets you filter work items by keyword, release, TSG group and study or normative status.',
      'For the work items you select, it collects the change requests filed against them, finds the TSG document of each agreed change request and downloads them together as one zip or into a folder.',
      'Everything runs on your machine; the only requests that leave it go to 3gpp.org.',
    ],
  },
  {
    id: 'ai-development-guidelines',
    title: 'AI Development Guidelines',
    icon: 'code-ai',
    summary: 'The rules for working against specifications, by people or AI assistants.',
    body: [
      'Every claim cites the specification, version and clause it rests on, and says whether it comes from the specification, the code or an observation.',
      'The set includes the numbered rules, the order of work and the checks to pass before anything is submitted; how to audit an implementation against a specification case by case, reporting what works as well as what does not; and templates for a repository record, a published conformance statement, an audit and a pull request.',
      'It also contains verify-citations, a check that fails when a quoted sentence is not found in the specification it cites, and an /audit skill that runs a code audit step by step.',
    ],
  },
  {
    id: 'spec-api-validator',
    title: 'Spec API Validator',
    icon: 'api-server',
    summary: 'Check OpenAPI YAML against the API definitions of 3GPP specifications. Under development.',
    body: [
      'Reads the operation tables, the procedure sentences that oblige a status code, the data type tables and the enumerations of a specification, and compares each with the YAML, quoting the specification for every result.',
      'It can also compare two YAML files, and send requests built from the YAML to a running implementation to check the answers. It has a web interface and a command line.',
    ],
  },
  {
    id: 'exploration-tools',
    title: 'Exploration tools',
    icon: 'cube',
    summary: 'From the specifications in scope to the code of a project\'s repositories.',
    body: [
      'Collect the statements of the specifications a project covers, classify them by feature, role, profile and release, prepare the reading of each repository against them, and draw the figures.',
    ],
  },
];

// The Playgrounds: ready kits for trying a technology. One entry per Playground, listed on /playgrounds and linked from the
// "Experiment" button of the project it belongs to. `access` says what is private: the kit itself is always open source.
export const PLAYGROUNDS = [
  {
    slug: 'network-apis',
    project: 'network-apis',          // the project's slug in taxonomy.json (tech_url /tech/<slug>)
    title: 'CAMARA Network APIs Playground',
    summary:
      'Reserve a dedicated network for a live production, from a browser or by asking an AI assistant, against a CAMARA sandbox.',
    href: '/playgrounds/network-apis',
    badges: ['Network APIs', 'CAMARA'],
    sandbox: 'Members only, on request',
  },
];

// The Playground of a project, or null: the Experiment button of its topics opens it.
export function playgroundFor(projectSlug) {
  return PLAYGROUNDS.find((p) => p.project === projectSlug) || null;
}

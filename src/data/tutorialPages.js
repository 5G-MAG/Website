// The Reference Tools projects whose pages have tutorials (at <Reference Tools page>/tutorials), and the same check
// for any tool page by its address.
export const TUTORIAL_SLUGS = [
  '5gms', 'data-collection', 'content-delivery', '5g-broadcast', 'emergency-alerts', 'dvb-i', '5g-mbs',
  'xr', 'v3c', 'vdmc', 'avatar', 'network-apis', '3gpp-platforms',
];

// Testbeds and validators that have tutorials too.
const OTHER_TUTORIALS = ['/testbeds/6g-testbed', '/testbeds/ai-ml', '/testbeds/beyond-2d', '/validation/vops', '/validation/flute'];

export function tutorialsUrlFor(docUrl) {
  if (!docUrl) return null;
  const base = docUrl.replace(/\/$/, '');
  const slug = base.replace('/reference-tools/', '');
  const has = base.startsWith('/reference-tools/') ? TUTORIAL_SLUGS.includes(slug) : OTHER_TUTORIALS.includes(base);
  return has ? `${base}/tutorials` : null;
}

// The Reference Tools that have an Implementation Detail page (at <Reference Tools page>/implementation).
const IMPLEMENTATION_SLUGS = [
  '3gpp-platforms', '5g-broadcast', '5g-mbs', '5gms', 'avatar', 'common-tools', 'content-delivery', 'data-collection',
  'dvb-i', 'emergency-alerts', 'network-apis', 'v3c', 'vdmc', 'xr',
];

// Testbeds and validators with an Implementation Detail page, the same as the Reference Tools.
const OTHER_IMPLEMENTATION = ['/testbeds/beyond-2d', '/testbeds/ai-ml', '/validation/vops', '/validation/flute'];

export function implementationUrlFor(docUrl) {
  if (!docUrl) return null;
  const base = docUrl.replace(/\/$/, '');
  if (OTHER_IMPLEMENTATION.includes(base)) return `${base}/implementation`;
  if (!base.startsWith('/reference-tools/')) return null;
  return IMPLEMENTATION_SLUGS.includes(base.replace('/reference-tools/', '')) ? `${base}/implementation` : null;
}

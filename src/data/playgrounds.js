// The Reference Tools projects whose pages have tutorials (at <Reference Tools page>/tutorials), listed in the
// Playgrounds; and the same check for any tool page by its address.
export const TUTORIAL_SLUGS = [
  '5gms', 'data-collection', 'content-delivery', '5g-broadcast', 'emergency-alerts', 'dvb-i', '5g-mbs',
  'xr', 'v3c', 'vdmc', 'avatar', 'network-apis', '3gpp-platforms',
];

// Testbeds and validators that have tutorials too.
const OTHER_TUTORIALS = ['/testbeds/6g-testbed', '/testbeds/ai-ml', '/testbeds/beyond-2d', '/validation/vops'];

export function tutorialsUrlFor(docUrl) {
  if (!docUrl) return null;
  const base = docUrl.replace(/\/$/, '');
  const slug = base.replace('/reference-tools/', '');
  const has = base.startsWith('/reference-tools/') ? TUTORIAL_SLUGS.includes(slug) : OTHER_TUTORIALS.includes(base);
  return has ? `${base}/tutorials` : null;
}

// Every project that has at least one repository in Early Access (private on
// GitHub), derived from taxonomy.json's repoMetadata `public` flags, so the
// request form and the "Currently in Early Access" tiles gain a project the
// moment one of its repositories goes private -- a hand-kept list had fallen
// behind (5GMS, 5G Broadcast, Emergency Alerts, Content Delivery and RTC were
// missing). The flags match GitHub visibility (checked 2026-09-29; the daily
// site-stats script reads visibility from GitHub itself).
import taxonomy from '@site/src/data/taxonomy.json';

const slugOf = (r) => (typeof r === 'string' ? r : r.repo_slug || r.name || r.repo);
const META = new Map(
  Object.values(taxonomy.repoMetadata)
    .flat()
    .map((r) => [slugOf(r).toLowerCase(), r])
);

function earlyAccessEntry(p) {
  const group = p.doc_url.replace(/\/$/, '').split('/').pop();
  const names = new Set(
    [...(p.repos || []), ...(taxonomy.repoMetadata[group] || [])].map((r) => slugOf(r).toLowerCase())
  );
  const repos = [...names].map((n) => META.get(n)).filter(Boolean);
  const gated = repos.filter((r) => r.public === false).map((r) => r.repo_slug);
  if (!gated.length) return null;
  const all = gated.length === repos.length;
  return {
    name: p.name,
    href: p.doc_url.replace(/\/$/, ''),
    desc: all
      ? gated.length === 1
        ? 'Its repository is in early access.'
        : `All ${gated.length} of its repositories are in early access.`
      : `In early access: ${gated.sort().join(', ')}. The rest of the project is public.`,
  };
}

export const EARLY_ACCESS_PROJECTS = [
  ...taxonomy.projects.filter((p) => p.doc_url).map(earlyAccessEntry).filter(Boolean),
  {
    // Deliberately absent from the /reference-tools hub grid and sidebar:
    // this is Early Access auxiliary tooling, and this entry (plus the
    // Early Access callout on /developer) is its intended entry point.
    name: 'Standards2Deployments',
    href: '/reference-tools/standards2deployments',
    desc: 'Auxiliary tooling for members and contributors working from specifications: a 3GPP Work Plan and Change Request explorer, guidelines for AI-assisted development, and specification conformance audits and coverage records.',
  },
];

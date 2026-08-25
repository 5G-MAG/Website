// The only projects currently gated behind Early Access. Keep this list to
// exactly what's actually private right now -- it drives both the request
// form's project dropdown and every "currently in Early Access" listing
// across the site, so a stale entry here would misrepresent real repo
// access, not just page copy.
export const EARLY_ACCESS_PROJECTS = [
  {
    name: 'AI/ML Evaluation Framework',
    href: '/testbeds/ai-ml',
    desc: 'Evaluation framework for assessing AI/ML models applied to media processing in 5G network contexts.',
  },
  {
    name: '5G Multicast Broadcast Services (MBS)',
    href: '/reference-tools/5g-mbs',
    desc: 'Reference implementation of the 5G Multicast Broadcast Services (MBS) user service layer targeting 3GPP Release 17 and 18.',
  },
  {
    name: 'Conversational Avatar Communication with MPEG ARF',
    href: '/reference-tools/avatar',
    desc: 'Reference tools for real-time conversational avatar systems in 5G contexts, targeting the emerging MPEG standard for avatar-based communications.',
  },
  {
    // Deliberately absent from the /reference-tools hub grid and sidebar:
    // this is Early Access auxiliary tooling, and this entry (plus the
    // Early Access callout on /developer) is its intended entry point.
    name: 'Standards2Deployments',
    href: '/reference-tools/standards2deployments',
    desc: 'Auxiliary tooling for members and contributors working from specifications: a 3GPP Work Plan and Change Request explorer, guidelines for AI-assisted development, and specification conformance audits and coverage records.',
  },
  {
    // The only entry here that isn't a whole gated project: the rest of
    // MPEG V3C Immersive Platform is public (rt-v3c-unity-player,
    // rt-v3c-decoder-plugin, rt-v3c-content are all `public: true` in
    // repoMetadata.json). Without this entry the request form's dropdown
    // (built from this array, see EarlyAccessForm) had no way to name this
    // repo at all, even though ProjectRepositories renders it with a real
    // "Private / request access" badge on /reference-tools/v3c/resources
    // (2026-08-25 findability follow-up).
    name: 'MPEG V3C Example Content',
    href: '/reference-tools/v3c/resources',
    desc: "Example V3C content and helper files for testing the encoding, delivery and rendering pipeline. The rest of the MPEG V3C Immersive Platform project is already public.",
  },
];

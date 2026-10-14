// Individual stat-tile "facts" reused across the About/Developer/Membership/
// Standards/Events hero stat rows — several of these were previously hand-
// copied verbatim (or near-verbatim) into more than one page; edit here to
// update every page that shows that stat at once.
// Counted, not typed: static/data/site-stats.json is refreshed daily by
// scripts/fetch-site-stats.js (see that file for exactly what each count
// includes), so every page shows the same, current value.
import siteStats from '@site/static/data/site-stats.json';
import communityStats from '@site/static/data/community-stats.json';
import notOnHubDashboard from '@site/src/data/notOnHubDashboard.json';
import { ALL_PROJECTS } from '@site/src/data/baskets';
import { communityTotals } from '@site/src/utils/communityStats';

const fmt = (n) => n.toLocaleString('en-US');

export const FACT_SDO_INPUTS = { value: fmt(siteStats.sdoInputs), label: 'Inputs and liaison statements to SDOs' };
export const FACT_REPOSITORIES = {
  value: fmt(siteStats.repositories.total),
  label: 'Project repositories, public and early access',
  sub: `${siteStats.repositories.public} public, ${siteStats.repositories.earlyAccess} early access`,
};
// The clone figure is the Community Activity total (same function, same projects, same exclusions), not a separate count.
const PROJECTS_WITH_PAGE = new Set(ALL_PROJECTS.filter((p) => p.doc_url).map((p) => p.name));
const COMMUNITY = communityTotals(
  communityStats.projects.filter((p) => PROJECTS_WITH_PAGE.has(p.name)),
  new Set(notOnHubDashboard)
);
export const FACT_CLONES = { value: fmt(COMMUNITY.clones), label: 'Clones: developers pulling the code' };
export const FACT_STARS = { value: fmt(COMMUNITY.stars), label: 'Stars on GitHub, all repositories' };
export const FACT_FORKS = { value: fmt(COMMUNITY.forks), label: 'Forks of our repositories' };
export const FACT_VIEWS = { value: fmt(COMMUNITY.views), label: 'Repository page views' };
export const COMMUNITY_UPDATED = communityStats.updated_at;
export const FACT_SPEC_ISSUES = { value: fmt(siteStats.specIssues), label: 'Issues raised on specifications through GitHub' };
export const FACT_PROJECTS = { value: fmt(siteStats.projects), label: 'Projects across media and connectivity' };
export const FACT_REFERENCE_TOOLS = { value: fmt(siteStats.referenceTools), label: 'Reference Tools projects' };
export const FACT_TESTBEDS = { value: fmt(siteStats.testbeds), label: 'Testbeds and Evaluation Frameworks' };
export const FACT_WORKSHOP_INPUTS = { value: fmt(siteStats.workshopInputs), label: 'Presentations at 3GPP requirements workshops' };
// Static: 5G-MAG's role in 3GPP (docs/home/partnerships.mdx: "5G-MAG is a 3GPP Market Representation Partner (MRP)").
export const FACT_3GPP_MRP = { value: '3GPP', label: 'Engagement as Market Representation Partner' };
export const FACT_DEV_CALL = { value: 'Monthly', label: 'Dev Public Call and rolling releases' };
export const STATS_UPDATED = siteStats.updated_at;
export const FACT_LARGE_EVENTS = { value: '2', label: 'Recurrent large events', sub: 'MWC Barcelona & IBC' };
export const FACT_YEARLY_CONFERENCE = { value: '1', label: 'Yearly conference', sub: 'Future Media Townhall' };

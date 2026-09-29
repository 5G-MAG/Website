// Individual stat-tile "facts" reused across the About/Developer/Membership/
// Standards/Events hero stat rows — several of these were previously hand-
// copied verbatim (or near-verbatim) into more than one page; edit here to
// update every page that shows that stat at once.
// Counted, not typed: static/data/site-stats.json is refreshed daily by
// scripts/fetch-site-stats.js (see that file for exactly what each count
// includes), so every page shows the same, current value.
import siteStats from '@site/static/data/site-stats.json';

const fmt = (n) => n.toLocaleString('en-US');

export const FACT_SDO_INPUTS = { value: fmt(siteStats.sdoInputs), label: 'Inputs and liaison statements to SDOs' };
export const FACT_REPOSITORIES = {
  value: fmt(siteStats.repositories.total),
  label: 'Project repositories, public and early access',
  sub: `${siteStats.repositories.public} public, ${siteStats.repositories.earlyAccess} early access`,
};
export const FACT_CLONES = { value: fmt(siteStats.clones), label: 'Clones: developers pulling the code' };
export const FACT_SPEC_ISSUES = { value: fmt(siteStats.specIssues), label: 'Issues raised on specifications through GitHub' };
export const FACT_PROJECTS = { value: fmt(siteStats.projects), label: 'Projects across media and connectivity' };
export const STATS_UPDATED = siteStats.updated_at;
export const FACT_LARGE_EVENTS = { value: '2', label: 'Recurrent large events', sub: 'MWC Barcelona & IBC' };
export const FACT_YEARLY_CONFERENCE = { value: '1', label: 'Yearly conference', sub: 'Future Media Townhall' };

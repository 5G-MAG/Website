// Individual stat-tile "facts" reused across the About/Developer/Membership/
// Standards/Events hero stat rows — several of these were previously hand-
// copied verbatim (or near-verbatim) into more than one page; edit here to
// update every page that shows that stat at once.
// unverified: no source recorded for this count; found no page on this
// site it can be checked against. Flagging rather than guessing a
// replacement -- see FACT_SDO_INPUTS below for the sourced alternative.
export const FACT_SPEC_ISSUES = { value: '+90', label: 'Specification issues corrected on feedback' };
// Verified 2026-08-27: 41 outgoing LS/inputs in docs/home/standards/ls.mdx's
// '3GPP: Incoming / Outgoing LS and Inputs' table (Out rows only, not the
// 4 incoming replies) plus 6 workshop inputs listed on docs/home/standards/
// requirements.mdx = 47, rounded down. The previous '+20' had no recorded
// source and undercounted the site's own tables by more than half.
export const FACT_SDO_INPUTS = { value: '+40', label: 'Inputs and liaison statements to SDOs' };
// Verified 2026-08-27: 48 public repos via api.github.com/orgs/5G-MAG,
// 12,431 clones via static/data/community-stats.json (deduped, hub-tracked
// repos only -- see CommunityProjects' own NOT_ON_HUB_DASHBOARD filter;
// recomputed with the same dedup/exclusion logic before updating this).
// Both drift over time (repos slowly, clones daily) -- re-check periodically
// rather than treating these as permanently accurate.
export const FACT_REPOSITORIES = { value: '48', label: 'Repositories, open on github.com/5G-MAG' };
export const FACT_CLONES = { value: '12,400+', label: 'Clones: developers pulling the code' };
export const FACT_LARGE_EVENTS = { value: '2', label: 'Recurrent large events', sub: 'MWC Barcelona & IBC' };
export const FACT_YEARLY_CONFERENCE = { value: '1', label: 'Yearly conference', sub: 'Future Media Townhall' };

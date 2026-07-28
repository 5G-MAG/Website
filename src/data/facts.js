// Individual stat-tile "facts" reused across the About/Developer/Membership/
// Standards/Events hero stat rows — several of these were previously hand-
// copied verbatim (or near-verbatim) into more than one page; edit here to
// update every page that shows that stat at once.
export const FACT_SPEC_ISSUES = { value: '+90', label: 'Specification issues corrected on feedback' };
export const FACT_SDO_INPUTS = { value: '+20', label: 'Inputs and liaison statements to SDOs' };
// Verified 2026-07-28: 48 public repos via api.github.com/orgs/5G-MAG,
// ~9,700 clones via static/data/community-stats.json (deduped, hub-tracked
// repos only -- see CommunityStatsBoard's own NOT_ON_HUB_DASHBOARD filter).
// Both drift over time (repos slowly, clones daily) -- re-check periodically
// rather than treating these as permanently accurate.
export const FACT_REPOSITORIES = { value: '48', label: 'Repositories, open on github.com/5G-MAG' };
export const FACT_CLONES = { value: '9,700+', label: 'Clones: developers pulling the code' };
export const FACT_LARGE_EVENTS = { value: '2', label: 'Recurrent large events', sub: 'MWC Barcelona & IBC' };
export const FACT_YEARLY_CONFERENCE = { value: '1', label: 'Yearly conference', sub: 'Future Media Townhall' };

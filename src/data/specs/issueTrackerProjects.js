// Project groups for filtering docs/home/standards/3gpp-issue-tracking.mdx.
//
// Unlike SpecIndex's per-project spec catalogues, this page's issues are not
// structured data (they are markdown tables and bullet lists accumulated
// across 8 XCHANGE meetings, in three different table shapes, plus older
// meetings with no table at all). Rather than re-transcribe every issue into
// a parallel data file -- which would drift from the prose the moment either
// one is edited -- IssueTrackerFilter (src/components/IssueTrackerFilter)
// matches these strings directly against the RENDERED page text at runtime.
//
// `match` strings are spec numbers this page's own content already carries.
// Where a spec is genuinely shared between projects (TS 26.510 between 5GMS
// and RTC; TS 26.346 between 5G MBS and Content Delivery), it is listed
// under both -- an issue then surfaces under either filter, which is correct
// since the page cannot know which project a shared-spec issue is really
// "for" without a per-issue tag the source data doesn't carry.
//
// TS 29.571 (3GPP Common Data Types) appears once on the page with no
// project-owning src/data/specs/*.js file anywhere in the codebase --
// deliberately left untagged rather than guessed, so it stays always visible
// regardless of filter (see IssueTrackerFilter's own handling of untagged
// content).
export const ISSUE_TRACKER_GROUPS = [
  {
    key: '5gms',
    label: '5G Media Streaming (5GMS)',
    match: ['26.501', '26.510', '26.511', '26.117', '26.512', '5gms'],
  },
  {
    key: '5g-mbs',
    label: '5G Multicast Broadcast Services (MBS)',
    match: ['26.346', '26.502', '26.517', '29.244', 'mbs'],
  },
  {
    key: 'data-collection',
    label: 'UE Data Collection, Reporting and Event Exposure',
    match: ['26.531', '26.532', 'evex'],
  },
  {
    key: 'content-delivery',
    label: 'Content Delivery Protocols',
    match: ['26.247', '26.346', 'flute', 'route'],
  },
  {
    key: '5g-broadcast',
    label: '5G Broadcast',
    match: ['36.101', '36.300', 'mcch', 'earfcn'],
  },
  {
    key: 'rtc',
    label: 'Real-time Media Communication (RTC)',
    match: ['26.510', '26.506', '26.113'],
  },
];

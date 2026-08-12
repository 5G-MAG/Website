// Per-feature implementation audit for the 5G Broadcast reference tools
// (rt-mbms-tx, the transmitter, and rt-mbms-modem, the receiver).
//
// Migrated out of five stacked per-release markdown tables on the Scope page.
// Two things changed in the move, both deliberate: status is now a state
// (yes / partial / hold / no / na) with the reasoning in its own `note`, so the
// status columns can actually be skimmed; and the roll-up counts are derived
// from these rows by src/components/ImplementationBoard rather than written by
// hand, so a summary can never drift away from the detail it summarises.
//
// Every section here is audited at two ends (transmitter and receiver), so the
// rows carry `statuses` instead of `status` and each end is counted separately.
//
// The Scope page's original legend read: supported / not supported / "To check"
// (status not yet confirmed). The board has no separate "unconfirmed" state, so
// those rows are marked `hold` and say so in their note.
export const BROADCAST_COMPONENTS = [
  {
    name: "rt-mbms-tx and rt-mbms-modem",
    repo: "5G Broadcast transmitter and receiver",
  },
];

const ENDS = ["rt-mbms-tx", "rt-mbms-modem"];
const COMPONENT = "rt-mbms-tx and rt-mbms-modem";

export const BROADCAST_SECTIONS = [
  {
    spec: "Rel-14",
    title: "Release 14 features (EnTV)",
    component: COMPONENT,
    columns: ENDS,
    rows: [
      {
        feature: "MBSFN subframes using SCS = 1.25 kHz",
        statuses: ["yes", "yes"],
      },
      {
        feature: "MIB-MBMS",
        statuses: ["yes", "yes"],
      },
      {
        feature: "SIB1-MBMS",
        statuses: ["yes", "yes"],
      },
      {
        feature: "MBMSInterestIndication RRC signalling procedure",
        statuses: ["unknown", "unknown"],
        note: "support not yet confirmed at either end",
      },
    ],
  },
  {
    spec: "Rel-16",
    title: "Release 16 features (LTE_terr_bcast)",
    component: COMPONENT,
    columns: ENDS,
    rows: [
      {
        feature: "MBSFN subframes using SCS = 0.37 kHz",
        statuses: ["yes", "yes"],
      },
      {
        feature: "MBSFN subframes using SCS = 2.5 kHz",
        statuses: ["yes", "yes"],
      },
      {
        feature:
          "PDCCH enhancements: CFI indication in MIB to avoid the need to decode PCFICH",
        statuses: ["yes", "yes"],
      },
      {
        feature:
          "PDCCH enhancements: New aggregation level 16 (PDCCH Format 4)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "Repetition of PBCH",
        statuses: ["yes", "yes"],
      },
      {
        feature: "MBSFN-AreaInfo-r16 (subcarrierSpacing, timeSeparation)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "Receive-Only Mode (ROM) redirect",
        statuses: ["yes", "yes"],
      },
    ],
  },
  {
    spec: "Rel-17",
    title: "Release 17 features (bands part 1)",
    component: COMPONENT,
    columns: ENDS,
    rows: [
      {
        feature:
          "PMCH bandwidth of 30, 35 and 40 PRBs (corresponding to 6/7/8 MHz)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "Band 107 (UHF)",
        statuses: ["yes", "yes"],
      },
    ],
  },
  {
    spec: "Rel-18",
    title: "Release 18 features (bands part 2)",
    component: COMPONENT,
    columns: ENDS,
    rows: [
      {
        feature: "Band 108 (470 to 698 MHz, receive-only)",
        statuses: ["yes", "yes"],
        note: "band-table level (frequency lookup and configuration)",
      },
    ],
  },
  {
    spec: "Rel-19",
    title: "Release 19 features (PMCH Phase 2, CAS muting, new bands)",
    component: COMPONENT,
    columns: ENDS,
    rows: [
      {
        feature: "PMCH time interleaving (N subframes)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "PMCH frequency interleaving",
        statuses: ["yes", "yes"],
      },
      {
        feature: "PMCH cyclic shift",
        statuses: ["yes", "yes"],
      },
      {
        feature: "PMCH MCS tables 11.1-1 / 11.1-2",
        statuses: ["yes", "yes"],
      },
      {
        feature: "Extended SI scheduling periods",
        statuses: ["yes", "yes"],
      },
      {
        feature: "CAS muting (PSS / SSS / PBCH)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "Bands 112 and 113 (UHF, receive-only)",
        statuses: ["yes", "yes"],
        note: "band-table level (frequency lookup and configuration)",
      },
    ],
  },
];

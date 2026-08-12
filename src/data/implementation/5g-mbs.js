// Per-feature implementation audit for the 5G MBS reference tools.
//
// Migrated out of ten stacked markdown tables on the Scope page. Two things
// changed in the move, both deliberate: status is now a state (yes / partial /
// hold / no / na) with the reasoning in its own `note`, so the status column can
// actually be skimmed; and the roll-up counts are derived from these rows by
// src/components/ImplementationBoard rather than written by hand, so a summary
// can never drift away from the detail it summarises.
//
// `columns` marks a section audited at two ends (transmit and receive); those
// rows carry `statuses` instead of `status`, and each end is counted separately.
export const MBS_COMPONENTS = [
  {
    name: "MBSF",
    repo: "rt-mbs-function",
  },
  {
    name: "MBSTF",
    repo: "rt-mbs-transport-function",
  },
  {
    name: "MB-SMF",
    repo: "Open5GS fork",
  },
  {
    name: "AMF",
    repo: "Open5GS fork",
  },
  {
    name: "gNB",
    repo: "srsRAN Project fork",
  },
  {
    name: "Uu radio (gNB + UE)",
    repo: "srsRAN Project + srsRAN 4G forks",
  },
];

export const MBS_SECTIONS = [
  {
    spec: "TS 29.580",
    title: "MBSF services at Nmb10",
    component: "MBSF",
    rows: [
      {
        feature: "MBS User Service: create (POST `/mbs-user-services`)",
        status: "yes",
      },
      {
        feature: "MBS User Service: retrieve individual (GET `.../{userServiceId}`)",
        status: "yes",
      },
      {
        feature: "MBS User Service: retrieve collection (GET `/mbs-user-services`)",
        status: "no",
        note: "rejected as an invalid resource; the portal keeps its own registry instead",
      },
      {
        feature: "MBS User Service: update (PUT)",
        status: "yes",
      },
      {
        feature: "MBS User Service: modify (PATCH, RFC 7396)",
        status: "hold",
        note: "pending [Standards#182](https://github.com/5G-MAG/Standards/issues/182) ([issue #45](https://github.com/5G-MAG/rt-mbs-function/issues/45)) — use PUT",
      },
      {
        feature: "MBS User Service: delete",
        status: "yes",
      },
      {
        feature: "CreateMBSUserDataIngSession (POST `/sessions`)",
        status: "yes",
      },
      {
        feature: "RetrieveIndMBSUserDataIngSession (GET `.../{sessionId}`)",
        status: "yes",
      },
      {
        feature: "RetrieveMBSUserDataIngSessions (GET `/sessions`)",
        status: "no",
        note: "same collection-endpoint gap as above",
      },
      {
        feature: "UpdateIndMBSUserDataIngSession (PUT)",
        status: "yes",
        note: "with the §5.3.2.4.2 update rules enforced: create-only attributes (`mbsSessionId`, `mbsDistSessionId`, `locationDependent`) protected; INACTIVE-only attributes (`objDistrInfo`, `pckDistrInfo`, `maxContBitRate`, ...) rejected while active; any-time attributes (`mbsServInfo`, `tgtServAreas`, `extTgtServAreas`, `nrRedCapUeInfo`, ...) applied live",
      },
      {
        feature: "ModifyIndMBSUserDataIngSession (PATCH, RFC 7396)",
        status: "hold",
        note: "same as above",
      },
      {
        feature: "DeleteIndMBSUserDataIngSession",
        status: "yes",
      },
      {
        feature: "Scheduled activation (`actPeriods` / `actPeriodsRepRule`, mutually exclusive)",
        status: "yes",
      },
      {
        feature: "CreateMBSUserDataIngStatSubsc (POST `/status-subscriptions`)",
        status: "yes",
      },
      {
        feature: "RetrieveMBSUserDataIngStatSubscs / RetrieveInd (GET)",
        status: "yes",
        note: "returned objects carry no id of their own — see [Standards#191](https://github.com/5G-MAG/Standards/issues/191)",
      },
      {
        feature: "UpdateIndMBSUserDataIngStatSubsc (PUT) / ModifyInd (PATCH)",
        status: "yes",
      },
      {
        feature: "DeleteMBSUserDataIngStatSubsc",
        status: "yes",
      },
      {
        feature: "MBSUserDataIngStatNotif (notification to the provider callback URL, §6.2.5)",
        status: "yes",
      },
    ],
  },
  {
    spec: "TS 26.502 / TS 26.517",
    title: "MBS User Services procedures and formats",
    component: "MBSF",
    rows: [
      {
        feature: "Service Announcement mode `PASSED_BACK` — bundle handed back to the Application Provider at Nmb10 for out-of-band distribution (not delivered over any MBS reference point)",
        where: "MBSF",
        status: "yes",
      },
      {
        feature: "Service Announcement mode `VIA_MBS_DISTRIBUTION_SESSION` — MBSF's own broadcast announcement carousel, delivered **over MBS-4-MC** (multicast/broadcast) on a fixed, configurable SSM address/port",
        where: "MBSF generates + MBSTF transmits; MBSF Client receives",
        status: "yes",
      },
      {
        feature: "Service Announcement mode `VIA_MBS_5` — unicast retrieval by the client **over MBS-5**",
        where: "\u2014",
        status: "no",
        note: "no MBS-5 network API",
      },
      {
        feature: "User Service Description bundle, `multipart/related` (TS 26.517 §5.3.1A): `UserServiceDescriptions` document plus one SDP per Distribution Session",
        where: "MBSF generates; MBSF Client decomposes and parses",
        status: "yes",
        note: "including document version ordering (§5.2.2) and relative Content-Location resolution (RFC 2557)",
      },
      {
        feature: "`ServiceScheduleDescription` activation time windows (§5.2.7)",
        where: "MBSF Client",
        status: "yes",
      },
      {
        feature: "Session Description / SDP for FLUTE sessions (§6.2.2): `m=` FLUTE lines, `flute-tsi`, SSM `source-filter`, `mbs-servicetype`, timing",
        where: "MBSF generates; MBSF Client parses",
        status: "yes",
        note: "multi-session SDPs supported",
      },
      {
        feature: "Object distribution method over FLUTE, per the TS 26.346 Download profile (§6.2), delivered over **MBS-4-MC**",
        where: "MBSTF transmit; MBSF Client receive (both via rt-libflute)",
        status: "yes",
        note: "see the [rt-libflute audit](/reference-tools/multimedia/scope) for the transport-layer detail, including the Raptor FEC gap",
      },
      {
        feature: "MBS-6 / MBS-7 exposure to the MBS-Aware Application",
        where: "MBSF Client",
        status: "yes",
        note: "as local HTTP APIs: list announced services, activate/deactivate reception, inspect the received-content store, fetch received objects at their original Content-Location paths",
      },
      {
        feature: "MBS-Aware Application",
        where: "rt-mbs-application",
        status: "yes",
        note: "dashboard: announced services with play/deactivate, received-object cache, decomposed announcement bundle",
      },
      {
        feature: "MBS-4-UC (unicast object repair)",
        where: "\u2014",
        status: "no",
        note: "no unicast repair path; also outside TS 29.581's own scope",
      },
      {
        feature: "File repair / reception reporting (associated delivery procedures)",
        where: "\u2014",
        status: "no",
      },
    ],
    whereLabel: "Where",
  },
  {
    spec: "TS 29.581",
    title: "MBSTF distribution session services at Nmb2",
    component: "MBSTF",
    rows: [
      {
        feature: "Create Distribution Session (POST `/dist-sessions`)",
        status: "yes",
      },
      {
        feature: "Retrieve Distribution Session (GET `.../{distSessionRef}`)",
        status: "yes",
      },
      {
        feature: "Update Distribution Session (PATCH, RFC 6902 JSON Patch)",
        status: "yes",
        note: "state-only activate/deactivate and reconfiguration",
      },
      {
        feature: "Destroy Distribution Session (DELETE)",
        status: "yes",
      },
      {
        feature: "StatusSubscribe / StatusUnsubscribe (`.../subscriptions`)",
        status: "yes",
        note: "create, update, delete",
      },
      {
        feature: "StatusNotify (events to the MBSF callback)",
        status: "yes",
        note: "failed notifications retried, not dropped",
      },
      {
        feature: "Object distribution method: `SINGLE` operating mode, pull and push acquisition (per-session push-ingest endpoint advertised as `objIngestBaseUrl`)",
        status: "yes",
      },
      {
        feature: "Object distribution method: `STREAMING` operating mode (MPEG-DASH MPD, live profile, pull and push)",
        status: "yes",
      },
      {
        feature: "Object distribution method: `CAROUSEL` operating mode (`application/3gpp-mbs-object-manifest+json`; runs the Service Announcement channel)",
        status: "yes",
      },
      {
        feature: "Object distribution method: `COLLECTION` operating mode",
        status: "no",
      },
      {
        feature: "Streaming manifest types other than MPEG-DASH MPD (e.g. HLS)",
        status: "no",
        note: "delivered as plain objects, not parsed for scheduling",
      },
      {
        feature: "Packet distribution method: `PACKET_FORWARD_ONLY` and `PACKET_PROXY` operating modes",
        status: "yes",
      },
      {
        feature: "FLUTE/ALC delivery towards the MB-UPF at Nmb9 (unicast UDP tunnel to the MB-SMF-assigned ingress address, path-MTU detection)",
        status: "yes",
      },
      {
        feature: "AL-FEC beyond Compact No-Code (Raptor, mandatory for download receivers per TS 26.346 §7.2.2)",
        status: "no",
        note: "in the transmission path (available in rt-libflute; not yet wired in)",
      },
    ],
  },
  {
    spec: "TS 29.532",
    title: "MB-SMF session management services at Nmb1",
    component: "MB-SMF",
    rows: [
      {
        feature: "Nmbsmf_TMGI: Allocate (including refresh of previously allocated TMGIs)",
        status: "yes",
      },
      {
        feature: "Nmbsmf_TMGI: Deallocate (specific list or all; TMGIs referenced by a live MBS session are protected)",
        status: "yes",
      },
      {
        feature: "Nmbsmf_MBSSession: Create (broadcast service type)",
        status: "yes",
      },
      {
        feature: "Nmbsmf_MBSSession: Update (§5.3.2.3, activity status)",
        status: "yes",
      },
      {
        feature: "Nmbsmf_MBSSession: Release",
        status: "yes",
      },
      {
        feature: "Nmbsmf_MBSSession: StatusSubscribe / StatusNotify",
        status: "no",
      },
    ],
  },
  {
    spec: "TS 29.518",
    title: "Namf_MBSBroadcast",
    component: "AMF",
    rows: [
      {
        feature: "ContextCreate (§5.6.2.2) — drives NGAP Broadcast Session Setup towards the gNB",
        status: "yes",
      },
      {
        feature: "ContextUpdate (broadcast session modification)",
        status: "no",
      },
      {
        feature: "ContextRelease — drives NGAP Broadcast Session Release",
        status: "yes",
      },
      {
        feature: "ContextStatusNotify",
        status: "no",
      },
    ],
  },
  {
    spec: "TS 29.244",
    title: "N4mb PFCP",
    component: "MB-SMF",
    rows: [
      {
        feature: "PFCP Session Establishment / Modification / Deletion with the Release-17 MBS IEs",
        status: "yes",
      },
      {
        feature: "Local Ingress Tunnel (§8.2.209; the Nmb9 ingest address returned to the MBSF)",
        status: "yes",
      },
      {
        feature: "Common TEID / FSSM shared-delivery forwarding behaviour (§8.2.207, §5.34.2.2)",
        status: "yes",
      },
      {
        feature: "PFCP Session Report for MBS sessions",
        status: "no",
      },
    ],
  },
  {
    spec: "TS 38.413",
    title: "NGAP broadcast procedures",
    component: "gNB",
    rows: [
      {
        feature: "Broadcast Session Setup (Request/Response, with the MBS Session Setup Request Transfer carrying TMGI and shared-delivery tunnel information)",
        status: "yes",
        note: "on both ends, dynamically (no pre-provisioned session configuration required)",
      },
      {
        feature: "Broadcast Session Release",
        status: "yes",
        note: "on both ends",
      },
      {
        feature: "Broadcast Session Modification",
        status: "no",
      },
      {
        feature: "Broadcast Session Release Required (gNB-initiated)",
        status: "no",
      },
      {
        feature: "Distribution Setup/Release, Multicast Session Activation/Deactivation/Update, Multicast Group Paging",
        status: "no",
        note: "multicast mode",
      },
    ],
  },
  {
    spec: "TS 38.463 / TS 38.473",
    title: "E1AP and F1AP broadcast contexts",
    component: "gNB",
    rows: [
      {
        feature: "E1AP BC Bearer Context Setup (with failure reporting)",
        status: "yes",
      },
      {
        feature: "E1AP BC Bearer Context Modification (per-MRB F1-U tunnel information)",
        status: "yes",
      },
      {
        feature: "E1AP BC Bearer Context Release",
        status: "yes",
      },
      {
        feature: "F1AP Broadcast Context Setup (with per-MRB setup-failure reporting)",
        status: "yes",
      },
      {
        feature: "F1AP Broadcast Context Release",
        status: "yes",
      },
      {
        feature: "F1AP Broadcast Context Modification",
        status: "no",
        note: "session reconfiguration is handled DU-internally",
      },
      {
        feature: "E1AP MC Bearer Context / F1AP multicast procedures",
        status: "no",
        note: "multicast mode",
      },
    ],
  },
  {
    spec: "TS 38.331 / TS 38.321 / TS 38.322 / TS 38.323",
    title: "Uu broadcast radio protocols",
    component: "Uu radio (gNB + UE)",
    rows: [
      {
        feature: "SIB20 (MCCH configuration, TS 38.331)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "MCCH: MBSBroadcastConfiguration-r17 covering every live session's MRBs, transmission windows",
        statuses: ["yes", "yes"],
        note: "UE (receive): with periodic re-acquisition, so sessions created later are still discovered",
      },
      {
        feature: "MCCH change notification (DCI 4-0)",
        statuses: ["yes", "na"],
      },
      {
        feature: "MTCH scheduling / reception per session G-RNTI, concurrent sessions independently served",
        statuses: ["yes", "yes"],
        note: "UE (receive): multiple simultaneous G-RNTIs, per-G-RNTI HARQ state",
      },
      {
        feature: "MRB LCID management",
        statuses: ["yes", "yes"],
        note: "gNB (transmit): DU-wide unique LCIDs across concurrent sessions; UE (receive): All MRBs of all advertised sessions wired",
      },
      {
        feature: "RLC-UM (TS 38.322)",
        statuses: ["yes", "yes"],
      },
      {
        feature: "PDCP broadcast MRB (TS 38.323; 18-bit SN)",
        statuses: ["yes", "yes"],
        note: "UE (receive): with the §5.2.1 SN-based receive-window bootstrap (a UE tuning in mid-stream has no COUNT synchronisation)",
      },
      {
        feature: "Delivery of received multicast IP to the MBSF Client",
        statuses: ["na", "yes"],
        note: "UE (receive): TUN interface",
      },
      {
        feature: "Multicast MRBs, PTP/PTM switching, MBS Interest Indication, group paging",
        statuses: ["no", "no"],
      },
    ],
    columns: ["gNB (transmit)", "UE (receive)"],
  },
];

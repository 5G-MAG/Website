// Per-feature implementation audit for the 5G MBS reference tools.
//
// Migrated out of ten stacked markdown tables on the Scope page. Two things
// changed in the move, both deliberate: status is now a state (yes / partial /
// hold / no / na) with the reasoning in its own `note`, so the status column can
// actually be skimmed; and the roll-up counts are derived from these rows by
// src/components/ImplementationBoard rather than written by hand, so a summary
// can never drift away from the detail it summarises.
//
// This audit covers each repository's RELEASED branch only (`main`, or `5mbs`
// for the three RAN forks) as read on 2026-08-18. It deliberately excludes
// `feature/mbs-compliance-fixes` and other `development` branches, which carry
// substantial fixes and features that have not reached a release branch and
// therefore MUST NOT be described as currently supported. Where a fix exists
// only on such a branch, the row says so explicitly.
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
        status: "yes",
        note: "returns the full JSON array of active User Services; this reached the release branch since the earlier 400-rejection behaviour was recorded (release-branch commit 4780a25)",
      },
      {
        feature: "MBS User Service: update (PUT)",
        status: "yes",
      },
      {
        feature: "MBS User Service: modify (PATCH, RFC 7396)",
        status: "yes",
        note: "reached the release branch (commit b37a022), superseding the earlier hold pending [Standards#182](https://github.com/5G-MAG/Standards/issues/182) ([issue #45](https://github.com/5G-MAG/rt-mbs-function/issues/45))",
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
        note: "same collection-endpoint gap as the User Service list once had; unlike that one, no fix for this endpoint has reached the release branch",
      },
      {
        feature: "UpdateIndMBSUserDataIngSession (PUT)",
        status: "yes",
        note: "with the §5.3.2.4.2 update rules enforced: create-only attributes (`mbsSessionId`, `mbsDistSessionId`, `locationDependent`) protected; any-time attributes (`mbsServInfo`, `tgtServAreas`, `extTgtServAreas`, `nrRedCapUeInfo`, ...) applied live, correctly gated to the parent service's real servType (`nrRedCapUeInfo`/`mbsFSAId` to BROADCAST, `restrictedFlag` to MULTICAST); INACTIVE-only attributes (`objDistrInfo`, `pckDistrInfo`, `maxContBitRate`) are also rejected while active, but two related gating fixes for this pair of attributes exist only on an unreleased branch and their exact release-branch edge-case behaviour was not independently re-verified here",
      },
      {
        feature: "TMGI allocation trigger when an ingest session carries no MBS session identifier",
        status: "no",
        note: "TS 29.580 §5.3.2.2.2 requires the MBSF to request TMGI allocation when none is provided; on the release branch the entry is silently skipped instead, with no response and no TMGI request, so the request hangs rather than erroring. A fix (501 response) exists only on an unreleased branch. Separately, when SSM+locationDependent triggers a TMGI request towards MB-SMF, that request is correctly gated — but MBSF has no TMGI-allocation logic of its own in either case; allocation is delegated entirely to MB-SMF",
      },
      {
        feature: "ModifyIndMBSUserDataIngSession (PATCH, RFC 7396)",
        status: "partial",
        note: "add/update of `mbsDisSessInfos` map entries now merges key-by-key rather than replacing the whole map (release-branch commit f3cf170); but the clause's own delete-via-null-entry case (TS 29.580 §5.3.2.4.2: \"if an existing MBS Distribution Session shall be deleted, the AF shall include the corresponding map entry set to the value 'NULL'\") is explicitly rejected with 400 — a stated non-implementation, not a bug",
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
        note: "failed notifications are retried rather than dropped, but the retry loop has no bound on the release branch; a retry limit exists only on an unreleased branch",
      },
      {
        feature: "SBI feature negotiation (`supportedFeatures` per TS 29.500 §6.6)",
        status: "no",
        note: "the MBS User Service service registers no features and the Ingest Session service registers only feature 1 (5MBS2/ActivePeriodsRepRule); features 2 (MBSEventsExt), 3 (MBSErrorHandling) and 4 (MBSPatchEnh) are never declared even though PATCH itself now works, and there is no per-transaction suppFeat read/compare/echo anywhere outside this static NRF registration",
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
        where: "—",
        status: "no",
        note: "no standardized MBS-5 network API exists (no `3gpp-mbs-user-service-discovery` resource path per TS 26.517 §9.2.2). The client instead retrieves announcements from MBSF's own vendor-specific `/x-5gmag-service-announcements/v1/...` endpoint over unicast HTTP, which filters only by service-class, not by conformance profile",
      },
      {
        feature: "User Service Description bundle, `multipart/related` (TS 26.517 §5.3.1A): `UserServiceDescriptions` document plus one SDP per Distribution Session",
        where: "MBSF generates; MBSF Client decomposes and parses",
        status: "yes",
        note: "including document version ordering (§5.2.2) and relative Content-Location resolution (RFC 2557); whether the release branch's quoted-string Content-Location encoding is itself the grammar RFC 2557 requires is an unresolved dispute between two prior reviews, not adjudicated here. Separately, RFC 2557 §4.4.1's requirement to MIME-encode illegal characters in a Content-Location path is not implemented on either branch — only RFC 822 backslash-escaping of quotes/backslashes is done",
      },
      {
        feature: "`ServiceScheduleDescription` activation time windows (§5.2.7)",
        where: "MBSF Client",
        status: "yes",
      },
      {
        feature: "Cancelled MBS User Service Session handling (table 5.2.7-1: \"The MBS Client shall not attempt to join an MBS User Service Session that is marked as cancelled\")",
        where: "MBSF Client",
        status: "no",
        note: "the release branch's `ServiceScheduleDescription` type has no `cancelled` field at all, and its own code comment asserts there is no such property on this data type — directly contradicting the clause quoted above. The schedule-window gate never checks any cancellation state",
      },
      {
        feature: "Session Description / SDP for FLUTE sessions (§6.2.2): `m=` FLUTE lines, `flute-tsi`, SSM `source-filter`, `mbs-servicetype`, timing",
        where: "MBSF generates; MBSF Client parses",
        status: "partial",
        note: "the core fields (`m=` lines, `flute-tsi`, SSM `source-filter`, `mbs-servicetype`, timing, multi-session SDPs) are correct; the generator also emits a forbidden `a=lang` media attribute (TS 26.517 §6.2.2.1 Restrictions: \"The Service-language(s) per media ... shall not be used\") — a fix exists only on an unreleased branch",
      },
      {
        feature: "Object distribution method over FLUTE, per the TS 26.346 Download profile (§6.2), delivered over **MBS-4-MC**",
        where: "MBSTF transmit; MBSF Client receive (both via rt-libflute)",
        status: "yes",
        note: "see the [rt-libflute audit](/reference-tools/multimedia/scope) for the transport-layer detail, including the Raptor FEC gap and other release-branch findings for that library",
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
        note: "dashboard: announced services with play/deactivate, received-object cache, decomposed announcement bundle. Known release-branch gap: the Play link and distribution-method label only ever read the service's first Distribution Session (index 0); a service whose playable entry lives on another session renders as unplayable — a fix exists only on an unreleased branch",
      },
      {
        feature: "MBS-4-UC (unicast object repair)",
        where: "—",
        status: "no",
        note: "no unicast repair path; also outside TS 29.581's own scope",
      },
      {
        feature: "File repair / reception reporting (associated delivery procedures)",
        where: "—",
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
        note: "including the SINGLE+PUSH validation rule (TS 29.581 table 6.1.6.2.5-1 NOTE 6): a session carrying both `objAcquisitionIdsPull`/`objAcquisitionIdPush` and PUSH+SINGLE is correctly rejected",
      },
      {
        feature: "Retrieve Distribution Session (GET `.../{distSessionRef}`)",
        status: "no",
        note: "TS 29.581 table 6.1.3.3.3.3-3 requires the response body to be the `DistSession` resource directly; on the release branch the response always wraps it inside an extra `CreateRspData`/`distSession` layer — one level of nesting more than the clause defines. A fix exists only on an unreleased branch",
      },
      {
        feature: "Update Distribution Session (PATCH, RFC 6902 JSON Patch)",
        status: "no",
        note: "TS 29.581 §5.2.2.3/§6.1.3.3.3.1 define the PATCH target as the flat `DistSession` resource, but the release branch builds JSON-Patch paths prefixed `/distSession` (whole-document) or `/distSession/distSessionState` (state-only) — pointers that don't resolve against that resource — and the response is always parsed as a `CreateRspData`, not the flat `DistSession` the clause defines. State-change (activate/deactivate) and reconfiguration PATCH requests go out with the wrong pointer shape and their responses are mis-parsed. Fixes exist only on an unreleased branch",
      },
      {
        feature: "Destroy Distribution Session (DELETE)",
        status: "yes",
      },
      {
        feature: "StatusSubscribe / StatusUnsubscribe (`.../subscriptions`)",
        status: "yes",
        note: "create, update, delete; includes the Rel-18 `DATA_INGEST_SESSION_ESTABLISHED`/`TERMINATED` event pair",
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
        status: "partial",
        note: "the manifest is fetched and objects are distributed, but TS 26.517 §6.2.3.5's per-object timing requirements are not implemented on the release branch: no availability-start/end-time fields exist on the object store, packaged items carry no transmission deadline so the deadline-ordered queue is inert, and the packager only ever holds one object in flight, so every FDT Instance describes exactly one object rather than the full pending object list. Fixes exist only on an unreleased branch",
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
        status: "partial",
        note: "the basic allocate/refresh path (200 OK, 400/404 for malformed or unknown TMGI) is correct; when the TMGI pool is exhausted, the release branch returns 500 Internal Server Error with a cause value that TS 29.532 table 6.1.3.2.3.1-3 does not define for this operation (the table defines only 200/403/404/307/308) — a fix exists only on an unreleased branch",
      },
      {
        feature: "Nmbsmf_TMGI: Deallocate (specific list or all)",
        status: "partial",
        note: "the basic operation is correct (400 on a missing list, 404 on an unknown TMGI, 204 on success); but there is no check anywhere preventing deallocation of a TMGI referenced by a live MBS session — any found TMGI is deallocated unconditionally. Protection for an in-use TMGI exists only on an unreleased branch (and even there, uses a cause value the table does not define)",
      },
      {
        feature: "Nmbsmf_MBSSession: Create (broadcast service type)",
        status: "partial",
        note: "session creation itself works, and the session-type dispatch foundation (TMGI vs SSM by service_type) is present; but the resulting Namf_MBSBroadcast_ContextCreate call to the AMF is not gated on service_type==BROADCAST as TS 23.247 §7.3.1 step 2 requires (\"...if the service type is broadcast service\") — it fires unconditionally, including for Multicast sessions. A fix exists only on an unreleased branch",
      },
      {
        feature: "Nmbsmf_MBSSession: Update (§5.3.2.3, activity status)",
        status: "yes",
        note: "the activityStatus PATCH path correctly checks service_type=='MULTICAST'. A separate mbsSecurityContext PATCH path is unconditionally rejected for every session type regardless of service_type (cited against TS 29.532 §5.3.2.3.1 per the lead register, not independently re-verified this pass) — flagged for awareness rather than asserted as a confirmed defect",
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
        status: "partial",
        note: "on the release branch, the AMF sends BroadcastSessionSetupRequest to every connected gNB and immediately returns 201 Created with no wait for any gNB response, no timer, and no maxResponseTime handling — confirmed by the code's own TODO comments (\"Start timer to wait for reception?\", \"On the first gNB response, send the 201 Created...\"). Several fields are also hardcoded rather than derived (notify_uri, S-NSSAI, TAC), each marked TODO in source. A fix with real completion tracking exists only on an unreleased branch",
      },
      {
        feature: "ContextUpdate (broadcast session modification)",
        status: "no",
      },
      {
        feature: "ContextRelease — drives NGAP Broadcast Session Release",
        status: "no",
        note: "no DELETE handler exists on the release branch for this resource at all — any HTTP method other than POST returns 403 Forbidden, and no NGAP Broadcast Session Release request builder exists anywhere in the tree. This entire operation exists only on an unreleased branch",
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
        feature: "PFCP Session Establishment, with the Release-17 MBS IEs",
        status: "yes",
      },
      {
        feature: "PFCP Session Deletion for an MBS session",
        status: "no",
        note: "the release branch has no MBS-aware deletion path at all: session lookup is a blind hash-get with no MBS branching, and the deletion request routes unconditionally to the generic (non-MBS) deletion handler. This is confirmed, in practice, to cause MBS session-pool exhaustion under real use. A fix exists only on an unreleased branch",
      },
      {
        feature: "PFCP Session Modification (Multicast MBS session Activate/Deactivate)",
        status: "no",
        note: "no modification or report handling exists for MBS sessions on the release branch; only Establishment is implemented",
      },
      {
        feature: "Local Ingress Tunnel (§8.2.209; the Nmb9 ingest address returned to the MBSF)",
        status: "partial",
        note: "the tunnel address/port are returned, but the wire-encoded length field is wrong: the correctly-computed address-family-specific length is computed and then discarded in favour of the full union size, padding the IPv4 encoding with trailing zero octets against §8.2.209's requirement of flags+port+address only. A fix exists only on an unreleased branch",
      },
      {
        feature: "Common TEID / FSSM shared-delivery forwarding behaviour (§8.2.207, §5.34.2.2)",
        status: "partial",
        note: "correct for the single-PDR-per-session case the SMF side always creates today; the TEID assignment is hard-indexed to only the first created PDR/FAR rather than looped across all of them, so it would be wrong the moment more than one PDR/FAR exists per session. Currently latent, not currently observable; a fix exists only on an unreleased branch",
      },
      {
        feature: "MBS downlink GTP-U PDU Session Container (mandatory extension header, TS 38.415) on every N3mb downlink G-PDU",
        status: "no",
        note: "critical: on the release branch, QER/QFI is never associated with the MBS downlink PDR (the code carries the comment \"For now QER is not being used\"), so the UPF's own guard for adding the mandatory GTP-U PDU Session Container extension header never fires. In practice this causes a real gNB to reject every downlink G-PDU (\"Incomplete PDU at NG-U interface: missing or invalid PDU session container\"). A fix exists only on an unreleased branch — this breaks the N3mb hop of the delivery chain end-to-end on the release branch today",
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
        status: "partial",
        note: "the success path is built and sent correctly, dynamically, with no pre-provisioned session configuration required; but on the release branch, three error paths (a malformed request, a duplicate session, or a CU-CP session-creation failure) simply log a warning and return, sending no NGAP message — success or failure — at all",
      },
      {
        feature: "Broadcast Session Release",
        status: "no",
        note: "no release procedure exists at any layer on the release branch: no NGAP interface method, no F1AP or E1AP release messages, and the DU-internal MAC teardown is an explicit unimplemented stub (\"TODO ... implement this\", the real call is commented out). This entire chain exists only on an unreleased branch",
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
    spec: "TS 37.483 / TS 38.473",
    title: "E1AP and F1AP broadcast contexts",
    component: "gNB",
    rows: [
      {
        feature: "E1AP BC Bearer Context Setup (with failure reporting)",
        status: "partial",
        note: "session setup succeeds; the failure-reporting function exists with a real body but is never called anywhere in the coroutine, so per-MRB/per-QoS-flow failures are folded into the success response instead of a proper failure indication",
      },
      {
        feature: "E1AP BC Bearer Context Modification (per-MRB F1-U tunnel information, gNB-CU-CP initiated)",
        status: "yes",
      },
      {
        feature: "E1AP BC Bearer Context Modification Required / Release Request (gNB-CU-UP initiated)",
        status: "no",
        note: "absent on both peers (TS 37.483 cl.8.6.1.3.2/8.6.1.5.2)",
      },
      {
        feature: "E1AP BC Bearer Context Release",
        status: "no",
        note: "no BC Bearer Context Release files exist anywhere in the tree on the release branch, at CU-CP or CU-UP; this exists only on an unreleased branch",
      },
      {
        feature: "F1AP Broadcast Context Setup (with per-MRB setup-failure reporting)",
        status: "partial",
        note: "setup succeeds on the happy path; the failure-response builder is an entirely commented-out empty function called from 5 sites that therefore do nothing on failure, and the Broadcast MRB Failed-To-Be-Setup-List assignment is commented out and never populated. A fix exists only on an unreleased branch",
      },
      {
        feature: "F1AP Broadcast Context Release",
        status: "no",
        note: "no F1AP broadcast-context-release files exist anywhere in the tree on the release branch; this exists only on an unreleased branch",
      },
      {
        feature: "F1AP Broadcast Context Modification",
        status: "no",
        note: "not implemented on either the DU or CU-CP side (TS 38.473 cl.8.14.4.2/8.14.4.3)",
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
        statuses: ["no", "no"],
        note: "critical: neither release branch implements this at all. gNB: no MCCH scheduler file exists anywhere in the tree, and the system-information packer has no SIB20/SIB21 packing function. UE: the RRC header carries a literal TODO (\"add handle functions for sib20 and sib21\") and there is no `handle_sib20`/`handle_mcch` anywhere. Without this, a UE cannot discover a broadcast MBS session over the air on either release branch; the mechanism exists only on an unreleased branch",
      },
      {
        feature: "MCCH: MBSBroadcastConfiguration-r17 covering every live session's MRBs, transmission windows",
        statuses: ["no", "no"],
        note: "the MCCH mechanism itself is absent on both release branches (see SIB20 row above), so this cannot function regardless of any downstream code; exists only on an unreleased branch",
      },
      {
        feature: "MCCH change notification (DCI 4-0)",
        statuses: ["no", "na"],
        note: "moot on the release branch given MCCH itself does not exist there (see above); recorded here for continuity with the underlying clause (TS 38.331 §5.9.1.3)",
      },
      {
        feature: "MTCH scheduling / reception per session G-RNTI, concurrent sessions independently served",
        statuses: ["no", "no"],
        note: "gNB: scheduler files for MBS sessions exist and are not stubs (MCS/PRB computation, buffer-state tracking), but the MTCH transport-PDU assembler needed to actually build a real MTCH payload does not exist anywhere in the tree, so real over-the-air content delivery cannot function regardless of the scheduler's internal state. UE: the receive-side RNTI is a hardcoded value per the code's own comment (\"Harcoded RNTI intended for MBS broadcast reception\"), and there is no G-RNTI-aware code anywhere — multi-session concurrent reception does not exist. Both exist only on an unreleased branch",
      },
      {
        feature: "MRB LCID management",
        statuses: ["yes", "yes"],
        note: "gNB (transmit): DU-wide unique LCIDs across concurrent sessions; UE (receive): all MRBs of all advertised sessions wired. This presupposes MCCH-driven session discovery to reach the UE, which is confirmed absent on the release branch (see the SIB20/MCCH rows above) — the LCID logic itself was not found to be at fault, but end-to-end it cannot be exercised without a working MCCH",
      },
      {
        feature: "RLC-UM (TS 38.322)",
        statuses: ["yes", "no"],
        note: "UE (receive): RX_Next_Highest is never bootstrapped from the first received segmented MCCH/MTCH PDU's SN (cl.7.1); affects joining mid-session when segmented SNs land in the upper half of the SN space",
      },
      {
        feature: "PDCP broadcast MRB (TS 38.323; 18-bit SN)",
        statuses: ["yes", "no"],
        note: "UE (receive): no MRB/broadcast-specific code exists in the UE PDCP entity on the release branch at all (zero related hits) — a stronger gap than a missing receive-window bootstrap alone. Broadcast MRB PDCP reception exists only on an unreleased branch",
      },
      {
        feature: "Delivery of received multicast IP to the MBSF Client",
        statuses: ["na", "no"],
        note: "UE (receive): this presupposes working broadcast MRB PDCP reception, which is confirmed absent above; on the release branch, delivery over software TUN radio links most likely depends on the raw-capture relay path noted in the User plane path table below rather than genuine over-the-air RRC/PDCP delivery",
      },
      {
        feature: "Multicast MRBs, PTP/PTM switching, MBS Interest Indication, group paging",
        statuses: ["no", "no"],
      },
    ],
    columns: ["gNB (transmit)", "UE (receive)"],
  },
];

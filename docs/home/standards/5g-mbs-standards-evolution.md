---
hide_title: true
title: 5G MBS - Standards Evolution
slug: /standards/5g-mbs-standards-evolution
description: Release-by-release detail on the 3GPP work items behind 5G Multicast Broadcast Services, Releases 17 to 19.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.616 13.924a5 5 0 1 0 -9.23 0"/><path d="M20.307 15.469a9 9 0 1 0 -16.615 0"/><path d="M9 21l3 -9l3 9"/><path d="M10 19h4"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>5G MBS - Standards Evolution</h1>
</div>
</div>

<div class="topic-lead">
Release-by-release detail on the 3GPP work items behind 5G Multicast Broadcast Services.
</div>

This page is the detailed, release-by-release companion to [Standards: 5G Multicast Broadcast Services (MBS)](/standards/5g-mbs): the work items behind each release, and what each one added. See that page for the full specification list and current scope. For acronyms used here, see the [Glossary](/tech/glossary).

<div class="godeeper-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(0, 380px))'}}>

<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2"/><path d="M9 17l0 -5"/><path d="M12 17l0 -1"/><path d="M15 17l0 -3"/></svg>
<h3>Technology &amp; Analysis</h3>
</div>
<div class="godeeper-card__body">
<p>The implementer-facing analysis of the MBS architecture, including the Release 18 RAN procedures this page covers below.</p>
<ul class="godeeper-card__links">
<li><a href="/tech/5g-mbs">Tech: Multicast &amp; Broadcast in 5G</a></li>
<li><a href="/tech/5g-mbs/analysis-mbs-multicast-inactive-ran">MBS Multicast Inactive - RAN Procedures</a></li>
<li><a href="/tech/ntn/analysis-mbs-broadcast-over-ntn">MBS Broadcast over NTN</a></li>
</ul>
</div>
</div>
<div class="godeeper-card">
<div class="godeeper-card__band">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/></svg>
<h3>Software Tools</h3>
</div>
<div class="godeeper-card__body">
<p>The reference implementation for 5G-native multicast and broadcast delivery.</p>
<ul class="godeeper-card__links">
<li><a href="/reference-tools/5g-mbs">5G Multicast Broadcast Services</a></li>
</ul>
</div>
</div>

</div>

5G MBS is not one 3GPP work item but a family, run in parallel across SA2 (core architecture), SA4 (user-service layer), CT1/CT3/CT4/CT6 (stage-3 protocols), RAN2/RAN3 (radio and RAN interfaces) and SA3 (security), each with its own work item under a shared umbrella. The table below lists every work item confirmed directly against the 3GPP work item portal for this page; see "References to verify" at the end for exactly what that does and does not establish.

## Release-by-release summary

| 3GPP Release | Key additions |
| ------------ | ------------- |
| Rel-17 | The foundational feature: Stage 2 architecture (TS 23.247), user-service layer protocols (TS 26.502, TS 26.517), Stage 3 core network services (TS 29.532, TS 29.580, TS 29.581, TS 29.537), NR/NG-RAN broadcast support. Security study TR 33.850. |
| Rel-18 | RAN: MBS multicast reception in RRC_INACTIVE (new TS 38.331 clause 5.10, a new DCI format split at the physical layer — see below). Core: charging for SMF/MB-SMF (TS 32.279). UE: pre-configuration Management Object (TS 24.575). Architecture study TR 23.700-47 and security study TR 33.883 precede/accompany this phase. |
| Rel-19 | Non-terrestrial network (NTN) extensions to MBS broadcast, tracked as part of the general **NTN Phase 3** feature rather than a dedicated MBS work item; see [MBS Broadcast over NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn) for the technical detail. |

Check the version of each specification you are targeting for the exact release content; see [Standards: 5G MBS](/standards/5g-mbs) for the full list.

### Work items behind each release

| 3GPP Release | Work item (parent, then children) |
| ------------ | --------------------------------- |
| Rel-17 (SA2, core architecture) | **Parent:** [900038 Multicast-broadcast services in 5G](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=900038) (acronym **5MBS**; TSG SA#90 approval)<br/>**Children:** [830030 Study on Architectural enhancements for 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=830030) (the TR 23.757 study phase), [900009 Stage 2 for 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=900009) (TS 23.247), [910002 CT4 aspect of 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=910002), [920023 Security Aspects of Enhancements for 5G Multicast-Broadcast Services](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920023) (normative phase, delivering **TS 33.501**'s MBS security clauses), preceded by its own study phase [880006 Study on Security Aspects of Enhancements for 5G Multicast-Broadcast Services](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=880006) (acronym **FS_5MBS_SEC**, delivering **TR 33.850**), [920043 CT1 aspects of 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920043), [920044 CT3 aspects of 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920044), [960067 CT6 aspects of 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960067). **TS 29.532 and TS 29.581 are CT4's; TS 29.580 and TS 29.537 are CT3's** — confirmed by checking which TSG sub-group meeting (`3GPPCT3#...`/`3GPPCT4#...`) actually handled each spec's Change Requests: every one of TS 29.532's 154 and TS 29.581's 102 tracked CRs went through CT4; every one of TS 29.580's 128 and TS 29.537's 73 went through CT3, with no exceptions. |
| Rel-17 (SA4, user-service layer) | [940008 5G Multicast-Broadcast Protocols](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940008) (acronym **5MBP3**; TS 26.517; TSG SA#94 approval; rapporteur Thomas Stockhammer, Qualcomm) and, as a separate parallel work item, [920010 5G Multicast-Broadcast User Service Architecture and related 5GMS Extensions](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920010) (acronym **5MBUSA**; TS 26.502; rapporteur Peng Tan, TELUS) — confirmed against each specification's own "Related Work Items" entry on the 3GPP portal, not the work item's own impacted-specs list alone. Both specifications were created directly by their respective work item rather than added to a pre-existing one, so neither has an "introducing CR" in 3GPP's Change Request database — a brand-new specification's first version is approved directly via the work item's own Tdoc, not tracked as a CR. |
| Rel-18 (SA2/CT core network, "Phase 2") | **Parent:** [989999 5G multicast-broadcast services Phase 2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=989999) (acronym **5MBS_Ph2**; TSG SA#98 approval; rapporteur Meng Li, Huawei)<br/>**Children:** [940067 Study on architectural enhancements ... Phase 2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940067) (**FS_5MBS_Ph2**, the TR 23.700-47 study), [960041 Study on security enhancements ... Phase 2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=960041) (TR 33.883), [980013 Stage 2 of 5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=980013) (TS 23.247's Rel-18 update — see below), [990001 CT1 aspects for 5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990001), [990075 CT aspects for 5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990075), [990076 CT3 aspects for 5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990076) (**TS 29.580, TS 29.537**), [990077 CT4 aspects for 5MBS_Ph2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990077) (**TS 29.532, TS 29.581**), [1000005 Security Enhancements ... Phase 2](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000005) |
| Rel-18 (RAN) | **Parent:** [940099 Enhancements of NR Multicast and Broadcast Services](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940099) (acronym **NR_MBS_enh**)<br/>**Child:** [940199 Core part: Enhancements of NR Multicast and Broadcast Services](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940199) (**NR_MBS_enh-Core**) |
| Rel-18 (charging) | [1000010 Charging Aspects for SMF and MB-SMF to Support 5G Multicast-broadcast Services](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000010) (TS 32.279, a brand-new specification created by this work item) — recorded as a child of the Rel-17 **5MBS** umbrella (900038) despite being Rel-18 work; 3GPP work items are sometimes added to an existing umbrella rather than a new one for the later release. |
| Rel-18 (UE pre-configuration) | [990078 UE pre-configuration for 5MBS](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990078) (acronym **UEConfig5MBS**; TS 24.575, also a brand-new specification) |
| Rel-19 (NTN) | Tracked under [1020097 Non-Terrestrial Networks (NTN) for NR Phase 3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1020097) (acronym **NR_NTN_Ph3**) and its core child [1021097 NR_NTN_Ph3-Core](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1021097) — a general NTN feature, not an MBS-specific one; the MBS-relevant CRs against TS 23.247 are simply tagged with this acronym alongside the generic **TEI19** maintenance code. No dedicated "5MBS Phase 3" work item exists. |

## Release 17: the foundational feature

The Rel-17 SA2 architecture work is [**5MBS**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=900038) (WI 900038), approved at TSG SA#90 (rapporteur Meng Li, Huawei), following the study phase captured in TR 23.757. Its Stage 2 child work item (900009) delivered **TS 23.247**, the architectural enhancements defining MBS session concepts (broadcast and multicast delivery, session identifiers, the MB-SMF/MB-UPF network functions) at the core network layer. Four further CT-group children under the same umbrella carried this into stage-3 protocols and NAS: 910002 (CT4, delivering **TS 29.532** and **TS 29.581**), 920044 (CT3, delivering **TS 29.580** and **TS 29.537**), 920043 (CT1) and 960067 (CT6) — confirmed by checking which TSG sub-group actually processed each spec's Change Requests, not merely inferred from the work item names. Security is tracked separately: the study phase, 880006 (FS_5MBS_SEC), delivered the TR 33.850 study; the following normative work item, 920023, delivered TS 33.501's MBS security clauses rather than the study report itself.

In parallel, SA4 ran two further Rel-17 work items for the user-service layer: [**5MBP3**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940008) (WI 940008, "5G Multicast-Broadcast Protocols"), approved at TSG SA#94 with Thomas Stockhammer (Qualcomm) as rapporteur, delivering **TS 26.517** (protocols and formats); and, separately, [**5MBUSA**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=920010) (WI 920010, "5G Multicast-Broadcast User Service Architecture and related 5GMS Extensions"), rapporteur Peng Tan (TELUS), delivering **TS 26.502** (user service architecture) — the two specifications this project's MBS Client, MBSF and MBSTF components implement against directly.

NR/NG-RAN broadcast support (delivery mode 2: reception without an active RRC connection to a specific session) was also introduced at Rel-17, by CR 0088 to TS 38.212 ("Introduction of NR Multicast and Broadcast Services"), approved at RAN#94-e (2021-11-26, Tdoc RP-212979) — this is the same CR that first defines DCI formats 4_0 and 4_1, later extended at Rel-18 below. TS 29.580 (Nmbsf, CT3) and TS 29.581 (Nmbstf, CT4), the stage-3 protocol services this project's own reference tools (MBSF, MBSTF) implement, were created directly by the matching CT-group children of the 5MBS umbrella above. See [Standards: 5G MBS](/standards/5g-mbs) for the complete Rel-17 specification list.

## Release 18: RAN multicast in RRC_INACTIVE, charging, and UE pre-configuration

The Rel-18 RAN work is [**NR_MBS_enh**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940099) (WI 940099, "Enhancements of NR Multicast and Broadcast Services"), with its core part carried by the child work item [**NR_MBS_enh-Core**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940199) (WI 940199). Its headline addition, confirmed by direct comparison of the Rel-17 and Rel-18 issues of the specifications themselves rather than inferred from the work item alone, is letting a UE receive **MBS multicast while in RRC_INACTIVE** state — in Rel-17, multicast reception required an active RRC connection (RRC_CONNECTED).

Concretely, comparing TS 38.331 V17.17.0 (Rel-17) against V18.10.0 (Rel-18) directly: Rel-18 adds an entire new top-level clause absent from Rel-17, **clause 5.10, "MBS multicast reception in RRC_INACTIVE"** (with sub-clauses 5.10.1 Introduction, 5.10.2 Multicast MCCH information acquisition, 5.10.3 MRB configuration). This clause was introduced by **CR 4490 rev 5, "Introduction of eMBS to RRC"**, approved at RAN#102 (2023-12-06, Tdoc RP-233907) — "eMBS" (enhanced MBS) is 3GPP's own shorthand for this Rel-18 RAN feature. At the physical layer, comparing TS 38.212 V17.13.0 against V18.8.0: DCI format 4_0's own scope statement changes from *"used for the scheduling of PDSCH for broadcast in DL cell"* (Rel-17) to *"used for the scheduling of PDSCH for broadcast **or for multicast in RRC_INACTIVE state** in DL cell"* (Rel-18), and gains a second scrambling option, **Multicast MCCH-RNTI**, alongside the existing broadcast MCCH-RNTI — introduced by **CR 0173, "Introduction of Rel-18 enhancements of NR Multicast and Broadcast Services"**, also approved at RAN#102 (2023-11-30, Tdoc RP-233733). The corresponding Stage 2 addition at the core network layer, TS 23.247 clause 6.17 ("Support of Multicast MBS session data reception in UE with RRC_INACTIVE state" — see [MBS Multicast Inactive - RAN Procedures](/tech/5g-mbs/analysis-mbs-multicast-inactive-ran) for how the two layers connect), was introduced by **CR 0149 rev 8** ("Support of MBS multicast reception by UEs in RRC_INACTIVE state"), agreed at SA2#155 and approved at SA#99 (Tdoc SP-230051) under work item **5MBS_Ph2** — bundled in the same Tdoc as two companion CRs, 0159 ("Support RRC_INACTIVE UE receiving multicast MBS data") and 0179 ("Mobility procedures for UEs receiving multicast MBS session data in RRC Inactive state"). The full acquisition path (SIB24, the multicast MCCH, `MBSMulticastConfiguration`, the DCI 4_0/4_1 split between MCCH and MTCH) is analysed in detail on [MBS Multicast Inactive - RAN Procedures](/tech/5g-mbs/analysis-mbs-multicast-inactive-ran).

Two further, independent Rel-18 work items round out the release: [**UEConfig5MBS**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=990078) (WI 990078, "UE pre-configuration for 5MBS") delivered **TS 24.575**, the Management Object letting a UE be pre-configured with MBS PLMN/DNN/S-NSSAI information; and [**WI 1000010**](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=1000010) ("Charging Aspects for SMF and MB-SMF to Support 5G Multicast-broadcast Services") delivered **TS 32.279**, charging management for MBS sessions. An architecture study (TR 23.700-47) and a security study (TR 33.883) accompany this phase.

Every other RAN/PDCP/RLC/MAC/F1AP/E1AP clause this project's own compliance-audit work already relies on (MCCH change-notification timing, the PDCP/RLC MRB receive-window bootstrap, the F1AP Broadcast Context Setup message family, both relevant E1AP clauses) was checked directly against its Rel-18 text and found byte-identical to Rel-17 — the multicast-in-RRC_INACTIVE addition above is the one substantive Rel-18 RAN change identified.

## Release 19: non-terrestrial network extensions

Release 19 extends 5G MBS broadcast to non-terrestrial networks (NTN) — satellite and HAPS-based delivery. See [MBS Broadcast over NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn) for the technical analysis. There is no dedicated "5MBS Phase 3" work item at Rel-19; the feature instead rides on the general **NR_NTN_Ph3** ("Non-Terrestrial Networks (NTN) for NR Phase 3") feature, under its core child **NR_NTN_Ph3-Core**.

At the core network layer, the CR database confirms **CR 0372 rev 5 to TS 23.247, "MBS broadcast support for NTN"**, agreed at SA2#166-Ad Hoc-e and approved at SA#107 (Tdoc SP-250037), tagged `NR_NTN_Ph3-Core` alongside the generic `TEI19` maintenance code. Two companion CRs submitted at the same SA2 meeting (0375, "Definition of MBS service area in case of NR NTN"; 0377, "Supporting MBS broadcast service for NR NTN") were merged into 0372 rather than approved separately. Two later corrections continue the same feature: **CR 0387 rev 2**, "Clarification on MBS broadcast service area" (SA#108, SP-250461), and **CR 0388 rev 3**, again titled "MBS broadcast support for NTN" (SA#110, SP-251334) — indicating the feature was still being refined roughly a year after its introduction.

**`NR_NTN_Ph3-Core` does touch TS 38.331 at Rel-19, and it does carry MBS content — just not under a subject line that says so.** 17 Change Requests carry that exact work item tag against this specification (CR 5084, 5192, 5315, 5435, 5463, 5481, 5526, 5562, 5590, 5618, 5627, 5637, 5682, 5713, 5726, 5741, 5744) — CR 5403 is tagged only with the parent acronym `NR_NTN_Ph3`, not the child `NR_NTN_Ph3-Core`, so it does not belong in this list. A subject-line search across all 17 finds only generic NTN maintenance work — SMTC timing, cell selection, UE capability signalling, positioning reports — with no mention of MBS, multicast or broadcast. Opening the CR document itself rather than its subject line tells a different story: **CR 5481, "Introduction of NTN Phase 3 enhancements"** (agreed RAN2#131; approved RAN#109, Tdoc RP-252778), is the Change Request that introduces the new SIB published as **SIB27** in TS 38.331 V19.3.0 — its own text reads "SIBXX contains the information of the intended service area(s) of an MBS broadcast service(s) in an NTN cell," with the full `IntendedServiceAreaList-r19`/`IntendedServiceAreaInfo-r19` ASN.1 already present verbatim, matching the published spec exactly. The RAN-layer normative work for Rel-19 MBS-over-NTN has in fact reached CR stage; it is bundled inside a generically-titled introduction CR that a keyword search over CR subjects cannot find. This page's own linked [MBS Broadcast over NTN](/tech/ntn/analysis-mbs-broadcast-over-ntn) analysis, which reads SIB27 directly from the published spec text rather than searching CR subjects, is the reliable source for this feature.

---

<details>
<summary>References to verify</summary>

Work item entries above (900038, 830030, 900009, 910002, 880006, 920023, 920043, 920044, 960067, 940008, 920010, 940099, 940199, 989999, 940067, 960041, 980013, 990001, 990075, 990076, 990077, 1000005, 990078, 1000010, 1020097, 1021097) are checked against `portal.3gpp.org`'s work item detail pages for acronym, title, release, responsible group and (where shown) rapporteur and TSG approval meeting number. Spec-to-work-item attribution (which work item created which specification) is checked against each specification's own "Related Work Items" entry on the portal, not only a work item's own impacted-specs field, since the two do not always agree.

CR-level detail uses the 3GPP Work Plan and Change Request explorer from [Standards2Deployments](/reference-tools/standards2deployments) against 3GPP's public Change Request database export. Every CR cited above is confirmed `agreed` at working-group level and `approved` at TSG level in that export, cross-checked against the work item acronym its own portal page names. No 3GPP delegate login is needed for any of this — the CR database itself is public; only per-CR document *text* sits behind the delegate-only portal.

CR 5481 (TS 38.331, introducing SIB27) is confirmed directly from its own document text, downloaded via the 3GPP Explorer tool from the public FTP archive, not inferred from its subject line — its subject, "Introduction of NTN Phase 3 enhancements," does not itself mention MBS.

**Not independently confirmed**: TS 24.575's attribution to WI 990078 could not be checked via the work item portal's own "specifications resulting from this work item" listing, which returns no records for 990078 or its children — a gap in that specific portal endpoint. The attribution rests on the specification's own front matter and this project's existing inventory (`rt-mbs-specs-index.md`).

**CT1/CT3/CT4 mapping**: every CR against TS 29.532/29.580/29.581/29.537 in the database is tagged only with the parent work item acronym (**5MBS**/**5MBS_Ph2**), not an individual CT-group child code, so the work item names alone don't distinguish them. The `meetingWg` field does: it names the actual TSG sub-group that processed each CR. All 154 of TS 29.532's tracked CRs and all 102 of TS 29.581's went through CT4; all 128 of TS 29.580's and all 73 of TS 29.537's went through CT3.

**Not established by this page**: full meeting-by-meeting history for every CR against every specification named here. Only the introducing/headline CRs are pulled out, not the roughly 450 CRs the filtered export holds across TS 23.247, TS 29.532, TS 29.580, TS 29.581 and TS 29.537.

</details>

## Related Standards Work

- [Standards: 5G Multicast Broadcast Services (MBS)](/standards/5g-mbs)
- [Standards: 5G Broadcast](/standards/5g-broadcast)
- [Standards: 5G Broadcast - Standards Evolution](/standards/5g-broadcast-standards-evolution)
- [Standards: Non-Terrestrial Networks (NTN)](/standards/ntn)
- [Tech: Multicast & Broadcast in 5G](/tech/5g-mbs)

:::note
Refer to the [Standards](https://github.com/5G-MAG/Standards/) repository to contribute to this documentation.
:::

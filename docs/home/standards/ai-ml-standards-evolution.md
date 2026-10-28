---
hide_title: true
title: AI/ML Evaluation Framework - Standards Evolution
slug: /standards/ai-ml/evolution
description: Release-by-release 3GPP work item and Change Request history behind AI/ML Evaluation Framework.
sidebar_label: Release history
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8"/><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8"/><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5"/><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0"/><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5"/><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Standards</span>
<h1>AI/ML Evaluation Framework - Standards Evolution</h1>
</div>
</div>

This page is the detailed, release-by-release companion to [AI/ML Evaluation Framework: Specifications](/standards/ai-ml): the 3GPP work items and Change Requests behind each release. See that page for the full specification list and current scope.

:::tip[At a glance]

- **Release 20:** TS 23.288 work items AIML_CN_Ph2, TEI20_Metrics and TEI20_UDCE in the work plan; TS 23.288 V20.2.0 adds a loss value to the model accuracy information. Scopes not read in a primary source are marked unverified.
- **Release 19:** work item FS_AI4Media; 2 versions without a change request. In TS 23.288, work item AIML_CN adds vertical federated learning, AI/ML positioning support and two analytics.
- **Release 18:** work items FS_AIML_MT, FS_AIMLsys, FS_eNA_Ph3; 3 change requests. TS 23.288 gains ML model training, accuracy monitoring, federated learning and model storage in the ADRF.
- **Release 17:** work item eNA_Ph2 splits the NWDAF into AnLF and MTLF and adds ML model provisioning.
- **Release 15 and 16:** the NWDAF is introduced in Release 15; work item eNA in Release 16 defines the analytics framework.

:::

Sources: the 3GPP release descriptions TR 21.915 to TR 21.919, the 3GPP work plan of 28 September 2026, the 3GPP Change Request database of 25 September 2026, and the change history of TR 22.874 V18.2.0, TR 23.700-80 V18.0.0, TR 23.700-81 V18.0.0, TR 26.847 V19.0.0, TR 26.927 V19.0.0.

This page covers [TR 22.874](https://www.3gpp.org/dynareport/22874.htm), [TR 23.700-80](https://www.3gpp.org/dynareport/23700-80.htm), [TR 23.700-81](https://www.3gpp.org/dynareport/23700-81.htm), [TR 26.847](https://www.3gpp.org/dynareport/26847.htm), [TR 26.927](https://www.3gpp.org/dynareport/26927.htm). The work items are those that name these specifications in the 3GPP work plan. The change requests are those recorded in the 3GPP Change Request database as implemented in a version.

## Release 20

Release 20 (work plan of 28 September 2026); completion percentages are those of the work plan. There is no TR 21.920 in the archive yet. The items below come from the work plan of 28 September 2026 and from the change history and text of TS 23.288 V20.2.0; scopes that were not read in a primary source are marked unverified.

| Work item | Title | Specifications (work plan) | What was verified |
| --- | --- | --- | --- |
| AIML_CN_Ph2 (UID 1120116, SP-251669; 98%, finish 3 Mar 2027) | Core Network Enhanced Support for Artificial Intelligence (AI) / Machine Learning (ML) Phase 2 | TS 23.288 (Stage 2 part AIML_CN_Ph2-ARC); the CT part AIML_CN_Ph2-CT lists eleven specifications, among them TS 29.510, TS 29.517 and TS 29.522 | Title and listing only. The 3GPP portal entry gives no description; the scope is unverified. |
| TEI20_Metrics (UID 1110082, SP-251207; 100%, finish 6 Jun 2026) | Model Evaluation Metrics Enhancement | TS 23.288 | TS 23.288 V20.2.0 clause 5C: the accuracy information includes an accuracy or loss value and its compute method, and the loss value is computed from the differences between actual and predicted values; V19.8.0 clause 5C names only the accuracy value. Clauses 6.2F.2 and 7.9.2 name the desired ML model metrics. The change history records CR 1542 "Model Evaluation Metrics Enhancement" in V20.0.0 (SP-260092); the link between the CR and the work item is by identical title. |
| TEI20_UDCE (UID 1120039, SP-260298; 91%, finish 3 Mar 2027) | UPF Data Collection Enhancement | TS 23.288, TS 23.501 | Title and listing only; unverified. |

TS 23.288 V20.2.0 also adds clause 6.24 (Abnormal User Plane Traffic Analytics) and clause 6.25 (Traffic pattern analytics), which V19.8.0 does not have; the change history records CRs 1547, 1553, 1554 and 1555 in V20.0.0 and CR 1573 in V20.1.0. The change history does not name the work item, so the attribution is unverified.

The SA4 reports themselves point to Release 20 next steps. TR 26.927 V19.0.0 clause 7 recommends, for collaboration scenario 3 (IMS services), stage 3 normative work in Release 20 on AI/ML model distribution and operation in IMS, including extending TS 26.114 and TS 26.264, and, for a new study in Release 20 or beyond, further study of the traffic characteristics of the AI/ML data components and of possible QoS identifiers. TR 26.847 V19.0.0 clause 6 recommends a new evaluation study covering AI/ML traffic characteristics and KPIs for the evaluation scenarios. These are recommendations in the reports, not decisions; the work plan entry below is the only Release 20 item found that names TS 26.264.

The work plan lists the Release 20 work item AIML_IMS-MED, "Media aspects for AI/ML in IMS services" (UID 1080049, SP-250878, S4, 100%, finish 6 June 2026), against TS 26.114 and TS 26.264; its scope is unverified. The change history of TS 26.114 V20.0.0 records CR 0609 "CR for AI/ML in IMS" (SA#112, SP-260396, category B); the change history does not name the work item, so the link to AIML_IMS-MED is by subject. TR 21.919 clause 8.2.1 states that Stage 1 of AIML_MT_Ph2 (AI/ML Model Transfer Phase 2) was moved to the next release.

## Release 19

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_AI4Media](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=950011) | Study on Artificial Intelligence (AI) and Machine Learning (ML) for Media | Study | [TR 26.847](https://www.3gpp.org/dynareport/26847.htm), [TR 26.927](https://www.3gpp.org/dynareport/26927.htm) | Complete, Jun 2025 | [SP-220328](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_95E_Electronic_2022_03/Docs/SP-220328.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 26.847 | 19.0.0 |  | Version 19.0.0 created by MCC upon approval in SA#108 |  |
| TR 26.927 | 19.0.0 |  | Version 19.0.0 created by MCC upon approval in SA#108 |  |

What the release description adds (TR 21.919 clause 8):

- AIML_CN (clause 8.1.3, SA2 with CT and SA3 parts; TS 23.288) enhances: LCS support for direct AI/ML based positioning (the LMF obtains or trains ML models, with NWDAF containing MTLF as a source and for performance monitoring); 5GC support for vertical federated learning; NWDAF-assisted policy control and QoS enhancement (QoS and policy assistance analytics); and NWDAF support for mitigating signalling storms. In TS 23.288 V19.8.0 these correspond to clause 6.2E.4, clauses 5.4, 6.2H and 7.12, clause 6.23 and clause 6.22, none of which are in V18.13.0; clauses 5.3 and 6.2C are renamed "Horizontal Federated Learning".
- eNetAE19 (clause 25.7.2, CT3; TS 29.520, TS 29.574, TS 29.575, TS 29.576, TS 29.517) enhances Nnwdaf_MLModelMonitor_Register, _Deregister and _Subscribe, completes the analytics transfer and aggregation procedures, and adds the global ML model accuracy information to Nnwdaf_MLModelTraining_Notify.
- AIML_MGT_Ph2 (clause 8.1.4, SA5; TS 28.105) adds pre-specialized training, fine-tuning, training for multiple contexts, distributed and federated training, reinforcement learning, inference emulation environments and AI/ML inference explainability to AI/ML management.
- AIML_App (clause 8.2.2, SA6; TS 23.482 and TS 23.436) specifies the AI/ML enablement (AIMLE) architecture and an ML repository.
- PAIDC_UPF (clause 8.2.3, CT3 and CT4; TS 29.564 and the session management event exposure service specification) adds reduced reporting instructions, report bundling and RAT type filtering to UPF event exposure subscriptions.
- FS_AIML_CAL (clause 8.3.1, TSG SA) is a study of AI/ML consistency and terminology alignment across 3GPP groups.
- AIML_MT_Ph2: clause 8.2.1 is void; it states that only Stage 1 was defined in Release 19 and was moved to the next release. TS 22.261 records CR 0713 "Adding functional requirements of AIML-Ph2" and CR 0714 "Adding KPIs for AIML-Ph2" in V19.4.0; clauses 6.40.2.2 and 7.10.2 (direct device connection) are in V19.15.0 and not in V18.19.0.
- FS_AI4Media (SP-220328, SA4) is listed in TR 21.919 clause 29.1 among the studies for which no summary is provided; TR 21.918 clause 11.3 also lists it, in the table of the AI/ML management clause, without a description.

## Release 18

| Work item | Title | Type | Specifications | Status | WID |
| --- | --- | --- | --- | --- | --- |
| [FS_AIML_MT](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=860009) | Study on traffic characteristics and performance requirements for AI/ML model transfer in 5GS | Study | [TR 22.874](https://www.3gpp.org/dynareport/22874.htm) | Complete, Jun 2021 | [SP-220441](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220441.zip) |
| [FS_AIMLsys](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940071) | Study on 5G System Support for AI/ML-based Services | Study | [TR 23.700-80](https://www.3gpp.org/dynareport/23700-80.htm) | Complete, Dec 2022 | [SP-220071](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_95E_Electronic_2022_03/Docs/SP-220071.zip) |
| [FS_eNA_Ph3](https://portal.3gpp.org/desktopmodules/WorkItem/WorkItemDetails.aspx?workitemId=940073) | Study on Enablers for Network Automation for 5G - phase 3 | Study | [TR 23.700-81](https://www.3gpp.org/dynareport/23700-81.htm) (with TR 23.700-85) | Complete, Dec 2022 | [SP-220678](https://www.3gpp.org/ftp/tsg_sa/TSG_SA/TSGS_96_Budapest_2022_06/Docs/SP-220678.zip) |

| Specification | Version | CR | Subject | Work item |
| --- | --- | --- | --- | --- |
| TR 22.874 | 18.0.0 |  | Raised by MCC to v.18.0.0 following Approval |  |
| TR 23.700-80 | 18.0.0 |  | MCC editorial update for publication after approval at TSG SA#98-e (Release 18) |  |
| TR 23.700-81 | 18.0.0 |  | MCC editorial update for publication after approval at TSG SA#98-e (Release 18) |  |
| TR 22.874 | 18.0.1 |  | Corrected logo (5G->5GA) |  |
| TR 22.874 | 18.1.0 | 0001 | FS_AMMT update to Functional requirements for AMMT services | AIML_MT |
| TR 22.874 | 18.1.0 | 0002 | FS_AMMT update to clause 7.4 Group performance Flocking Use Case | AIML_MT |
| TR 22.874 | 18.2.0 | 0003 | FS_AMMT update to CPR tables with new format | FS_AIML_MT |

What the release descriptions add (TR 21.918 clause 11 and clause 26):

- AIML_MT (clause 11.1, SA1): the study FS_AIML_MT identifies use cases, performance requirements and traffic characteristics of AI/ML model distribution, transfer and training; its Stage 1 normative work is in TS 22.261 (clause 6.40 AI/ML model transfer in 5GS, clause 7.10 KPIs; change requests CR 0551 "Adding requirements for AMMT" and CR 0552 "Adding performance requirements for AMMT" in V18.4.0).
- AIMLsys (clause 11.1, SA2 with CT3 and CT4; outputs of FS_AIMLsys in TR 23.700-80): planned data transfer with QoS, enhanced external parameter provisioning, member UE selection assistance, multi-member AF session with required QoS, end-to-end data volume transfer time analytics (an NWDAF analytics, TS 23.288 clause 6.18) and new NEF monitoring events.
- eNA_Ph3 (clause 26.1, SA2): listed without a summary. TS 23.288 V18.13.0 has, and V17.12.0 does not have: federated learning among NWDAFs (clauses 5.3 and 6.2C), accuracy monitoring of analytics and ML models (clauses 5C, 6.2D and 6.2E, Nnwdaf_MLModelMonitor in clause 7.9), ML model training (clause 6.2F, Nnwdaf_MLModelTraining in clause 7.10 and Nnwdaf_MLModelTrainingInfo in clause 7.11) and ML model storage in the ADRF (clauses 6.2B.5 to 6.2B.7, Nadrf_MLModelManagement in clause 10.3). The change history of V18.x records, for example, CR 0557 "Monitoring of accuracy of ML Models", CR 0641 "ML Model storage and retrieval via ADRF" and CR 0773 "Updates for Nnwdaf_MLModelTraining service".
- eNetAE (clause 26.2, CT3; TS 29.520, TS 29.574, TS 29.575, TS 29.576): the effect of user consent on data collection and storage, multiple notification endpoints, and analytics service enhancements such as the preferred accuracy levels "Medium" and "Highest".
- AIML_MGT (clause 11.3, SA5; TS 28.105): AI/ML management capabilities for ML training, emulation, deployment and inference.
- AIMLsysNEF_CH (clause 11.4, SA5; TS 32.254): NEF charging for the AI/ML supporting NEF northbound APIs.

## Release 17

| Work item | Title | What the release description adds |
| --- | --- | --- |
| eNA_Ph2 (TR 21.917 clause 9.4.3, SA2 with CT3, CT4 and SA3) | Enablers for Network Automation for 5G - phase 2 | Logical function decomposition of the NWDAF into the Model Training Logical Function and the Analytics Logical Function; ML model training and provisioning to NWDAFs containing an Analytics Logical Function; trained model sharing between NWDAF instances, limited to single vendor environments; UE data as an input for analytics (via an AF); user consent for UE data collection and analysis. |

TS 23.288 V17.12.0 has the ML model provisioning procedure (clause 6.2A) with Nnwdaf_MLModelProvision (clause 7.5) and Nnwdaf_MLModelInfo (clause 7.6), data collection from the UE Application (clause 6.2.8) and user consent for analytics (clause 6.2.9). It has no accuracy monitoring (clause 5C) and no ML model training procedure (clause 6.2F); those are in V18.13.0.

## Release 16

eNA (TR 21.916 clause 18.1, SA2 with CT3 and CT4) specifies the data collected by the NWDAF and its output (statistics and predictions): a data collection architecture from any NF, a network data analytics exposure architecture, general data collection procedures, the input data and output of each Analytics ID, and the services Nnwdaf_AnalyticsSubscription (subscribe and notify) and Nnwdaf_AnalyticsInfo (request and response).

## Release 15

TR 21.915 clause 5.5.2.2.5 states that the Network Data Analytics Function (NWDAF) is introduced to provide data analytics support, namely the load of each network slice.

## TR 22.874 before change control

<details>
<summary>6 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Sep 2020 | SA1#91-e | S1-203150 | TR Skeleton agreed | 0.0.0 |
| Sep 2020 | SA1#91-e | S1-203382 | Agreements in SA1#91-e: S1-203137, S1-203284, S1-203074, S1-203135, S1-2031356, S1-203312, S1-203133, S1-203314, S1-203315, S1-203316, S1-203317, S1-203318, S1-203144, S1-203145, S1-203146, S1-203158 | 0.1.0 |
| Nov 2020 | SA1#92-e | S1-204352 | Agreements in SA1#92-e: S1-204014, S1-204339, S1-204394, S1-204395, S1-204396, S1-204397, S1-204398, S1-204399, S1-204400, S1-204401, S1-204402, S1-204403, S1-204404 | 0.2.0 |
| Mar 2021 | SA1#93-e | S1-210303 | Agreements in SA1#93-e: S1-210014, S1-210015, S1-210267, S1-210321, S1-210330, S1-210331, S1-210332, S1-210333, S1-210334, S1-210336, S1-210337, S1-210374, S1-210375, S1-210376, S1-210377, S1-210378, S1-210379, S1-210380, S1-210381, S1-210382, S1-210383, S1- 210384, S1-210385, S1-210386, S1-210387, S1-210388, S1-210389, S1-210390, S1-210391, S1-210409, S1-210410 | 0.3.0 |
| May 2021 | SA1#94-e | S1-211303 | Agreements in SA1#94-e: S1-211075, S1-211254, S1-211396, S1-211397, S1-211398, S1-211399, S1-211400, S1-211401, S1-211402, S1-211403, S1-211404, S1-211405, S1-211406, S1-211407, S1-211408, S1-211409, S1-211410, S1-211411, S1-211412, S1-211413 | 1.1.0 |
| Jun 2021 | SA#92e | SP-210507 | Raised by MCC to v.2.0.0 for Approval | 2.0.0 |

</details>

## TR 23.700-80 before change control

<details>
<summary>3 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Feb 2022 | SA2#149-e | S2-2201813 | TR skeleton | 0.0.0 |
| Sep 2022 | SA#97-e | SP-220830 | MCC editorial update for presentation to TSG SA for information | 1.0.0 |
| Nov 2022 | SA#98-e | SP-221102 | MCC editorial update for presentation to TSG SA for approval | 2.0.0 |

</details>

## TR 23.700-81 before change control

<details>
<summary>3 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Feb 2022 | SA2#149E | S2-2201066 | Skeleton document proposal | 0.0.0 |
| Sep 2022 | SA#97-e | SP-220831 | MCC editorial update for presentation to TSG SA for information | 1.0.0 |
| Nov 2022 | SA#98-e | SP-221116 | MCC editorial update for presentation to TSG SA for information | 2.0.0 |

</details>

## TR 26.847 before change control

<details>
<summary>11 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Nov 2023 | SA4#126 | S4-231933 | Initial draft of the TR: - Agreement of S4-231774: TR skeleton | 0.1.0 |
| Jan 2024 | SA4#127 | S4-240389 | Agreed version of the TR at SA4#127 - Agreement of S4-240211 | 0.2.0 |
| Aug 2024 | SA4#129-e | S4-241643 | Agreed version of the TR at SA4#129-e - Agreement of S4-241586 | 0.3.0 |
| Nov 2024 | SA4#130 | S4-242112 | Agreed version of the TR at SA4#129-e - Agreement of S4-242154, S4-241951 | 0.4.0 |
| Feb 2025 | SA4#131 | S4-250301 | Agreed version of the TR at SA4#131 - Agreement of S4-250111, S4-250231 | 0.5.0 |
| Feb 2025 | SA4#131 | S4-250399 | Editorial format changes | 0.5.1 |
| Mar 2025 | SA#107 | SP=250285 | Version 1.0.0 created by MCC | 1.0.0 |
| Apr 2025 | SA4#131-bis-e | S4-250669 | Agreed version of the TR at SA4#131-bis-e - Agreement of S4-250552, S4-250650 | 1.1.0 |
| May 2025 | SA4#132 | S4-250865 | Editorial improvements | 1.1.1 |
| May 2025 | SA4#132 | S4-251126 | Agreed version of the TR at SA4#132 - Agreement of S4-25865, S4-250897 | 1.3.0 |
| May 2025 | SA#108 | SP-250640 | Version 2.0.0 created by MCC to be sent to TSG SA for approval | 2.0.0 |

</details>

## TR 26.927 before change control

<details>
<summary>19 versions before approval</summary>

The Foreword of the specification defines the first digit of the version: 1 means presented to TSG for information, 2 means presented to TSG for approval, and 3 or greater indicates a TSG approved document under change control. The change history lists the versions before approval as follows.

| Date | Meeting | TDoc | Subject | Version |
| --- | --- | --- | --- | --- |
| Jan 2022 | SA4#118e | S4-220498 | Agreements after SA4#118e (S4-220391: TR skeleton) | 0.1.0 |
| Nov 2022 | SA4#121 | S4-221376 | Inclusion of use cases | 0.2.0 |
| Feb 2023 | SA4#122 | S4-230378 | Introduction of split models and configurations (S4-230401) | 0.3.0 |
| Feb 2023 | SA4#122 | S4-230405 | Update of this Change history table | 0.3.1 |
| Jun 2023 | SA4#124 | S4-231043 | Workflow and procedures (S4-230830) | 0.4.0 |
| Nov 2023 | SA4#126 | S4-231923 | Model Data (S4-231885), formats (S4-231772), frameworks (S4-231884), Federated learning (S4-231886), architecture (S4-231959) | 0.5.0 |
| Jan 2024 | SA4#127 | S4-240421 | Media delivery architecture (S4-240209), model data (S4-240247), compression tools (S4-240271), Metadata (S4-240436), Adaptive model workflow (S4-240449) | 0.6.0 |
| Apr 2024 | SA4#127-bis-e | S4-240799 | Procedure for AIML distribution and operation (S4-240649), existing formats (S4-240646), general architecture (S4-240782), basic workflow for split inferencing (S4-240783), frameworks update (S4-2400ZZ), existing frameworks update (S4-240784) | 0.7.0 |
| May 2024 | S4#128 | S4-241323 | Architecture updates (S4-241027), AI-related work (S4-241327), Federated learning procedures (S4-241329), Split inferencing procedures update (S4-241330), split operations (S4-241301), Crowdsourcing use case (S4-241294), intermediate data compression approaches (S4-241331) | 0.8.0 |
| Aug 2024 | SA4#129-e | S4-241597 | Annex on collaboration scenarios (S4aV240029) | 0.8.1 |
| Aug 2024 | SA4#129-e | S4-241662 | Editorial: missing refs, architectures for collaboration scenarios (S4-241557), RTC scenarios (S4-241647), compression metadata (S4-241667), mapping to IMS (S4-241715, S4-241689), MPEG FCM update (S4-241725), update on metadata for split operations (S4-241729), update on split AIML procedures (S4-241742), collaboration scenarios and use cases (S4-241740) | 0.9.0 |
| Nov 2024 | SA4#130 | S4-241950 | TR structure (S4-241950), Definitions (S4-211955), Metadata (S4-241981), Data components (S4-241954), formats and compression (S4-242178), Media Data (S4-242212), user plane data (S4-242181), conclusions (S4-242218) | 0.10.0 |
| Feb 2025 | SA4#131 | S4-250335 | Editorial clean-up. (S4-231884 was partly implemented) Abbreviations, language consistency, references numbering, typos, styles fixed. (S4-250201,S4-250283), Federate learning metadata (S4-250206), tasks discovery over IMS (S4-250352), conclusions (S4-250403) | 0.11.0 |
| Mar 2025 | SP#107 |  | Version 1.0.0 created by MCC for presentation to TSG SA | 1.0.0 |
| Apr 2025 | SA4#131-bis-e | S4-250624 | Related work (S4aV250024) | 1.0.1 |
| Apr 2025 | SA4#131-bis-e | S4-250676 | Various edits (S4-250504), conclusions (S4-250649, S4-250711) | 1.1.0 |
| May 2025 | SA4#132 | S4-250855 | Editorial improvements | 1.1.1 |
| May 2025 | SA4#132 | S4-251089 | Conclusions (S4-251128, S4-251050), definitions (S4-251130) | 1.2.0 |
| May 2025 | SA#108 | SP-250639 | Version 2.0.0 created by MCC to send to TSG SA for approval | 2.0.0 |

</details>

## Related

- [AI/ML Evaluation Framework: Specifications](/standards/ai-ml)
- [AI/ML Evaluation Framework: Technology](/tech/ai-ml)

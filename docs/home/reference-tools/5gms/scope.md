---
title: Scope
hide_title: true
sidebar_position: 0
description: Overview of the 5G Media Streaming (5GMSd) architecture, reference points, features and what the 5G-MAG Reference Tools implement.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>Scope</h1>
</div>
</div>

<div style="margin: 8px 0"><a class="button button--outline button--primary" href="/reference-tools/5gms/scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="/reference-tools/5gms/resources" style="margin: 2px 4px 2px 0">Resources</a> <a class="button button--outline button--primary" href="/reference-tools/5gms/tutorials" style="margin: 2px 4px 2px 0">Tutorials</a> <a class="button button--outline button--primary" href="/reference-tools/5gms/tutorials#video-library" style="margin: 2px 4px 2px 0">Video Library</a></div>

5G Media Streaming (5GMS) is a 3GPP framework for high-quality, efficient delivery of media, supporting services from Mobile Network Operators (MNOs) and third parties in both Downlink (5GMSd) and Uplink (5GMSu) Media Streaming. The 5GMS architecture is functionally divided into independent components, enabling deployments with various degrees of integration between 5G MNOs and Content Providers. For acronyms used here, see the [Glossary](/tech/glossary).

The reference points below use a trailing `d` to indicate the downlink variant (for example M1d, M4d, M5d). The following table summarises the interfaces you will meet on this page.

| Reference point | Connects                                                                    | Purpose                                                                                                |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| M1 / M1d        | 5GMS Application Provider to 5GMS Application Function (AF)                 | Provisioning of streaming sessions (content hosting, certificates, policies, reporting configurations) |
| M2d             | 5GMS Application Provider to 5GMS Application Server (AS)                   | Content ingest into the AS (HTTP push or pull)                                                         |
| M3 / M3d        | 5GMS Application Function to 5GMS Application Server                        | Internal configuration of the AS by the AF                                                             |
| M4d             | 5GMS Application Server to 5GMS Client                                      | Delivery of media to the client (for example DASH over HTTP)                                           |
| M5 / M5d        | 5GMS Client to 5GMS Application Function                                    | Media session handling and reporting (Service Access Information, consumption, metrics)                |
| M6d             | Media Session Handler to Media Player / 5GMSd-Aware Application (in the UE) | Client-side API between the session handler and the player or application                              |
| M7d             | Media Player to Media Session Handler (in the UE)                           | Client-side API used by the player to drive the session handler                                        |
| M8              | 5GMS Application Provider to 5GMSd-Aware Application                        | Application-level information (out of 3GPP scope), for example the stream list                         |

The reference tools developed by 5G-MAG for 5GMSd consist of four main components: the **5GMSd Application Function (AF)** (`rt-5gms-application-function`), which exposes the M1 provisioning and M5 session handling interfaces; the **5GMSd Application Server (AS)** (`rt-5gms-application-server`), which caches and delivers media objects to clients; the **Media Session Handler** (`rt-5gms-media-session-handler`), an Android background service that manages the streaming session on the User Equipment (UE) side; and the **Media Stream Handler** (`rt-5gms-media-stream-handler`), which handles media playback using the configuration provided by the Media Session Handler. In TS 26.501 terms the Media Stream Handler plays the role of the downlink **Media Player**.

## Specifications and releases implemented

The reference tools implement the **downlink** direction (5GMSd) against the **Release 17** normative baseline:

- **[3GPP TS 26.501](https://www.3gpp.org/dynareport/26501.htm)** for the architecture, functional entities and features.
- **[3GPP TS 26.512](https://www.3gpp.org/dynareport/26512.htm)** for the M1 provisioning APIs, the M5 session-handling APIs and the AS configuration. In Release 17 the session-handling APIs live in TS 26.512; **[3GPP TS 26.510](https://www.3gpp.org/dynareport/26510.htm)** does not exist in Release 17.
- **[3GPP TS 26.511](https://www.3gpp.org/dynareport/26511.htm)** for profiles, codecs and formats of the delivered media.

The tools track the Release 18 changes (where the session-handling APIs move into TS 26.510 and are generalised across the 5GMS and RTC systems); the "Summary of APIs" table below maps the Release 17 and Release 18 API filenames side by side and marks which are implemented today.

Scope boundaries worth noting up front:

- The **uplink** direction (5GMSu), where the UE is the media source, is defined by the same specifications but is **not** implemented by these tools.
- Several fields accepted by the M1 Content Hosting API are not yet implemented (Content Preparation, Edge Resources, geo-fencing and URL signing); see the notes in the "Feature: Content Hosting" and "Summary of APIs" sections.
- The generic UE data collection and event exposure framework ([TS 26.531](https://www.3gpp.org/dynareport/26531.htm) and [TS 26.532](https://www.3gpp.org/dynareport/26532.htm)) is provided as a separate project and is not yet wired into 5GMS; see the "Feature: Data collection, reporting and exposure" section.

Technical documentation providing context to this project can be found in the link below.

[Tech: Streaming, Media Delivery & Data Collection](/tech/5gms)

A list of relevant specifications can be found in the link below.

[Standards: 5G Media Streaming](/tech/standards/5gms)

## What is being implemented?

:::tip[In short]
The functional entities of 5G Media Streaming, instantiated for 5G Unicast Downlink Media Streaming (5GMSd), including support for various of the features specified, reference points and APIs.
:::

## 5G Unicast Downlink Media Streaming (5GMSd)

A functional 5GMSd implementation is available with the building blocks highlighted with the green tick below.

<img loading="lazy" src="/assets/images/5gms/5GMS_Downlink_RT.png" alt="5GMSd downlink architecture with the entities implemented by the Reference Tools marked with a green tick">

_Figure: 5GMSd downlink architecture. Entities marked with a green tick are implemented by the 5G-MAG Reference Tools._

This includes the implementation of the following entities: **5GMSd Application Provider**, **5GMSd AS**, **5GMSd AF**, **5GMSd Client** (with **Media Session Handler** and **Media Player**) and **5GMSd-Aware Application**.

[Resources page](./resources)

The following tutorials cover the deployment of an end-to-end 5GMSd implementation.

[Go to the Tutorial: 5G MSd End-to-End deployment (with Docker)](./tutorials/end-to-end)

[Go to the Tutorial: 5G MSd End-to-End deployment with 5G Network](./tutorials/end-to-end-with-5g)

The following tutorials cover the deployment and testing of 5GMSd AS and AF.

[Go to the Tutorial: Developing and Testing the 5GMS Application Server](./tutorials/testing-AS)

[Go to the Tutorial: Testing the 5GMS Application Function](./tutorials/testing-AF)

[Go to the Tutorial: Testing M1 and M5 APIs with Postman](./tutorials/testing-postman)

Note that before the required features of the 5GMS System can be used by 5GMS Clients, they are first provisioned by a 5GMS Application Provider creating one or more _Provisioning Sessions_. The 5GMSd Application Provider can then specify one or more 5GMSd features in the Provisioning Session. The Provisioning Session information may include Content Hosting Configurations, Content Preparation Templates, Server Certificates, Policy Templates, a Consumption Reporting Configuration, Metrics Reporting Configurations, Edge Resources Configurations and Event Data Processing Configurations.

Once created, this is a representation of a Provisioning Session:

```json
{
  "provisioningSessionId": "string",
  "provisioningSessionType": "DOWNLINK",
  "aspId": "string",
  "appId": "string",
  "serverCertificateIds": ["string"],
  "contentPreparationTemplateIds": ["string"],
  "metricsReportingConfigurationIds": ["string"],
  "policyTemplateIds": ["string"],
  "edgeResourcesConfigurationIds": ["string"],
  "eventDataProcessingConfigurationIds": ["string"]
}
```

Where:

- `provisioningSessionId`: A unique identifier for this Provisioning Session.
- `provisioningSessionType`: The type of Provisioning Session.
- `aspId`: The identity of the Application Service Provider responsible for this Provisioning Session.
- `appId`: The Application Identifier to which this Provisioning Session pertains.

## Feature: Content Hosting

The content hosting feature provides a service equivalent to a Content Delivery Network (CDN) deployed inside or outside the Trusted DN. It includes selecting the ingest protocol and format, caching and proxying of media objects, content preparation, access protection (e.g. URL signing) and indicating a target distribution area (e.g. through geofencing).

<img loading="lazy" src="/assets/images/5gms/5GMS_ContentHosting.png" alt="5GMS Content Hosting feature: the Application Server acting as a CDN, ingesting and delivering media objects">

The following are the reference points and APIs.

- At M1:
  - [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)
  - [Content protocols discovery API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ContentProtocolsDiscovery.yaml)
  - [Server Certificates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ServerCertificatesProvisioning.yaml)
  - [Content Preparation Templates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ContentPreparationTemplatesProvisioning.yaml)
  - [Edge Resources provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_EdgeResourcesProvisioning.yaml)
  - [Policy Templates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_PolicyTemplatesProvisioning.yaml)
  - [Content Hosting provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ContentHostingProvisioning.yaml)

- At M5:
  - [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)

Once a Provisioning Session is established using the API at interface M1d, **Content Hosting** can be configured. The security of the content published to the 5GMS System may be guaranteed by a provisioned **Server Certificate**.

This is a JSON scheme of a Content Hosting Configuration, which tells the 5GMS System where to ingest content from and how to distribute it:

```json
{
  "name": "string",
  "ingestConfiguration": {
    "pull": true,
    "protocol": "string",
    "baseURL": "string"
  },
  "distributionConfigurations": [
    {
      "entryPoint": {
        "relativePath": "string",
        "contentType": "string",
        "profiles": ["string"]
      },
      "contentPreparationTemplateId": "string",
      "edgeResourcesConfigurationId": "string",
      "canonicalDomainName": "string",
      "domainNameAlias": "string",
      "baseURL": "string",
      "pathRewriteRules": [
        {
          "requestPathPattern": "string",
          "mappedPath": "string"
        }
      ],
      "cachingConfigurations": [
        {
          "urlPatternFilter": "string",
          "cachingDirectives": {
            "statusCodeFilters": [0],
            "noCache": true,
            "maxAge": 0
          }
        }
      ],
      "geoFencing": {
        "locatorType": "string",
        "locators": ["string"]
      },
      "urlSignature": {
        "urlPattern": "string",
        "tokenName": "string",
        "passphraseName": "string",
        "passphrase": "string",
        "tokenExpiryName": "string",
        "useIPAddress": true,
        "ipAddressName": "string"
      },
      "certificateId": "string",
      "supplementaryDistributionNetworks": [
        {
          "distributionNetworkType": "NETWORK_EMBMS",
          "distributionMode": "MODE_EXCLUSIVE"
        }
      ]
    }
  ]
}
```

Key fields:

- `name`: A human-readable label for this configuration.
- `ingestConfiguration`: How the AS obtains the source content, including the ingest `protocol` and the source `baseURL`.
- `distributionConfigurations`: How the content is exposed to clients, including the `entryPoint` (relative path, content type and profiles), caching rules, geo-fencing and URL signing.

Note that some fields are accepted by the API but are not yet implemented by the Reference Tools (see the `:::note` in the "Summary of APIs" section below): Content Preparation, Edge Resources, Geo-fencing and URL signing.

Note that the supported `protocols` in 3GPP Release 17 are:

- HTTP pull-based content ingest protocol: `urn:3gpp:5gms:content-protocol:http-pull-ingest`
- DASH-IF push-based content ingest protocol: `urn:3gpp:5gms:content-protocol:dash-if-ingest`

:::tip[View on GitHub]
Examples are available in the [examples-files directory of rt-5gms-examples](https://github.com/5G-MAG/rt-5gms-examples/tree/development/examples-files)
:::

The following tutorials describe several steps showing how to create a Provisioning Session, add Content Hosting configuration and provisioning of Server Certificates.

[Go to the Tutorial: 5G MSd End-to-End deployment (with Docker)](./tutorials/end-to-end)

[Go to the Tutorial: Testing the 5GMS Application Function](./tutorials/testing-AF)

[Go to the Tutorial: Testing M1 and M5 APIs with Postman](./tutorials/testing-postman)

## Feature: Network Assistance

The network assistance feature enables the 5GMS Client in the UE to interrogate or manipulate the network Quality of Service (QoS) for an ongoing media streaming session. It defines two mechanisms for obtaining network assistance: via interactions with the Policy Control Function (PCF) (AF-based network assistance), or via Access Network Bitrate Recommendation (ANBR) signalling interactions between the UE modem and the Radio Access Network (RAN) (ANBR-based network assistance).

:::note[Implementation status]
Of the two Network Assistance capabilities described below, the support table in "Summary of features supported by the 5GMS Application Function" indicates that only Delivery Boost is currently implemented; Throughput Estimation (Bit Rate Recommendation) is still in development. The descriptions below cover both as defined by the specification.
:::

<img loading="lazy" src="/assets/images/5gms/5GMS_NetworkAssistance.png" alt="5GMS Network Assistance: the 5GMS Client requesting bit rate recommendations and delivery boosts from the network">

Both mechanisms make it possible to obtain:

- _Bit Rate Recommendation (Throughput Estimation)_, which allows the 5GMS Client to stay synchronized with the network's current capabilities.
  - The client asks the 5GMS System for a bit rate estimate. The system then queries the Policy Control Function (PCF) to determine the available throughput for that specific session.
  - The client uses this data to proactively adjust its streaming speed, for example by switching media quality levels (downlink).
  - It prevents stuttering and lag, ensuring a stable and consistent Quality of Experience (QoE) by staying within the network's "QoS envelope."

- _Delivery Boost_, which is a reactive feature used to request extra network performance when needed.
  - The client requests a temporary increase in bit rate. The 5GMS System asks the PCF to modify the session parameters to grant this extra capacity.
  - If the network has spare capacity, the boost is granted. The client uses this "boost" of speed to quickly refill a depleted buffer or finish a large file transfer faster.
  - It helps the user recover from potential playback interruptions or speeds up time-sensitive data tasks.

The following are the reference points and APIs.

- At M5:
  - [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)
  - [Network Assistance API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_NetworkAssistance.yaml)

The network assistance feature is not explicitly provisioned by the 5GMS Application Provider. It is either available for a particular media streaming session or not, depending on system pre-configuration and/or policy.

## Feature: Dynamic Policies

The dynamic policies feature enables the 5GMS Client in the UE to manipulate the network traffic handling policies for an ongoing media streaming session.

<img loading="lazy" src="/assets/images/5gms/5GMS_DynamicPolicies.png" alt="5GMS Dynamic Policies feature: the 5GMS Client selecting network traffic handling policies for a session">

The following are the reference points and APIs.

- At M1:
  - [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)
  - [Policy Templates provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_PolicyTemplatesProvisioning.yaml)

- At M5:
  - [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)
  - [Dynamic Policies API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_DynamicPolicies.yaml)

When the dynamic policy feature is offered and selected, the 5GMSd Application Provider specifies a set of policies which can be invoked for the unicast downlink streaming session. The UE becomes aware of the
selected policies in the form of a list of valid Policy Template Ids.

:::tip[View on GitHub]
Examples are available in the [examples-files directory of rt-5gms-examples](https://github.com/5G-MAG/rt-5gms-examples/tree/development/examples-files)
:::

This is a JSON scheme of a Policy Template, which describes the QoS and charging treatment a session may request:

```json
{
  "externalReference": "string",
  "qoSSpecification": {
    "qosReference": "string",
    "maxBtrUl": "string",
    "maxBtrDl": "string",
    "maxAuthBtrUl": "string",
    "maxAuthBtrDl": "string",
    "defPacketLossRateDl": 0,
    "defPacketLossRateUl": 0
  },
  "applicationSessionContext": {
    "sliceInfo": {
      "sst": 255,
      "sd": "string"
    },
    "dnn": "string"
  },
  "chargingSpecification": {
    "sponId": "string",
    "sponStatus": "SPONSOR_DISABLED",
    "gpsi": ["string"]
  }
}
```

Key fields:

- `externalReference`: An identifier for the policy used outside the 5GMS System.
- `qoSSpecification`: The requested QoS, including the QoS reference and the maximum uplink and downlink bit rates.
- `applicationSessionContext`: The network slice (`sliceInfo`) and Data Network Name (`dnn`) the policy applies to.
- `chargingSpecification`: Sponsored-data and charging settings for the session.

The following tutorials describe several steps showing how to create and provision Policy Templates.

[Go to the Tutorial: 5G MSd End-to-End deployment (with Docker)](./tutorials/end-to-end)

[Go to the Tutorial: Testing the 5GMS Application Function](./tutorials/testing-AF)

[Go to the Tutorial: Testing M1 and M5 APIs with Postman](./tutorials/testing-postman)

## Feature: Consumption Reporting

The consumption reporting feature allows consumption of downlink media streaming to be logged by the 5GMS System and exposed for analysis.

<img loading="lazy" src="/assets/images/5gms/5GMS_ConsumptionReporting.png" alt="5GMS Consumption Reporting feature: downlink consumption logged by the 5GMS System and exposed for analysis">

The following are the reference points and APIs.

- At M1:
  - [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)
  - [Consumption Reporting provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ConsumptionReportingProvisioning.yaml)

- At M5:
  - [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)
  - [Consumption Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ConsumptionReporting.yaml)

Once a Provisioning Session is established using the API at interface M1d, **Consumption Reporting** can be configured.

This is a JSON scheme of a Consumption Reporting Configuration:

```json
{
  "reportingInterval": 1,
  "samplePercentage": 100,
  "locationReporting": true,
  "accessReporting": true
}
```

Where:

- `reportingInterval`: The interval between two consecutive consumption reports. The value shall be greater than zero.
- `samplePercentage`: The proportion of media streaming clients that shall report media consumption, expressed as a floating point value between 0.0 and 100.0.
- `locationReporting`: Stipulates whether the Media Session Handler is required to provide location data to the 5GMSd AF in consumption reporting messages.
- `accessReporting`: Stipulates whether the Media Session Handler is required to provide consumption reporting messages to the 5GMSd AF when the access network changes during a media streaming session.

:::tip[View on GitHub]
Examples are available in the [examples-files directory of rt-5gms-examples](https://github.com/5G-MAG/rt-5gms-examples/tree/development/examples-files)
:::

The following tutorials describe several steps showing how to create a Consumption Reporting Configuration.

[Go to the Tutorial: 5G Media Streaming with Consumption Reporting](./tutorials/consumption-reporting)

[Go to the Tutorial: Testing the 5GMS Application Function](./tutorials/testing-AF)

[Go to the Tutorial: Testing M1 and M5 APIs with Postman](./tutorials/testing-postman)

## Feature: QoE Metrics Reporting

The QoE metrics reporting feature enables the 5GMS System to log and expose streaming performance data for further analysis.

<img loading="lazy" src="/assets/images/5gms/5GMS_MetricsReporting.png" alt="5GMS QoE Metrics Reporting feature: streaming performance data logged and exposed via RAN-based and AF-based paths">

The framework defines two distinct reporting paths:

- RAN-based Reporting: Metrics are sent to the Operations, Administration, and Maintenance (OAM) system via the Radio Access Network.

- AF-based Reporting: Metrics are sent directly to the network-side components (AF) of the 5GMS System.

The following are the reference points and APIs.

- At M1:
  - [Provisioning Sessions API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_ProvisioningSessions.yaml)
  - [Metrics Reporting provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_MetricsReportingProvisioning.yaml)

- At M5:
  - [Service Access Information API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ServiceAccessInformation.yaml)
  - [Metrics Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_MetricsReporting.yaml)

Once a Provisioning Session is established using the API at interface M1d, **QoE Metrics Reporting** can be configured.

This is a JSON scheme of a Metrics Reporting Configuration:

```json
{
  "metricsReportingConfigurationId": "string",
  "sliceScope": [
    {
      "sst": 255,
      "sd": "string"
    }
  ],
  "scheme": "string",
  "dataNetworkName": "string",
  "reportingInterval": 0,
  "samplePercentage": 100,
  "urlFilters": ["string"],
  "samplingPeriod": 0,
  "metrics": ["string"]
}
```

Where the field `metrics` for downlink media streaming and for the 3GPP scheme <span style="font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10</span> corresponds, for example, to one or more of the following quality metrics for DASH. Metrics currently supported by the Reference Tools are shown in green and marked "(supported)" in the list below:

- HTTP request/response <span style="color: green; font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#HTTPList</span> (supported)
- List of Representation Switch Events: <span style="color: green; font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#RepSwitchList</span> (supported)
- Average Throughput: <span style= "font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#AvgThroughput</span>
- Initial Playout Delay: <span style="font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#InitialPlayoutDelay</span>
- Buffer Level: <span style="color: green; font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#BufferLevel</span> (supported)
- Play List: <span style="font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#PlayList</span>
- MPD Information: <span style="color: green; font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#MPDInformation</span> (supported)
- Playout Delay for Media Start-up: <span style="font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#PlayoutDelayforMediaStartup</span>
- Device information: <span style="font-family: monospace;">urn:3GPP:ns:PSS:DASH:QM10#DeviceInformationList</span>

:::tip[View on GitHub]
Examples are available in the [examples-files directory of rt-5gms-examples](https://github.com/5G-MAG/rt-5gms-examples/tree/development/examples-files)
:::

The following tutorials describe several steps showing how to create a QoE Metrics Reporting Configuration.

[Go to the Tutorial: 5G Media Streaming with QoE Metrics Reporting](./tutorials/metrics-reporting)

[Go to the Tutorial: Testing the 5GMS Application Function](./tutorials/testing-AF)

[Go to the Tutorial: Testing M1 and M5 APIs with Postman](./tutorials/testing-postman)

## Feature: Data collection, reporting and exposure

:::warning[Not yet implemented in 5GMS]
This feature is not yet implemented within the framework of 5GMS. A generic architecture for UE Data Collection and Reporting is available separately (see the note at the end of this section).
:::

The data collection, reporting and exposure feature enables the 5GMS System to log data relating to media streaming sessions and to expose this to
subscribers in the form of Events.

The following are the reference points and APIs.

- At M1:
  - [Event Data Processing provisioning API](https://jdegre.github.io/loader.html?yaml=TS26512_M1_EventDataProcessingProvisioning.yaml)

- At M5
  - [Metrics Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_MetricsReporting.yaml)
  - [Consumption Reporting API](https://jdegre.github.io/loader.html?yaml=TS26512_M5_ConsumptionReporting.yaml)

:::note
At the moment, a generic architecture for UE Data Collection and Reporting is available in the Reference Tools under the following project: [**UE Data Collection, Reporting and Event Exposure**](../data-collection/scope). Note these entities are not yet implemented within the framework of 5GMS.
:::

## Summary of features supported by the 5GMS Application Function

The release versions of the 5GMSd Application Function support differing sets of interfaces, as described by the different
versions of the 3GPP specifications, and differing levels of feature support for those interfaces. The following attempts to capture
the feature sets and specification versions for each release, starting with the most recent release or upcoming releases.

### Key

A feature is marked with &#x2611; where it is supported, with &#x270E; where it is being worked on and slated for the next release, and with &#x2610; where it is unimplemented in that version.

<table><thead>
<tr><th>Interface reference point</th><th>Specifications & Versions</th><th>Protocols</th><th>Features</th></tr>
</thead>
<tbody>
<tr valign="top"><td>M1 (server)</td><td><ul>
  <li>TS 26.501 v17.6.0</li>
  <li>TS 26.512 v17.6.0</li>
</ul></td><td><ul>
  <li>&#x2611; HTTP/1.1</li>
  <li>&#x2610; HTTP/2.0</li>
  <li>&#x2611; HTTP/1.1 over SSL/TLS</li>
  <li>&#x2610; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2611; Content Hosting Provisioning</li>
  <li>&#x2611; Content Protocols Discovery</li>
  <li>&#x2611; Provisioning Sessions</li>
  <li>&#x2611; Server Certificates Provisioning</li>
  <li>&#x2611; Consumption Reporting Provisioning</li>
  <li>&#x2610; Content Preparation Templates Provisioning</li>
  <li>&#x2610; Edge Resources Provisioning</li>
  <li>&#x2610; Event Data Processing Provisioning</li>
  <li>&#x2611; Metrics Reporting Provisioning</li>
  <li>&#x2611; Policy Templates Provisioning</li>
</ul></td></tr>
<tr valign="top"><td>M3 (client)</td><td><ul>
  <li>5G-MAG prototype</li>
</ul></td><td><ul>
  <li>&#x2611; HTTP/1.1</li>
  <li>&#x2611; HTTP/2.0</li>
  <li>&#x2611; HTTP/1.1 over SSL/TLS</li>
  <li>&#x2611; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2611; Content Hosting Provisioning</li>
  <li>&#x2611; Server Certificates Provisioning</li>
</ul></td></tr>
<tr valign="top"><td>M5 (server)</td><td><ul>
  <li>TS 26.501 v17.6.0</li>
  <li>TS 26.512 v17.6.0</li>
</ul></td><td><ul>
  <li>&#x2611; HTTP/1.1</li>
  <li>&#x2610; HTTP/2.0</li>
  <li>&#x2611; HTTP/1.1 over SSL/TLS</li>
  <li>&#x2610; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2611; Service Access Information</li>
  <li>&#x2611; Consumption Reporting</li>
  <li>&#x2611; Dynamic Policies<br />
      &nbsp; <b>Service Data Flow Description Methods:</b><ul>
    <li>&#x2610; 2 Tuple</li>
    <li>&#x2611; 5 Tuple</li>
    <li>&#x2610; ToS</li>
    <li>&#x2610; Flow Label</li>
    <li>&#x2610; Domain Name</li>
  </ul></li>
  <li>&#x2611; Metrics Reporting</li>
  <li>&#x2611; Network Assistance<ul>
    <li>&#x2610; Throughput Estimation</li>
    <li>&#x2611; Delivery Boost</li>
  </ul></li>
</ul></td></tr>
<tr valign="top"><td>N5 (Npcf client/server)</td><td><ul>
  <li>[TS 29.514](https://www.3gpp.org/dynareport/29514.htm) v17.8.0</li>
</ul></td><td><ul>
  <li>&#x2611; HTTP/2.0</li>
  <li>&#x2611; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2611; Policy Authorization</li>
  <li>&#x2611; Policy Authorization Notifications</li>
</ul></td></tr>
<tr valign="top"><td>N33 (client)</td><td><ul>
  <li>[TS 29.591](https://www.3gpp.org/dynareport/29591.htm) v17.9.0</li>
</ul></td><td><ul>
  <li>&#x2610; HTTP/2.0</li>
  <li>&#x2610; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2610; Event Exposure</li>
</ul></td></tr>
<tr valign="top"><td>R4 (server)</td><td><ul>
  <li>TS 26.512 v17.6.0</li>
</ul></td><td><ul>
  <li>&#x2610; HTTP/1.1</li>
  <li>&#x2610; HTTP/2.0</li>
  <li>&#x2610; HTTP/1.1 over SSL/TLS</li>
  <li>&#x2610; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2610; Media Streaming Access</li>
</ul></td></tr>
<tr valign="top"><td>R5/R6 (client/server)</td><td><ul>
  <li>TS 26.512 v17.6.0</li>
  <li>[TS 29.517](https://www.3gpp.org/dynareport/29517.htm) v17.9.0</li>
</ul></td><td><ul>
  <li>&#x2610; HTTP/1.1</li>
  <li>&#x2610; HTTP/2.0</li>
  <li>&#x2610; HTTP/1.1 over SSL/TLS</li>
  <li>&#x2610; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2610; Media Streaming QoE Event</li>
  <li>&#x2610; Media Streaming Consumption Event</li>
  <li>&#x2610; Media Streaming Network Assistance Invocation Event</li>
  <li>&#x2610; Media Streaming Dynamic Policy Invocation Event</li>
  <li>&#x2610; Media Streaming Access Event</li>
  <li>&#x2610; Event Subscription</li>
</ul></td></tr>
<tr valign="top"><td>Nbsf (client)</td><td><ul>
  <li>[TS 29.513](https://www.3gpp.org/dynareport/29513.htm) v17.10.0</li>
  <li>[TS 29.521](https://www.3gpp.org/dynareport/29521.htm) v17.8.0</li>
</ul></td><td><ul>
  <li>&#x2611; HTTP/2.0</li>
  <li>&#x2611; HTTP/2.0 over SSL/TLS</li>
</ul></td><td><ul>
  <li>&#x2611; Binding Information Retrieval</li>
</ul></td></tr>
</tbody>
<tfoot>
<!--<tr><td colspan="4"><b>Notes:</b><br />1: Only the Delivery Boost feature of Network Assistance is implemented, the Throughput Estimation feature is still in development.</td></tr> -->
</tfoot>
</table>

## Summary of APIs supported for 5G Media Streaming

### Relevant specifications

The table contains the 3GPP 5G Media Streaming APIs for Release 17 (TS 26.512) and Release 18 (TS 26.510 & TS 26.512). Note that the current reference implementation of the 5GMSd AF and 5GMSd AS are based on Release 17 (TS 26.510 does not exist in Release 17). In Release 18, the media session handling APIs were moved from TS 26.512 into TS 26.510 to generalise them to support the Real-Time media Communication (RTC) System as well as the 5G Media Streaming (5GMS) System.
More information about the relevant specifications can be found in the following pages:

- 5G Media Streaming Architecture: [Standards pages](/tech/standards/5gms)
- UE Data Collection and Event Exposure: [Standards pages](/tech/standards/data-collection)

In the table below, entries shown in green (bold) are already implemented in the Reference Tools; entries shown in orange (bold) are on the implementation roadmap; all other entries are not yet implemented. See the Legend beneath the table for the full key.

| Release 17                                                                                           | Release 18                                                                         |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| <span style="color: green;font-weight:bold;">TS26512_CommonData.yaml</span>                          | TS26510_CommonData.yaml, TS26512_CommonData.yaml                                   |
| <span style="color: green;font-weight:bold;">TS26512_M1_ConsumptionReportingProvisioning.yaml</span> | TS26510_Maf_Provisioning_ConsumptionReporting.yaml                                 |
| <span style="color: green;font-weight:bold;">TS26512_M1_ContentHostingProvisioning.yaml</span>       | TS26510_Maf_Provisioning_ContentHosting.yaml                                       |
| TS26512_M1_ContentPreparationTemplatesProvisioning.yaml                                              | TS26510_Maf_Provisioning_ContentPreparationTemplates.yaml                          |
| <span style="color: green;font-weight:bold;">TS26512_M1_ContentProtocolsDiscovery.yaml</span>        | TS26510_Maf_Provisioning_ContentProtocols.yaml                                     |
| TS26512_M1_EdgeResourcesProvisioning.yaml                                                            | TS26510_Maf_Provisioning_EdgeResources.yaml                                        |
| TS26512_M1_EventDataProcessingProvisioning.yaml                                                      | TS26510_Maf_Provisioning_EventDataProcessing.yaml                                  |
| <span style="color: green;font-weight:bold;">TS26512_M1_MetricsReportingProvisioning.yaml</span>     | TS26510_Maf_Provisioning_MetricsReporting.yaml                                     |
| <span style="color: green;font-weight:bold;">TS26512_M1_PolicyTemplatesProvisioning.yaml</span>      | TS26510_Maf_Provisioning_PolicyTemplates.yaml                                      |
| <span style="color: green;font-weight:bold;">TS26512_M1_ProvisioningSessions.yaml</span>             | TS26510_Maf_Provisioning_ProvisioningSessions.yaml                                 |
| <span style="color: green;font-weight:bold;">TS26512_M1_ServerCertificatesProvisioning.yaml</span>   | TS26510_Maf_Provisioning_ServerCertificates.yaml                                   |
| N/A                                                                                                  | TS26510_Maf_Provisioning_ContentPublishing.yaml                                    |
| N/A                                                                                                  | TS26510_Maf_Provisioning_RealTimeCommunication.yaml                                |
| <span style="color: green;font-weight:bold;">TS26512_M5_ConsumptionReporting.yaml</span>             | TS26510_Maf_SessionHandling_ConsumptionReporting.yaml                              |
| <span style="color: green;font-weight:bold;">TS26512_M5_DynamicPolicies.yaml</span>                  | TS26510_Maf_SessionHandling_DynamicPolicy.yaml                                     |
| <span style="color: green;font-weight:bold;">TS26512_M5_MetricsReporting.yaml</span>                 | TS26510_Maf_SessionHandling_MetricsReporting.yaml                                  |
| <span style="color: green;font-weight:bold;">TS26512_M5_NetworkAssistance.yaml</span>                | TS26510_Maf_SessionHandling_NetworkAssistance.yaml                                 |
| <span style="color: green;font-weight:bold;">TS26512_M5_ServiceAccessInformation.yaml</span>         | TS26510_Maf_SessionHandling_ServiceAccessInformation.yaml                          |
| PreStd*                                                                                              | TS26512_Mas_Configuration_ContentHosting.yaml                                      |
| PreStd*                                                                                              | TS26512_Mas_Configuration_ContentPreparationTemplates.yaml                         |
| PreStd*                                                                                              | TS26512_Mas_Configuration_ContentPublishing.yaml                                   |
| PreStd*                                                                                              | TS26512_Mas_Configuration_ServerCertificates.yaml                                  |
| N/A                                                                                                  | <span style="color: orange;font-weight:bold;">TS26512_R2_DataReporting.yaml</span> |
| TS26512_R4_DataReporting.yaml                                                                        | <span style="color: orange;font-weight:bold;">TS26512_R4_DataReporting.yaml</span> |
| N/A                                                                                                  | <span style="color: orange;font-weight:bold;">TS26512_EventExposure.yaml</span>    |

### Legend

<span style="color: green;font-weight:bold;">TEXT</span> = Already implemented in Reference Tools

<span style="color: orange;font-weight:bold;">TEXT</span> = In the implementation roadmap in Reference Tools

PreStd* = Implementation of a pre-standardisation variant of the 5GMS AS configuration API at reference point M3d that is similar to what eventually appeared in Release 18. The service name is different and so are some details.

:::note
Note that not all aspects of these APIs are implemented. For example Content Preparation, Edge resources, Geo-fencing and URL signing in TS26512_M1_ContentHostingProvisioning.yaml are not implemented.
:::

## High-level architectures

The Reference Tools can be combined in several deployment configurations, each pairing 5G Media Streaming with a different set of supporting projects.

### 5G Downlink Media Streaming (5GMSd)

The baseline configuration: the 5GMSd tools delivering adaptive bitrate streaming over 5G unicast.

<img loading="lazy" src="/assets/images/projects/5gms_diagram.png" style="width: 80%" alt="High-level architecture of the baseline 5GMSd deployment">

[5G Media Streaming: Resources](../5gms/resources)
[3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)
[Common Tools: Repositories](../common-tools/)

### 5G Downlink Media Streaming (5GMSd) with UE Data Collection Reporting and Event Exposure

Adds the UE Data Collection, Reporting and Event Exposure project so that consumption and quality data can feed analytics and event subscribers.

<img loading="lazy" src="/assets/images/projects/5gms_uedc_diagram.png" style="width: 80%" alt="High-level architecture of 5GMSd combined with UE Data Collection, Reporting and Event Exposure">

[5G Media Streaming: Resources](../5gms/resources)
[UE Data Collection, Reporting and Event Exposure: Resources(../data-collection/resources)
[3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)
[Common Tools: Repositories](../common-tools/)

### 5G Downlink Media Streaming (5GMSd) with 5GC Service Consumers

Adds the 5G Core (5GC) Service Consumers project, letting the AF consume core network APIs (for example for policy and QoS control).

<img loading="lazy" src="/assets/images/projects/5gms_5gc_diagram.png" style="width: 80%" alt="High-level architecture of 5GMSd combined with 5GC Service Consumers">

[5G Media Streaming: Resources](../5gms/resources)
[5GC Service Consumers: Resources(../5g-core/resources)
[3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)
[Common Tools: Repositories](../common-tools/)

### 5G Downlink Media Streaming (5GMSd) over eMBMS

Combines 5GMSd with the 5G Broadcast and multimedia content delivery projects to distribute content over evolved Multimedia Broadcast Multicast Service (eMBMS) broadcast bearers.

<img loading="lazy" src="/assets/images/projects/5gms_5gbc_diagram.png" style="width: 80%" alt="High-level architecture of 5GMSd delivered over eMBMS broadcast">

[5G Media Streaming: Resources](../5gms/resources)
[5G Broadcast: Resources(../5g-broadcast/resources)
[Multimedia content delivery protocols: Resources(../multimedia/resources)
[3GPP RAN and Core Platforms: Resources](../3gpp-platforms/resources)
[Common Tools: Repositories](../common-tools/)

## Docker deployment support

Docker-Compose setups are provided to run the 5GMS Application Function, the 5GMS Application Server and the 5GMS Application Provider in Docker container environments.

<img loading="lazy" src="/assets/images/5gms/5gms-docker-recipe1.png" style="width: 80%" alt="Docker Compose deployment recipe for the 5GMS Application Function, Application Server and Application Provider">

[5G Media Streaming: Resources](../5gms/resources)

## Getting started

A practical route into the tools:

1. Stand up an end-to-end downlink deployment with the [5G MSd End-to-End deployment (with Docker)](./tutorials/end-to-end) tutorial, which brings up the AF, AS and Application Provider together.
2. Exercise the AF and AS individually with the [Testing the 5GMS Application Function](./tutorials/testing-AF) and [Developing and Testing the 5GMS Application Server](./tutorials/testing-AS) tutorials.
3. Drive the M1 provisioning and M5 session-handling APIs directly with the [Testing M1 and M5 APIs with Postman](./tutorials/testing-postman) tutorial.
4. Add reporting with the [Consumption Reporting](./tutorials/consumption-reporting) and [QoE Metrics Reporting](./tutorials/metrics-reporting) tutorials.

For the source, see the [Resources](./resources) page; for the standards context, see the [Standards page](/tech/standards/5gms) and the [technical documentation](/tech/5gms).

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the Release 17 baseline placement of the implemented features in TS 26.501 and TS 26.512, the specification versions cited in the "Summary of features" support table (TS 26.501 v17.6.0, TS 26.512 v17.6.0 and the associated 29-series versions), and the exact developer-portal paths linked in the notes. Verify against the 3GPP work plan and with the reference-tool maintainers before publication.
:::

## Related

- [Resources](./resources) (roadmap, repositories, packages, releases)
- [Tutorials](./tutorials)
- Standards: [5G Media Streaming specifications](/tech/standards/5gms)
- Tech: [5G Media Streaming architecture and analysis](/tech/5gms)

:::note
Refer to the [rt-5gms-application-function](https://github.com/5G-MAG/rt-5gms-application-function) and related [5G-MAG Reference Tools](https://github.com/5G-MAG) repositories to contribute to this project.
:::

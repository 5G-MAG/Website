---
title: Using CAMARA APIs
sidebar_position: 3
hide_title: true
description: Maps CAMARA APIs to the discovery, reservation, assignment, usage and notification phases of content contribution workflows.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 13h5"/><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3"/><path d="M20 8v8"/><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Connectivity Quality with Network APIs</span>
<h1>Using CAMARA APIs</h1>
</div>
</div>

:::warning
This documentation is currently **under development and subject to change**. It reflects outcomes elaborated by 5G-MAG members. If you are interested in becoming a member of the 5G-MAG and actively participating in shaping this work, please contact the [Project Office](/contact)
:::

## Using CAMARA APIs (and Network Services) for Content Production & Contribution

This is a list of CAMARA APIs suitable to be used in the context of Connectivity Quality Management: [**Network API Initiatives under analysis**](../network-api-initiatives).

Their mapping to the context of Content Production & Contribution is done below based on the different steps identified in [**Workflows and Requirements**](./workflows).

The columns of the summary table and the sections that follow are organised around five phases of using network capabilities, taken from the [Workflows](./workflows) analysis:

- **Discovery:** finding out which profiles or resources are available.
- **Reservation:** booking resources for a time and area.
- **Assignment:** attaching specific devices to a booking.
- **Usage:** the device actually using the reserved resources.
- **Notifications:** monitoring and alerts while resources are in use.

Each cell states what a given API does (or "N/A") for that phase. Several APIs have a dedicated walkthrough page in this section, linked from the sections below.

## Summary of available CAMARA APIs

<table>
  <tr>
    <td markdown="span" align="left"><b>API</b></td>
    <td markdown="span" align="left"><b>DISCOVERY</b></td>
    <td markdown="span" align="left"><b>RESERVATION</b></td>
    <td markdown="span" align="left"><b>ASSIGNMENT</b></td>
    <td markdown="span" align="left"><b>USAGE</b></td>
    <td markdown="span" align="left"><b>NOTIFICATIONS</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">Application Profiles</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Defines an Application Profile to be used for notifications.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">ConnectivityInsights</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Checks network quality for an Application Profile and an already connected device.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">ConnectivityInsightsSubscriptions</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Regular notifications for an Application Profile and an already connected device.</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="./using-dedicated-networks">DedicatedNetworks</a></td>
    <td markdown="span" align="left">Discovers available Network Profiles</td>
    <td markdown="span" align="left">Creates a Dedicated Network matching Network Profile, time and area</td>
    <td markdown="span" align="left">Assigns/releases devices to a Dedicated Network</td>
    <td markdown="span" align="left">Automatic when Assignment</td>
    <td markdown="span" align="left">N/A</td>
  </tr>
  <tr>
    <td markdown="span" align="left">NetworkSliceBooking</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Creates a Network Slice (session)</td>
    <td markdown="span" align="left">Automatic for the device invoking the creation.</td>
    <td markdown="span" align="left">Automatic for the device invoking the creation.</td>
    <td markdown="span" align="left">NO</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="./using-qos-booking">QoSBooking</a></td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Creates a booking matching QoS profile, time, area, device, application,...</td>
    <td markdown="span" align="left">Automatic for the device invoking the creation.</td>
    <td markdown="span" align="left">Automatic for the device invoking the creation.</td>
    <td markdown="span" align="left">N/A</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="./using-qos-booking-assignment">QoSBookingAssignment</a></td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Creates a booking matching QoS profile, time, area,...</td>
    <td markdown="span" align="left">Assigns/releases devices to a booking.</td>
    <td markdown="span" align="left">Automatic when Assignment.</td>
    <td markdown="span" align="left">NO</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="./using-qos-profiles">QoSProfiles</a></td>
    <td markdown="span" align="left">Retrieves existing profiles parameters.</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
  </tr>
  <tr>
    <td markdown="span" align="left">QoSProvisioning</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Assigns a QoS profile to a device indefinitely (no booking, no fixed duration); the assignment is revoked on delete.</td>
    <td markdown="span" align="left">Automatic when Assignment.</td>
    <td markdown="span" align="left">N/A</td>
  </tr>
  <tr>
    <td markdown="span" align="left"><a href="./using-quality-on-demand">QualityonDemand</a></td>
    <td markdown="span" align="left">N/A</td>
    <td markdown="span" align="left">Creates a QoS session.</td>
    <td markdown="span" align="left">Automatic for the device invoking the creation.</td>
    <td markdown="span" align="left">Automatic for the device invoking the creation.</td>
    <td markdown="span" align="left">NO</td>
  </tr>
</table>

## SERVICE AREA API

In the CAMARA context, service areas are defined using geographic coordinates (a circle or a polygon) and are used in the [**Dedicated Networks API**](../camara-dedicated-networks) and the [**Network Slice Booking API**](../camara-network-slice-booking). The service area is passed as part of the session (or network) creation request. See the Dedicated Networks and Network Slice Booking pages for the API details.

The [**Dedicated Networks API**](../camara-dedicated-networks) includes a **Network Service Areas API** (`dedicated-network-areas.yaml`) which addresses this requirement. It allows an API consumer to query the operator-defined service areas where dedicated network resources can be provisioned.

With **POST /retrieve-service-areas** a list of operator-defined service areas can be retrieved by passing search criteria such as:

- A specific location (`atLocation` with latitude/longitude)
- An area that must overlap with the service area (`overlappingArea`)
- An area that must be covered by the service area (`coveringArea`)
- A network profile identifier (`byNetworkProfileId`) or QoS profile name (`byQosProfileName`)

The response returns a list of service areas, each with an `id`, `name`, `description`, the geographical boundary, and the supported `networkProfiles` and `qosProfiles`. The `areaId` returned is then used in subsequent API calls (e.g. **POST /networks**) to associate a dedicated network booking with that operator-defined area.

:::warning
There is no equivalent service area lookup API in the other CAMARA QoS-related APIs (QoS Booking, Quality on Demand, QoS Provisioning, Network Slice Booking). These APIs accept an area geometry directly in the booking request or do not support area-scoped bookings at all. The Dedicated Networks API is the only one that separates area discovery from resource reservation.
:::

## DISCOVERY API

<table>
  <tr>
    <td markdown="span" align="left"><b>Mechanism to obtain available QoS profiles</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-qos-profiles">QoS Profiles API</a></b> retrieves the QoS profile parameters available in the network. No information about the service area is linked to such a request.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-dedicated-networks">Dedicated Networks - Network Profiles API</a></b> obtains the list of available Network Profiles, which link the QoS Profile with additional information on the aggregated UL/DL throughput for a maximum number of devices.</td>
  </tr>
</table>

:::warning
There are some limitations as the information on the name of the QoS profile need to be known beforehand. It is understood that the name of the profiles would be communicated by the network operator via the Network API Platform.
:::

<table>
  <tr>
    <td markdown="span" align="left"><b>Identification of a service area and/or time/duration</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">In general the available profiles are listed for the network, not for a specific location or time/duration. It is only when booking the resources for the specific area and duration when information about the success will be available.</td>
  </tr>
</table>

:::warning
There are some limitations as the information on the availability of QoS is only available at booking time and not beforehand. The **Connectivity Insights APIs** are also not practical as they can only be invoked at the given location. Potential remedy: Create/Adapt an API so that information on the QoS profile availability for a given location can be retrieved.
:::

## RESERVATION API

It should be possible to book QoS (to reserve network resources) for a given application or device for the intended service area and/or time/duration. This step requires:

- Mechanism to create a booking linking a profile to a service area and time/duration.
- The previous mechanism including already information about the application server and/or device.

<table>
  <tr>
    <td markdown="span" align="left"><b>Mechanism to create a booking linking a profile to a service area and time/duration</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-dedicated-networks">Dedicated Networks - Network Profiles API</a></b> requests the creation of a dedicated network linking a QoS profile with a service area and time/duration. This comprises the booking of resources for a specific QoS Profile, a maximum number of devices which can make use of it, the service area and the time/duration.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-network-slice-booking">Network Slice Booking API</a></b> requests the creation of a session with the expected service time, service area, and QoS profile. The number of devices can be specified in the QoS profile.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-qos-booking-assignment">QoS Booking & Assignment - QoS Booking API</a></b> requests the creation of a QoS booking specifying the QoS profile, number of devices, service area and time/duration.</td>
  </tr>
</table>

:::warning
The **Quality on Demand API** lacks information about the service area. Potential remedy: add information about the service area.
:::

<table>
  <tr>
    <td markdown="span" align="left"><b>The previous mechanism including already information about the application server and/or device</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-qos-booking">QoS Booking API</a></b> requests the creation of a QoS booking specifying the QoS profile, application server details, device details, service area and time/duration.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-qos-provisioning">QoS Provisioning API</a></b> requests the creation of a QoS assignment specifying the QoS profile and the device. No information about the service area or time/duration is provided.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-quality-on-demand">Quality on Demand API</a></b> requests the creation of a QoS booking specifying the QoS profile, application server details, device details, and time/duration. No information about the service area is provided.</td>
  </tr>
</table>

:::warning
There are some limitations as the information on the exact device and application server may not be known beforehand or may change in the course between making the booking and using the network resources. The mechanisms defined in **Dedicated Networks API** and **QoS Booking and Assignment** are more appropriate for this case.
:::

All the mechanisms described above allow the booking of QoS when already at the location. However, the <b><a href="../camara-qos-provisioning">QoS Provisioning API</a></b> and <b><a href="../camara-quality-on-demand">Quality on Demand API</a></b> are particularly targeted to this scenario, given that it is not possible to define the service area in which they are applicable beforehand. If the booking is done at the location it is also assumed that the exact devices are known, so any of the mechanisms described above would be suitable.

These same mechanisms allow network resources to be exploited for any device, but the <b><a href="../camara-qos-booking">QoS Booking API</a></b>, <b><a href="../camara-qos-provisioning">QoS Provisioning API</a></b> and <b><a href="../camara-quality-on-demand">Quality on Demand API</a></b> require knowledge of the devices for which the booking is requested.

By contrast, if devices are not known yet at the time of booking, it is possible to use the <b><a href="../camara-dedicated-networks">Dedicated Networks - Network Profiles API</a></b>, <b><a href="../camara-network-slice-booking">Network Slice Booking API</a></b> and <b><a href="../camara-qos-booking-assignment">QoS Booking & Assignment - QoS Booking API</a></b> to request the booking of resources without committing to use a particular device.

## ASSIGNMENT API

First step is to have booked the network resources either for any device, a given number of devices or a concrete device. This implies following one of the steps below:

- Assignment and management of the booked network resources to a device
- Direct usage of the network resources when a device just connects to the network

<table>
  <tr>
    <td markdown="span" align="left"><b>Assignment of the booked network resources to a particular device</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-qos-booking-assignment">QoS Booking and Assignment - Device Assignment API</a></b> assigns a device to an existing QoS booking.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-dedicated-networks">Dedicated Network - Accesses API</a></b> assigns a device to an existing network profile.</td>
  </tr>
</table>

:::warning
The mechanisms which detach the booking of network resources from a particular device add flexibility.
:::

In the event that a device needs to be exchanged or the booked resources should be assigned to a different device, the following alternatives exist:

- Creating a new booking for a new device before releasing the current device
- Separation of the QoS booking w.r.t. the device, enabling re-assignment of QoS booking.

<table>
  <tr>
    <td markdown="span" align="left"><b>Creating a new booking for a new device before releasing the current device</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-qos-booking">QoS Booking API</a></b>, a new booking for a specific device should be created.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-qos-provisioning">QoS Provisioning API</a></b>, a new booking for a specific device should be created.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-quality-on-demand">Quality on Demand API</a></b>, a new booking for a specific device should be created.</td>
  </tr>
</table>

:::warning
With the previous mechanisms there is no guarantee that new resources are available. Releasing the previous device will also imply no guarantee that those will remain available for a new booking.
:::

<table>
  <tr>
    <td markdown="span" align="left"><b>Separation of the QoS booking w.r.t. the device, enabling re-assignment of QoS booking</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-dedicated-networks">Dedicated Network - Accesses API</a></b> can request the assignment or release of a device to an existing network profile.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-network-slice-booking">Network Slice Booking API</a></b> can bring in a new device to exploit the booked network resources.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">The <b><a href="../camara-qos-booking-assignment">QoS Booking & Assignment - Device Assignment API</a></b> can request the assignment or release of a device to an existing QoS booking.</td>
  </tr>
</table>

:::warning
The mechanisms which detach the booking of network resources from a particular device add flexibility.
:::

## USAGE API

<table>
  <tr>
    <td markdown="span" align="left"><b>Direct usage of the network resources when a device just connects to the network</b></td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-network-slice-booking">Network Slice Booking API</a></b>, the network resources are used as soon as a device connects to the network.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-qos-booking">QoS Booking API</a></b>, the network resources are used as soon as a device connects to the network.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-qos-provisioning">QoS Provisioning API</a></b>, the network resources are used as soon as a device connects to the network.</td>
  </tr>
  <tr>
    <td markdown="span" align="left">With the <b><a href="../camara-quality-on-demand">Quality on Demand API</a></b>, the network resources are used as soon as a device connects to the network.</td>
  </tr>
</table>

:::warning
For some of these mechanisms it is unclear how the network capabilities would be exploited by a device. It may be impractical when a device needs to be exchanged.
:::

## NOTIFICATIONS API

These are different alternatives, including reception of a one-shot notification (e.g. for checking whether the network is able to meet certain requirements at a given instant of time) and a subscription to receive notifications (more useful during runtime). Both start from the same pre-requisite: creating an Application Profile by invoking the [**Application Profiles API**](../camara-application-profiles) with a series of user-defined network quality thresholds.

One-shot notifications. Once the Application Profile exists, the [**Connectivity Insights API**](../camara-connectivity-insights) can be invoked, and its reply contains a message about the confidence of the network in meeting the network quality thresholds.

Regular notifications. Once the Application Profile exists, the [**Connectivity Insights Subscriptions API**](../camara-connectivity-insights-subscriptions) can instead be invoked to receive regular notifications (up to a defined limit) about the confidence of the network in meeting the network quality thresholds.

:::warning
A new application profile needs to be created where tracking notifications for the original QoS Profile which many other APIs use would be more coherent. In general, one would expect that notifications/logs can be requested for any API once the network resources are being used.
:::

## Choosing an API for a production scenario

No single CAMARA API covers all five phases cleanly. The right choice depends on whether the devices are known at booking time, whether resources must be reserved for a future time and place, and whether devices need to be swapped or re-prioritised during the event.

| If you need to...                                                                                 | Use                                                          | Because                                                                                                      |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Book QoS at the point of use for one known device (short-notice MoJo)                             | [Quality on Demand](./using-quality-on-demand)               | Creates a QoS session immediately at the device's current location; no advance reservation.                  |
| Assign a QoS profile to a device with no fixed end (a fixed contribution point)                   | [QoS Provisioning](../camara-qos-provisioning)               | Indefinite assignment, revoked on delete; no service area or duration.                                       |
| Reserve QoS ahead of time for a known device and application server                               | [QoS Booking](./using-qos-booking)                           | Ties booking to a device and application server at creation.                                                 |
| Reserve QoS ahead of time for a number of devices, then attach specific devices later             | [QoS Booking and Assignment](./using-qos-booking-assignment) | Separates the booking from device assignment; supports back-up devices and on-air/standby switching.         |
| Reserve a dedicated network for a venue and time, discover its service areas, then attach devices | [Dedicated Networks](./using-dedicated-networks)             | Separates area discovery, reservation and device access; the most complete fit for multi-device productions. |
| Book slice-level resources for an area and window                                                 | [Network Slice Booking](../camara-network-slice-booking)     | Reserves slice resources; the device that creates the session uses them automatically.                       |

The decisive property is whether **reservation is decoupled from device assignment**. Dedicated Networks and QoS Booking and Assignment decouple them, which is what makes device swaps and dynamic prioritisation (the on-air / preview / standby pattern in the [Workflows](./workflows#dynamic-prioritization-of-qos-for-different-media-flows) page) possible without tearing down and re-creating a booking, and therefore without risking the loss of the reserved resources.

## Gaps identified against the requirements

Mapping the CAMARA APIs onto the 5G-MAG requirement categories surfaces recurring gaps. These are open items in the analysis, not defects claimed against any deployment:

- **No pre-booking availability lookup.** The Discovery phase can list profiles and service areas, but whether a given profile can actually be reserved for a specific location and time is known only when the reservation is attempted. Connectivity Insights checks conditions only at the device's current location.
- **Service area is not universal.** Only the Dedicated Networks API separates area discovery (`POST /retrieve-service-areas`) from reservation. Quality on Demand and QoS Provisioning cannot express a target area at all; QoS Booking / QoS Booking and Assignment accept a geometry in the request but offer no prior area lookup.
- **Monitoring uses a separate profile.** Notifications rely on an Application Profile (Connectivity Insights) distinct from the QoS Profile that was booked, rather than tracking the booked resource directly.
- **Naming collision.** Two distinct APIs ("QoS Booking" and "QoS Booking and Assignment", the latter also referred to internally as a "QoS Booking" API) share confusingly similar names, and the Dedicated Networks and QoS Booking and Assignment procedures overlap substantially.

## How these APIs reach the 5G Core

Whichever CAMARA API is chosen, the operator's Network API Platform translates the request into 3GPP capability-exposure procedures. A QoS session or booking resolves, through the Network Exposure Function (NEF, [TS 29.522](https://www.3gpp.org/dynareport/29522.htm)) `Nnef_AFSessionWithQoS` operation, to a Policy Control Function (PCF) authorisation (`Npcf_PolicyAuthorization`, [TS 29.514](https://www.3gpp.org/dynareport/29514.htm)) that installs a QoS Flow on the device's PDU session. Advance reservation for a future window maps to background data transfer negotiation (`Nnef_BDTPNegotiation`, [TS 29.554](https://www.3gpp.org/dynareport/29554.htm)). Authentication of the API consumer is handled separately (see below). These mappings are documented on the [Network API Initiatives](../network-api-initiatives#3gpp-apis-for-quality-of-service) page.

## API consumer authentication

Before any of the calls above, the API consumer authenticates to the operator's authorization server using OAuth 2.0, as defined by the CAMARA Security and Interoperability Profile in the CAMARA [IdentityAndConsentManagement](https://github.com/camaraproject/IdentityAndConsentManagement) repository. CAMARA supports the OAuth 2.0 client credentials grant (for server-to-server, two-legged access) and Client Initiated Backchannel Authentication (CIBA) for flows that require end-user consent; two-legged (client credentials) tokens are restricted to APIs that do not process personal data. The consumer obtains an access token carrying the OAuth scopes for the specific API and operation, then presents it as a bearer token on each call. Credentials themselves are provisioned out of band through the operator's developer portal or Network API Platform; there is no CAMARA API for issuing them.

:::warning[References to verify]
These identifiers on this page were not confirmed against a primary source (the 3GPP/ETSI portals block automated access): the mapping of specific CAMARA operations to TS 29.522 (`Nnef_AFSessionWithQoS`, `Nnef_BDTPNegotiation`), TS 29.514 (`Npcf_PolicyAuthorization`) and TS 29.554 (`Nnef_BDTPNegotiation` / BDT policy). Verify against the 3GPP work plan before publication.
:::

## Related

- [Workflows and Requirements](./workflows): the requirement categories mapped here.
- [Reference Scenarios](./scenarios): the production setups these APIs serve.
- [Quality on Demand](./using-quality-on-demand), [QoS Booking](./using-qos-booking), [QoS Booking and Assignment](./using-qos-booking-assignment), [QoS Profiles](./using-qos-profiles), [Dedicated Networks](./using-dedicated-networks): the per-API walkthroughs.
- [Network API Initiatives](../network-api-initiatives): the CAMARA APIs and their 3GPP mappings.

:::note
Refer to the [Tech](https://github.com/5G-MAG/Tech/) repository to contribute to this documentation.
:::

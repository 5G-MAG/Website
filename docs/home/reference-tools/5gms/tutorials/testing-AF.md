---
title: Testing 5GMS AF
hide_title: true
sidebar_position: 1
description: Overview of installing, configuring and testing the 5GMS Application Function's M1, M3 and M5 interfaces, linking to version-specific test pages.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>Testing the 5GMS Application Function</h1>
</div>
</div>

:::tip[In short]
This tutorial allows to: Setup the 5GMSd AF; Test the M1 Interface APIs (Provisioning Sessions, Server Certificates, Content Protocol Discovery, Content Hosting, Consumption Reporting); Test the M3 Interface APIs (Simple HTTP configuration, HTTP configuration and certificate sending); Test the M5 Interface APIs (Service Access Information).
:::

Here you will find information to assist with testing of the Reference Tools 5GMS Application Function (AF).

<img loading="lazy" src="/assets/images/5gms/5GMS_Downlink_AF.png" alt="5GMSd downlink architecture highlighting the Application Function and its M1, M3 and M5 interfaces" />

**Recommended path:** install the AF, configure it, then test its interfaces in the order M1 (provisioning), M3 (AF-to-AS configuration), M5 (client session handling).

The tests on this page are grouped by interface: M1 is the provisioning interface used by the Application Service Provider to provision the AF; M3 is the interface the AF uses to configure the Application Server (AS); M5 is the interface the client on the UE uses to obtain Service Access Information from the AF. The exact test steps depend on the AF version you have installed, so each interface section links to the page matching your version. If you are unsure which version you have, check the release you installed from the [rt-5gms-application-function repository](https://github.com/5G-MAG/rt-5gms-application-function).

## Installation of the 5GMS AF as a Local User or as a System Service

The AF can be installed as a local user or as a full system service — pick the one that fits what you're doing:

<div class="community-tiles community-tiles--even">
<a class="community-tile" href="./application-function/installation-local-user-5GMSAF">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
<strong>Local user installation</strong>
<span class="tile-desc">Sets up a test environment without requiring full system installation.</span>
<span class="tile-cta">Test environment setup →</span>
</a>
<a class="community-tile" href="./application-function/installation-system-service-5GMSAF">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-10z" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
<strong>System service installation</strong>
<span class="tile-desc">Sets up a full system installation.</span>
<span class="tile-cta">Full system setup →</span>
</a>
</div>

## Configuration of the 5GMS AF

Follow the instructions in this [page](./application-function/configuration-5GMSAF) for configuring the 5GMS AF.

## Testing APIs

### Testing: M1 Interface

The details of these tests change with different versions of the 5GMSd Application Function. Use the page matching your version:

| AF version       | Test page                                                                    |
| ---------------- | ---------------------------------------------------------------------------- |
| v1.2.x           | [Testing the M1 Interface on v1.2.0](./application-function/testing-m1-v120) |
| v1.3.0 to v1.4.0 | [Testing the M1 Interface on v1.3.0](./application-function/testing-m1-v130) |
| v1.4.1 or later  | [Testing the M1 Interface on v1.4.1](./application-function/testing-m1-v141) |

### Testing: M3 Interface

The commands to test the interface at reference point M3 change depending on the AF version. Use the page matching your version:

| AF version       | Test page                                                                    |
| ---------------- | ---------------------------------------------------------------------------- |
| v1.1.x           | [Testing the M3 Interface on v1.1.0](./application-function/testing-m3-v110) |
| v1.2.0 and above | [Testing the M3 Interface](./application-function/testing-m3-v120)           |

### Testing: M5 Interface

The details of these tests change with different versions of the 5GMSd Application Function. Use the page matching your version:

| AF version      | Test page                                                                    |
| --------------- | ---------------------------------------------------------------------------- |
| up to v1.1.x    | [Testing: M5 Interface on v1.0.0](./application-function/testing-m5-v100)    |
| v1.2.x          | [Testing the M5 Interface on v1.2.0](./application-function/testing-m5-v120) |
| v1.3.0 or later | [Testing the M5 Interface on v1.3.0](./application-function/testing-m5-v130) |

### Testing with Postman

Postman is a popular API development and testing tool that allows users to create, send, and manage HTTP requests.
Postman comes in very handy when testing and working with the M1 and M5 interfaces of the Application Function. Please
visit the [Testing with Postman](./testing-postman) page.

## Next steps

- Test the Application Server: [Developing and Testing the 5GMS Application Server](./testing-AS).
- Exercise the M1 and M5 APIs interactively: [Testing M1 and M5 APIs with Postman](./testing-postman).
- Return to the [Tutorials index](.).

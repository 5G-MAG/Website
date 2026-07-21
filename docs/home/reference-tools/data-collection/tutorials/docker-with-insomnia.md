---
title: DCAF (Docker+Insomnia)
hide_title: true
sidebar_position: 0
description: Tutorial for running the Data Collection Application Function in Docker and exercising its R1, R6 and R2 REST APIs via Insomnia.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" />
  <path d="M9 17l0 -5" />
  <path d="M12 17l0 -1" />
  <path d="M15 17l0 -3" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">UE Data Collection, Reporting and Event Exposure</span>
<h1>Data Collection Application Function with Docker and Insomnia REST client</h1>
</div>
</div>

:::tip[In short]
This tutorial covers setting up the Data Collection Application Function (DCAF) with Docker and using its REST API with the Insomnia REST client.
:::

**What you will build:** a running DCAF, driven end to end through its provisioning (R1), event subscription (R6) and direct data reporting (R2) interfaces from the Insomnia REST client.

## Prerequisites

- Docker installed on your machine (download from [here](https://www.docker.com/products/docker-desktop)).
- The Insomnia REST client (download from [here](https://insomnia.rest/)).
- Basic familiarity with running containers and issuing REST API requests.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/ZpktgeRCqNY?si=TMghwBOUmjV4MZkv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Setup diagram

<img loading="lazy" src="/assets/images/dcaf/uedc_docker_1.png" style="width: 80%" alt="Docker setup for the DCAF tutorial, showing the DCAF, NRF and HTTP/2 server containers" />

## Requirements

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /></svg>Docker installed</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" /></svg>Insomnia REST client</span>
</div>

Same two tools as in [Prerequisites](#prerequisites) above; see there for download links.

## DCAF Setup

### Downloading

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-data-collection-application-function">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-data-collection-application-function</span>
<span class="repo-card__role">Data Collection Application Function source, cloned with submodules for the Docker build.</span>
</a>

First, clone the repository of the Data Collection Application Function. Open a terminal and
run:

```bash
git clone --recurse-submodules https://github.com/5G-MAG/rt-data-collection-application-function.git
```

### Starting the Docker Containers

Now that the source code of the Data Collection Application Function is available, build the Docker
images and start the Docker containers. Navigate to the root directory of the repository and build
the Docker containers:

```bash
cd rt-data-collection-application-function/docker/local
docker compose up
```

This will start three Docker containers:

- `nrf`: A 5G Core Network Repository Function (NRF) for the Application Function to register with.
- `dcaf`: The Data Collection Application Function that exposes multiple REST APIs to interact with. These
  APIs are used later with the Insomnia REST client.
- `h2-server`: A fully-functional HTTP/2 server to handle data that is provided by the DCAF as a response to event.
  subscriptions.

Building the Docker containers may take a while. Once the containers are up and running, the REST APIs
exposed by the Data Collection Application Function become accessible. For that reason, the ports of the `dcaf` container are mapped to
the corresponding ports on the host machine:

```yml
dcaf:
  ports:
    - '5000:5000' # Provisioning API (R1)
    - '5100:5100' # Direct Data Reporting API (R2)
    - '5201:5201' # Event Consumer Application Function Event Exposure API (R6)
```

If you run into any issues with ports already being in use, you can change the port mappings in the
`docker-compose.yml`. Note that you also need to change the corresponding Insomnia environment variables then (see
Insomnia Setup below).

Once the Docker containers are running you should see an output like this:

```text
 ✔ Network reftools_5g-mag_data-collection-af-local_default        Created                                                                                                                            0.0s
 ✔ Container reftools_5g-mag_data-collection-af-local-nrf-1        Created                                                                                                                            0.0s
 ✔ Container reftools_5g-mag_data-collection-af-local-h2-server-1  Created                                                                                                                            0.0s
 ✔ Container reftools_5g-mag_data-collection-af-local-dcaf-1       Created                                                                                                                            0.0s
Attaching to dcaf-1, h2-server-1, nrf-1
nrf-1        | Open5GS daemon v2.7.2
nrf-1        |
nrf-1        | 03/25 13:09:37.843: [app] INFO: Configuration: '/etc/open5gs/default/nrf.yaml' (../lib/app/ogs-init.c:133)
nrf-1        | 03/25 13:09:37.843: [app] INFO: File Logging: '/open5gs/install/var/log/open5gs/nrf.log' (../lib/app/ogs-init.c:136)
nrf-1        | 03/25 13:09:37.845: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:7777 (../lib/sbi/nghttp2-server.c:424)
nrf-1        | 03/25 13:09:37.845: [app] INFO: NRF initialize...done (../src/nrf/app.c:31)
dcaf-1       | Open5GS daemon v2.6.4-10-gb9dd812
dcaf-1       |
dcaf-1       | 03/25 13:09:37.972: [app] INFO: Configuration: '/etc/open5gs/dcaf.yaml' (../subprojects/open5gs/lib/app/ogs-init.c:126)
dcaf-1       | 03/25 13:09:37.972: [app] INFO: File Logging: '/home/ubuntu/af/open5gs/build/log/data-collection.log' (../subprojects/open5gs/lib/app/ogs-init.c:129)
dcaf-1       | 03/25 13:09:37.974: [app] INFO: LOG-LEVEL: 'info' (../subprojects/open5gs/lib/app/ogs-init.c:132)
dcaf-1       | 03/25 13:09:37.977: [DCAF] INFO: Initialising library:
dcaf-1       |   Library Version: [libspdc-1.0.0]
dcaf-1       |   Version [1.0.0]
dcaf-1       |   Major: [0],
dcaf-1       |   Minor [1]
dcaf-1       |   Micro: [0]
dcaf-1       |  (../src/data-collection-af/init.c:105)
dcaf-1       | 03/25 13:09:37.979: [data-collection-service-producer] INFO: Registering Data Collection Service [3gpp-ndcaf_data-reporting-provisioning] (../lib/data-collection-service-provider/data-collection-nf-service.c:67)
dcaf-1       | 03/25 13:09:37.980: [data-collection-service-producer] INFO: Registering Data Collection Service [3gpp-ndcaf_data-reporting] (../lib/data-collection-service-provider/data-collection-nf-service.c:67)
dcaf-1       | 03/25 13:09:37.980: [data-collection-service-producer] INFO: Registering Data Collection Service [naf-eventexposure] (../lib/data-collection-service-provider/data-collection-nf-service.c:67)
dcaf-1       | 03/25 13:09:37.981: [sbi] INFO: nghttp2_server() [http://127.0.0.1]:7777 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
dcaf-1       | 03/25 13:09:37.982: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:5000 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
dcaf-1       | 03/25 13:09:37.982: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:5102 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
dcaf-1       | 03/25 13:09:37.982: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:5100 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
nrf-1        | 03/25 13:09:37.986: [sbi] INFO: NF EndPoint(fqdn) setup [dcaf:0] (../lib/sbi/context.c:2195)
dcaf-1       | 03/25 13:09:37.983: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:5101 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
nrf-1        | 03/25 13:09:37.986: [sbi] INFO: NF EndPoint(addr) setup [127.0.0.1:80] (../lib/sbi/context.c:2195)
dcaf-1       | 03/25 13:09:37.983: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:5201 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
nrf-1        | 03/25 13:09:37.986: [sbi] INFO: NF EndPoint(addr) setup [0.0.0.0:5000] (../lib/sbi/context.c:1934)
dcaf-1       | 03/25 13:09:37.984: [sbi] INFO: nghttp2_server() [http://0.0.0.0]:5200 (../subprojects/open5gs/lib/sbi/nghttp2-server.c:395)
nrf-1        | 03/25 13:09:37.986: [sbi] INFO: NF EndPoint(addr) setup [0.0.0.0:5100] (../lib/sbi/context.c:1934)
dcaf-1       | 03/25 13:09:37.985: [app] INFO: 5G Data Collection AF initialize...done (../src/data-collection-af/app.c:23)
nrf-1        | 03/25 13:09:37.987: [sbi] INFO: NF EndPoint(addr) setup [0.0.0.0:5201] (../lib/sbi/context.c:1934)
dcaf-1       | 03/25 13:09:37.985: [DCAF] INFO: [67bfc656-097a-41f0-9047-3b8b76ef7fa1] DCAF Running (../src/data-collection-af/dcaf-sm.c:61)
nrf-1        | 03/25 13:09:37.987: [nrf] INFO: [67bfc656-097a-41f0-9047-3b8b76ef7fa1] NF registered [Heartbeat:10s] (../src/nrf/nf-sm.c:202)
dcaf-1       | 03/25 13:09:37.987: [sbi] INFO: [67bfc656-097a-41f0-9047-3b8b76ef7fa1] NF registered [Heartbeat:10s] (../subprojects/open5gs/lib/sbi/nf-sm.c:214)
```

The log above shows a successful start-up. Look for `DCAF Running`, which confirms the Data Collection AF is up, and the two `NF registered` lines, which confirm the DCAF has registered with the NRF.

## Insomnia Setup

Now that the Docker containers are up and running, set up the Insomnia REST client.

:::note
The imported Insomnia collection ships with `After-Response` scripts that automatically capture identifiers (such as the provisioning session id, data reporting configuration id, event subscription id and data reporting session id) from each response and store them in environment variables. Because of this, later requests can reuse those values without you copying them by hand. The scripts shown in the steps below are the same mechanism applied at each stage.
:::

### Pre-Configuration

The DCAF requires the HTTP version to be set to `HTTP/2 PriorKnowledge` for incoming requests. To set this up in
Insomnia, navigate to `Settings` and change `Preferred HTTP version` to `HTTP/2 PriorKnowledge`.

### Importing the Workspace

For your convenience, an Insomnia workspace is provided for import. Download the workspace
from [here](https://github.com/5G-MAG/rt-data-collection-application-function/blob/development/usage/insomnia/Insomnia_DCAF.yaml).

Once you downloaded the file click on `import` in the Insomnia REST client and select the downloaded file. This will
import the required HTTP requests and the environment variables. You should then see the `5GMAG-DCAF` collection in the
center of the Insomnia window:

![Insomnia Collection](/assets/images/dcaf/insomnia-collection.jpeg)

Now select the `5GMAG-DCAF` collection and you will see the available HTTP requests on the left side of Insomnia.

![Insomnia Calls](/assets/images/dcaf/insomnia-available-calls.jpeg)

If you need to change the environment variables, you can do so by clicking on `5G-MAG DCAF` in the top left corner next
to the globe symbol and select the edit icon next to `Collection Environments`. Then you can edit the environment
variables.

![Insomnia Environment](/assets/images/dcaf/insomnia-environment.jpeg)

Note that the Insomnia collection ships with multiple `After-Responses` scripts that set the environment
variables based on the payload or the headers of the HTTP response. As an example, the `provisioningSessionId` is
automatically set after creating a new Data Reporting Provisioning Session:

```js
const response = insomnia.response.json();
const provisioningSessionId = response.provisioningSessionId;
insomnia.environment.set('provisioning_session_id', provisioningSessionId);
```

## Using the REST APIs

Now that all components are running and the Insomnia workspace is set up, the REST APIs of the DCAF can be used.
This tutorial follows the steps shown in the usage sequence below:

![Usage sequence diagram for the DCAF tutorial, tracing the start-up, provisioning, subscription and reporting phases](/assets/images/dcaf/usage-sequence-diagram.png)

_Figure: usage sequence for this tutorial, from start-up through provisioning, event subscription and data reporting._

### Start-Up phase

At start-up, the DCAF registers with the NRF and starts the HTTP/2 server. This is done automatically and does not
require any user interaction.

In the logs you will find the following lines:

```text
nrf-1        | 03/25 13:09:37.987: [nrf] INFO: [67bfc656-097a-41f0-9047-3b8b76ef7fa1] NF registered [Heartbeat:10s] (../src/nrf/nf-sm.c:202)
dcaf-1       | 03/25 13:09:37.987: [sbi] INFO: [67bfc656-097a-41f0-9047-3b8b76ef7fa1] NF registered [Heartbeat:10s] (../subprojects/open5gs/lib/sbi/nf-sm.c:214)
```

### Provisioning Phase

In the provisioning phase, act as an `Application Provider` and create a new Data Reporting Provisioning Session and a
Data Reporting Configuration. This is done by sending `POST` requests via Insomnia to the DCAF.

#### Creating a new Data Reporting Provisioning Session

To create a new Data Reporting Provisioning Session navigate to the `R1 - Data Reporting Provisioning Session` folder in
the Insomnia workspace and select the
`Create a new Data Reporting Provisioning Session`.
Adjust the body of the request with the parameters you like to use or use the predefined ones. Then `Send` the request.

The DCAF returns the location of the created resource in the `location` header of the HTTP response. An `After-Response`
script will automatically save the provisioning session id in the corresponding environment variable:

```js
const response = insomnia.response.json();
const provisioningSessionId = response.provisioningSessionId;
insomnia.environment.set('provisioning_session_id', provisioningSessionId);
```

#### Creating a new Data Reporting Configuration

Next, create a new Data Reporting Configuration. Navigate to the `R1 - Data Reporting Configuration` folder in the
Insomnia workspace and select the `Create a new Data Reporting Configuration` POST request. Send the request after
adjusting the body as desired.

Again, an `After-Response` script will automatically save the data reporting configuration id in the corresponding
environment variable:

```js
const response = insomnia.response.json();
const dataReportingConfigurationId = response.dataReportingConfigurationId;
insomnia.environment.set('data_reporting_configuration_id', dataReportingConfigurationId);
```

### Event Subscription Phase

In the event subscription phase, register for events of interest. This is done by sending `POST`
requests as an Application Provider to the DCAF.

For that reason, navigate to the `R6 - Event Subscription` folder in the Insomnia workspace and select the
`Creates a new Individual Application Event Exposure Subscription resource` option.

Send the request after adjusting the remaining fields of the `body` as desired.

Again, an `After-Response` script will handle the response and save the event subscription id in the corresponding
environment variable if the response code is set to `200`:

```js
const locationHeader = insomnia.response.headers.find((header) => header.key === 'location');

insomnia.test('Check if status is 200', () => {
  insomnia.expect(locationHeader).to.not.be.empty;
});

if (locationHeader) {
  const uuid = locationHeader.value.split('/').pop();
  if (uuid) {
    insomnia.environment.set('event_exposure_subscription_id', uuid);
  }
}
```

#### Optional: Changing the HTTP/2 server port

By default, the HTTP/2 server that is receiving the reports is started on port `8888`. If you want to change the port
open `h2_svr-docker.py` and edit the following line:

```python
server = await loop.create_server(H2Protocol, '0.0.0.0', 8888)
```

Replace `8888` with the port you want to use. For instance

```python
server = await loop.create_server(H2Protocol, '0.0.0.0', 4444)
```

As the port of the server that is receiving the event notifications is preconfigured, adjust the `notifUri` in the
request body. Copy the port number (in this example the port is set to `4444`) and replace the existing port in the
`notifUri` field of the request body. For instance:

```text
"notifUri": "http://h2-server:4444/dcaf/notification/handler",
```

### Data Reporting Phase

In the data reporting phase, take the role of the user equipment (UE) and create a data reporting session and then
send data reports.

#### Creating a new Data Reporting Session

To create a new data reporting session navigate to the `R2 - Data Reporting Session` folder in the Insomnia workspace
and select `Create a new Data Reporting Session`. Send the request after adjusting the `body` parameters as desired.

Again, an `After-Response` script will handle the response and save the data reporting session id in the corresponding
environment variable:

```js
const response = insomnia.response.json();
const dataReportingSessionId = response.sessionId;
insomnia.environment.set('data_reporting_session_id', dataReportingSessionId);
```

#### Submitting a communications report

The final step is to submit a communications report. For that reason, navigate to the `R2 - Data Reporting` folder and
select `Submit Communications Report`. Adjust the `body` parameters as desired and send the request.

#### Checking the reports

If everything went well, you should see the reports in the log file located in
`rt-data-collection-application-function/docker/local/logs/notifications`. The example below shows one such notification: the headers of the POST delivered to the HTTP/2 server, followed by the reported UE communication information (upload and download volumes for a time window):

```json
{
  "headers": {
    ":method": "POST",
    ":scheme": "http",
    ":authority": "h2-server:34117",
    ":path": "/dcaf/notification/handler",
    "accept": "*/*",
    "content-type": "application/json",
    "content-length": "340"
  },
  "body": {
    "notifId": "5g-mag-notification-id",
    "eventNotifs": [
      {
        "event": "UE_COMM",
        "timeStamp": "2025-03-25T13:00:44Z",
        "ueCommInfos": [
          {
            "appId": "5G-MAGAppID",
            "comms": [
              {
                "startTime": "2025-02-05T14:28:00Z",
                "endTime": "2025-02-05T14:29:00Z",
                "ulVol": 1000,
                "dlVol": 2000
              }
            ]
          }
        ]
      }
    ]
  }
}
```

#### End Data Reporting Provisioning Session

This tutorial does not destroy the sessions, so steps 18 - 21 from the above diagram are not executed.

## Wrapping up

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You have run the DCAF end to end.</strong> It registered with the NRF, provisioned a session and configuration (R1), subscribed to events (R6), and submitted a data report (R2) that was delivered to the HTTP/2 server.</div>
</div>

To stop and remove the containers when you are done, run the following from `rt-data-collection-application-function/docker/local`:

```bash
docker compose down
```

## Next steps

- Read the [Scope](../scope) page for how these interfaces fit the wider framework.
- Browse the [project index](../) for repositories, packages and releases.

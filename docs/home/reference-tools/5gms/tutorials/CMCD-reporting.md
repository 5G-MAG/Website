---
title: CMCD Reporting
hide_title: true
sidebar_position: 7
description: Configures the 5GMSd Application Server to forward CMCD data from media requests to the cmcd-toolkit collector and Grafana dashboard.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>CMCD Reporting</h1>
</div>
</div>

## Introduction

CMCD Reporting enables the collection of CMCD(Common Media Client Data, [CTA-5004](https://cdn.cta.tech/cta/media/media/resources/standards/pdfs/cta-5004-final.pdf)) from the media player and the forwarding of CMCD metrics through the 5G Media Streaming system for monitoring and analysis.

CMCD information is reported in-band with media requests using HTTP query parameters or request headers, and is extracted by the Application Server during normal media delivery. The Application Server then forwards the collected and formatted CMCD metrics to a CMCD Collector, where they can be visualized via a dashboard for analyzing media session behavior and content delivery characteristics.

This tutorial describes how to set up and enable CMCD Reporting in the Reference Tools, and how to access the CMCD dashboard.

**What you will build:** a 5GMSd deployment where the Application Server extracts CMCD from media requests and forwards it to the cmcd-toolkit collector, which you view on a Grafana dashboard.

## Prerequisites

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>Working AF + AS</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /></svg>Docker</span>
</div>

A working AF and AS from the [basic end-to-end guide](end-to-end): Steps 1 to 6 below point back to that guide, so if you already have a running end-to-end deployment you can move quickly through them. Docker is used to run the cmcd-toolkit collector, database and dashboard.

Note on ports: the components below listen on different ports, which is intentional. The collector ingests CMCD on port `3000` (the `cmcd_collector_url` points here); the Grafana dashboard UI is served on port `8081`. The 5GMS Application Server itself is reached on its normal HTTP port.

Note on CMCD versions: the collector converts incoming CMCD version 1 (v1) reports to version 2 (v2), as shown in the collector logs later in this tutorial.

## Server-side setup

### Step 1: Install the Application Function

For details please refer to the [corresponding section](end-to-end#1-installing-the-application-function) in
the [basic end-to-end guide](end-to-end).

### Step 2: Basic Configuration of the Application Function

Follow the [basic configuration steps](end-to-end) documented in
the [basic end-to-end guide](end-to-end).

### Step 3: Start the Application Function

Follow the [command](end-to-end) documented in the [basic end-to-end guide](end-to-end).

### Step 4: Install the Application Server

For details please refer to the [corresponding section](end-to-end#2-installing-the-application-server) in
the [basic end-to-end guide](end-to-end).

### Step 5: Enable/Disable CMCD in the Application Server

Configure the URL of the CMCD Collector in `src/rt_5gms_as/context.py`:

- To enable CMCD on the AS, set `cmcd_collector_url` to the collector endpoint, replacing `<CMCD_DASHBOARD_IP>` with the IP of the machine running the CMCD dashboard (note the ingest port `3000`):

  `cmcd_collector_url = http://<CMCD_DASHBOARD_IP>:3000/cmcd/response-mode`

  For example: `http://10.64.39.13:3000/cmcd/response-mode`.

- To disable CMCD on the AS, leave `cmcd_collector_url` empty (the default). An empty value means CMCD forwarding is disabled.

### Step 6: Start the Application Server

For details please refer to the [corresponding section](end-to-end#3-running-the-application-server) in
the [basic end-to-end guide](end-to-end).

### Step 7: Deploy the cmcd-toolkit

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/cmcd-toolkit">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>cmcd-toolkit</span>
<span class="repo-card__role">CMCD collector, database and Grafana dashboard, run via Docker Compose.</span>
</a>

#### Step 7.1 Clone cmcd-toolkit

```bash
git clone https://github.com/5G-MAG/cmcd-toolkit.git
```

#### Step 7.2 Compose

```bash
chmod 777 cmcd-toolkit/grafana/local-stack/dashboards/cmcd-dashboard.json
docker compose up
```

#### Step 7.3 Login to Grafana at `http://<DASHBOARD_IP>:8081`

    + User: admin
    + Password: grafana

### Step 8: Verify the dashboard with fake CMCD message

Run the command below (replace `<YOUR_MACHINE_IP_HERE>` with the IP of the machine that the 5GMS Application Server is running on). If it works, you should see that a new CMCD report has been received in the dashboard.

```bash
ts=$(date +%s%3N)
curl -i "http://<YOUR_MACHINE_IP_HERE>/media/test.m4s?CMCD=\
cid=\"_30fps/bbb2_30fps.mpd\",\
sid=\"demo\",\
su,\
br=1500,\
d=4000,\
bl=3500,\
tb=8000,\
dl=0,\
mtp=18000,\
nor=\"bbb2_30fps_2.m4s\",\
nrr=\"0-2000\",\
pr=1.0,\
sf=d,\
st=v,\
ot=i,\
ts=${ts},\
v=1"
```

## Client-side setup

With the server-side set up, focus shifts to the client side.

### Step 1: Installation, Configuration and Running the 5GMSd Client

Please follow the [instructions](end-to-end#client-side-setup) documented in the [basic end-to-end guide](end-to-end) setup guide.

### Step 2: Creating CMCD Report

While consuming content via the previously installed 5GMSd Application Server and 5GMSd Application Function, the client automatically collects and sends CMCD Reports.

<img loading="lazy" src="/assets/images/5gms/app-playback.png" width="40%" alt="5GMSd-Aware Application playing a stream on Android while CMCD reports are collected and sent" />

### Step 3: Inspecting the CMCD Report in Dashboard

Navigate to `http://<CMCD_DASHBOARD_IP>:8081/dashboards` in your browser (note the Grafana UI port `8081`), like below you should see:

<img loading="lazy" src="/assets/images/5gms/cmcd-dashboard.png" width="85%" alt="Grafana CMCD dashboard showing collected CMCD metrics" />

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have CMCD Reporting working end-to-end.</strong> The Application Server extracts CMCD from media requests and forwards it to the cmcd-toolkit collector, and reports show up live on the Grafana dashboard.</div>
</div>

## Logs for Debugging

### Nginx access (watch the CMCD message the AS received):

```bash
    docker exec -it <AS container ID> bash # enter the container
    ps -ef | grep nginx # Find log path
    tail -n 0 -f <Your access log path>
```

### Nginx error :

```bash
    docker exec -it <AS container ID> bash # enter the container
    ps -ef | grep nginx # Find log path
    tail -n 0 -f <Your error log path>
```

### CMCD Collector(watch the conversion result from CMCD v1 to v2):

```bash
    docker logs -f --tail 10 cmcd-toolkit-collector-1
```

<img loading="lazy" src="/assets/images/5gms/cmcd-toolkit-collector-log.png" width="100%" alt="cmcd-toolkit collector log showing CMCD v1 to v2 conversion" />

### Fluentd(watch the log of the dashboard database)

```bash
    docker logs cmcd-toolkit-fluentd-1 | grep -i "node.collector"
```

### Grafana(watch the log of the dashboard)

```bash
    docker compose logs grafana | egrep -i "provision|dashboard|yaml|error|warn" | tail -n 200
```

## Database for Debugging

This section is optional and illustrative. It shows how to query the InfluxDB database directly if you want to inspect the stored CMCD metrics behind the dashboard; it is not required for normal use.

```bash
user@host:~$ docker exec -it cmcd-toolkit-influxdb-1 influx
--------------
USE analytics;
SHOW MEASUREMENTS;
---------
SHOW FIELD KEYS FROM "cmcd_metrics";
SHOW TAG KEYS   FROM "cmcd_metrics"


SHOW TAG VALUES FROM "cmcd_metrics" WITH KEY = "cmcd_key_sid"
WHERE time > now() - 30m;

SELECT * FROM "cmcd_metrics" WHERE "cmcd_key_sid"='3f63f118-a5c5-44ba-a155-9522904b44cb' ORDER BY time DESC LIMIT 5;
SELECT * FROM "cmcd_metrics" WHERE "cmcd_key_sid"='demo' ORDER BY time DESC LIMIT 5;
SELECT COUNT(*) FROM "cmcd_metrics" WHERE "cmcd_key_sid"='demo';

user@host:~$ docker exec -it cmcd-toolkit-influxdb-1 influx
Connected to http://localhost:8086 version 1.8.10
InfluxDB shell version: 1.8.10
> USE analytics;
Using database analytics
> SHOW MEASUREMENTS;
name: measurements
name
----
cmcd_metrics
> SHOW FIELD KEYS FROM "cmcd_metrics";
name: cmcd_metrics
fieldKey         fieldType
--------         ---------
cmcd_data        string
cmcd_key_bg      boolean
cmcd_key_bl      integer
cmcd_key_br      integer
cmcd_key_bs      boolean
cmcd_key_d       integer
cmcd_key_dl      integer
cmcd_key_e       string
cmcd_key_ltc     integer
cmcd_key_msd     integer
cmcd_key_mtp     integer
cmcd_key_nor     string
cmcd_key_ot      string
cmcd_key_pr      float
cmcd_key_rc      integer
cmcd_key_rtp     integer
cmcd_key_sf      string
cmcd_key_st      string
cmcd_key_sta     string
cmcd_key_su      boolean
cmcd_key_tb      integer
cmcd_key_ts      integer
cmcd_key_ts_date string
cmcd_key_ttfb    integer
cmcd_key_ttlb    integer
cmcd_key_url     string
cmcd_key_v       integer
request_datetime string
request_origin   string
> SHOW TAG KEYS   FROM "cmcd_metrics"
name: cmcd_metrics
tagKey
------
cmcd_key_cid
cmcd_key_sid
cmcd_mode
request_ip
request_user_agent
```

## Next steps

- Try the related reporting tutorials: [Consumption Reporting](consumption-reporting) and [QoE Metrics Reporting](metrics-reporting).
- Return to the [Tutorials index](.).

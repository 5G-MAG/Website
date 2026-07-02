---
title: Docker for Clients
hide_title: true
sidebar_position: 4
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
  <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
  <path d="M9 21l3 -9l3 9" />
  <path d="M10 19h4" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Broadcast: Hybrid TV/Radio</span>
<h1>Docker support for rt-mbms client components (Linux)</h1>
</div>
</div>

## Introduction

This tutorial covers running the rt-mbms receiver processes as Docker containers on Linux. It is a receiver-only setup (it does not include a transmitter). The containers cover [rt-mbms-modem](https://github.com/5G-MAG/rt-mbms-modem), [rt-mbms-mw](https://github.com/5G-MAG/rt-mbms-mw), [rt-wui](https://github.com/5G-MAG/rt-wui) and nginx, run individually and interacting with each other over the native Docker network.

**What you will build:** the 5G Broadcast receiver (modem, middleware, web interface and nginx proxy) running as four Docker containers.

## Prerequisites

* Docker installed on the host (see Step 1 below).
* The same hardware, SDR and operating-system requirements as the native setup. To avoid duplication (and drift), see the shared [Requirements](./requirements) page. In short: a live setup needs a supported SDR, while running from sample files does not.

## Installation of rt-mbms processes with Docker

The installation has four steps, matching the sections below:

1. Install the Docker engine.
2. Build the Docker images.
3. Run the containers.
4. Execute (enter) the containers.

### Step 1: Install Docker

[Dockerhub](https://docs.docker.com/engine/install/ubuntu/) hosts the docker engine repos which can be easily installed
locally to start working with docker.

**Alternatively**, easy to use shell script can be
found [here](https://github.com/5G-MAG/rt-mbms-modem/blob/development/dockerPrereq.sh)!

### Step 2: Build the images

The files for the docker implementation are contained
in [rt-mbms-modem](https://github.com/5G-MAG/rt-mbms-modem/tree/development/modem), [rt-mbms-mw](https://github.com/5G-MAG/rt-mbms-mw/tree/development/middleware), [rt-wui](https://github.com/5G-MAG/rt-wui/tree/development/wui)
and [nginx](https://github.com/5G-MAG/rt-wui/tree/development/nginx).

The Dockerfile helps to create a docker image, which can be used to run the containers.

The command `docker build` uses by default the Dockerfile to create the image. For custom docker files go with    
`docker build -f /path/to/Dockerfile -t target_image_name /location/of/Dockerfile`

There is a build.sh script on each folder for easy access.

**Note:** Please edit the appropriate path to the sample files in the last line
of [startup](https://github.com/5G-MAG/rt-mbms-modem/tree/development/modem/scripts) script for modem process before
building the container.

### Step 3: Run the containers

The modem, middleware, wui and nginx containers can be run using the run.sh script in their respective folders.

The run.sh script contains the `docker logs` command which helps the user to have an idea on what is happening inside
the containers.

**Note:** Please build docker images and run the containers in the order of

1. rt-mbms-modem
2. rt-mbms-mw
3. rt-wui
4. nginx respectively

The resulting IP addresses of the containers are

    Modem - 172.17.0.2
    mbms-mw - 172.17.0.3
    wui    - 172.17.0.4
    nginx  - 172.17.0.5

`sudo docker inspect container_name | grep IPAddress` returns the IP of the container.

If your containers get different IPs, update the matching field in each config file so the components can reach each other:

| Container | Assign its IP in |
|---|---|
| Modem | (referenced by the middleware and wui config) |
| mbms-mw | `5gmag-rt.conf` |
| wui | the wui config file |
| nginx | the nginx config file |

### Step 4: Execute (enter) the containers

The `docker exec` command lets you get a shell inside a container:
`docker exec -it container_name /bin/bash`

The list of the containers (running or exited) can be viewed using:
`docker ps -a` . The status column shows the status of each container.

A running container can be stopped using:
`docker stop container_name`

An exited or obsolete container can be removed using:
`docker rm container_name`

## Next steps

* For the equivalent native (non-Docker) receiver setup, see [SDR - HLS Playback over 5G Broadcast](./hls-playback-5gbc).
* Return to the [Tutorials index](./).

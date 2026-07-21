---
title: MBS Core (Docker)
hide_title: true
sidebar_position: 3
description: Tutorial for deploying the MBS-capable 5G Core via Docker Compose (internal or external gNB) and running the included test suite.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12l0 .01" />
  <path d="M14.828 9.172a4 4 0 0 1 0 5.656" />
  <path d="M17.657 6.343a8 8 0 0 1 0 11.314" />
  <path d="M9.168 14.828a4 4 0 0 1 0 -5.656" />
  <path d="M6.337 17.657a8 8 0 0 1 0 -11.314" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Multicast Broadcast Services (MBS)</span>
<h1>MBS support in the 5GC (Docker deployment)</h1>
</div>
</div>

This tutorial explains how to run the MBS-capable 5G Core (5GC) as a set of Docker containers, so you can bring up the whole MBS core network with a single Docker Compose deployment instead of building each Network Function by hand.

Two Docker Compose deployments of the MBS capable 5G Core are available:

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-mbs-examples/">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-mbs-examples</span>
<span class="repo-card__role">Docker Compose recipes for the MBS-capable 5G Core, plus the Python test suite used later in this tutorial.</span>
</a>

- The `internal` deployment connects all the developed Network Functions for MBS with one srsRAN gNB and one srsRAN UE
  running using the ZeroMQ driver
- The `external` deployment deploys _only_ the developed Network Functions for MBS waiting for an external gNB connection

**Which should I use?** Choose the `internal` deployment for a self-contained first run: it includes a gNB and UE, so you can bring up everything on one machine with no extra hardware. Choose the `external` deployment when you want to connect your own (physical or separate) gNB to the MBS core over the N2 and N3mb interfaces.

## Architecture using Open5GS

![5G-MBS architecture using Open5GS](/assets/images/5mbs/5G-MBS_5G_Core.png)

:::note
All the procedures related to the AMF, SMF and UPF of Open5GS work as expected when using the 5G-MAG components. As an example it is possible to create a standard PDU Session with a gNB and a UE while using the MBS capable 5G Core.
:::

The following host ports are exposed by the deployments:

| Port         | Exposed in                | Purpose                                                                                        |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `TCP 27017`  | `internal` and `external` | Add subscribers to the MongoDB database                                                        |
| `SCTP 38412` | `external`                | From the AMF for the NGAP `N2 interface`, the control-plane connection with the external gNB   |
| `UDP 2152`   | `external`                | From the MB-UPF for the GTPU `N3mb interface`, the data-plane connection with the external gNB |

:::note
Modify the `.env` file present on this repository to change the values being deployed on `docker-compose.yaml`. Add your host's IP address to the `DOCKER_HOST_IP` variable in the `.env` file for the MB-UPF to be reachable by external gNBs.
:::

## Mapping of container names and the architecture

The following image shows the relationship between the `Architecture using Open5GS` image and the names of the
containers.

![5G-MBS container name mapping](/assets/images/5mbs/5G-MBS_container_names.png)

## Testing

This section explains how to use the Python tests present on the `test` directory in
the [rt-mbs-examples](https://github.com/5G-MAG/rt-mbs-examples/) repository.

The Python modules requirements are preinstalled on the AF/AS container image. This container mounts the `test`
directory as read-only to be able to run the tests.

To run the tests, execute an interactive session with the AF/AS container and navigate to the test directory:

```bash
docker exec -it test_mbs_af_as bash

# inside the AF/AS container
cd test

# to run the tests
python3 tests.py
```

The `test` directory contains the following subdirectories:

- `MB_SMF` the developed tests regarding the MB-SMF Network Function
- `utils` a Python package containing some common utils for the tests
- `support` some support files for the tests like JSON files for the requests and JSON schemas to validate them

Using the `config.toml` file some parameters can be configured:

- the log_level for the tests can be adjusted. The values supported are: DEBUG, INFO, WARNING, ERROR, CRITICAL
- some endpoint parameters like the MB-SMF address, the protocol (HTTP or HTTPS) and the port being used

The file `tests.py` contains the main logic for the tests. In this file the test suites are defined and run by the
unittest testing framework.

## Detailed Instructions

### Inspect all the traffic being sent in the network

You can use `tcpdump`/`Wireshark` to sniff all the messages being sent between the Network Functions by inspecting
the `br-5g-mag` network bridge. This bridge is created by the Docker Compose network and is used to connect all the
Network Functions.

```bash
$ tcpdump -i br-5g-mag
```

### Connect to the AF/AS container to start sending requests to the Network Functions

The container named `test_mbs_af_as` is not a real Application Function or Application Server; it is a helper container used to send `curl` requests to the Open5GS APIs, standing in for an MBS Application Provider (AF/AS).

```bash
# Connect to the AF/AS container
docker exec -it test_mbs_af_as bash
```

Use curl inside the container to send requests to the other Network Functions:

```bash
# Inside the AF/AS container, example of the AF/AS sending the MB-SMF the TMGI allocate request
curl --http2-prior-knowledge \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{ "tmgiNumber": 1 }' \
  smf-mb-smf.5g-mag.org:80/nmbsmf-tmgi/v1/tmgi
```

### Configure the MB-UPF multicast

Apart from editing the `.env` for the MB-UPF to be reachable by external gNBs, the MB-UPF needs extra configuration. To
be able to detect the multicast traffic being sent and forward it to the lower layer source specific multicast (LLSSM)
address, the MB-UPF needs to update the multicast forwarding cache (MFC) in the linux kernel.

For this purpose, the `smcroute` tool is installed on the MB-UPF container. Through the `smcroutectl` command, the MFC
can be updated to the desired values. Currently this is done manually but other ways to update the MFC are being
studied.

```bash
# Execute this command inside the MB-UPF container
smcroutectl add eth0 <n6mb_ip_multicast_destination_address> ogstun
```

After this, and after creating the MBS Session, the project can be tested by using the AF/AS to send multicast traffic
to the MB-UPF and inspecting the MB-UPF output:

```bash
# Execute this command inside the AF/AS container
sendip -p ipv4 -is <af_as_container_ip> -id <n6mb_ip_multicast_destination_address> <mb_upf_container_ip>
```

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have the MBS-capable 5G Core running as Docker containers.</strong> The MBS Session is created and multicast traffic is flowing from the AF/AS through the MB-UPF, visible with `smcroutectl` and `tcpdump`.</div>
</div>

## Next steps

- [Initial support of MBS in the 5GC](./mbs-in-5gc): walk through creating an MBS session and observing multicast traffic through the core.
- [Managing MBS Sessions and TMGIs](./managing-mbs-sessions-tmgi): the MB-SMF session and TMGI operations used above.
- [Tutorials index](.): the full set of MBS tutorials.

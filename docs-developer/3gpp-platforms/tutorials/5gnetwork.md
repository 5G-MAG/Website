---
title: 5G Network & COTS UE
hide_title: true
sidebar_position: 1
description: Step-by-step tutorial for building a private 5G network with Open5GS and srsRAN, and connecting a commercial off-the-shelf Android phone.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M20 21l2 -2l-2 -2" />
  <path d="M17 17l-2 2l2 2" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">3GPP RAN and Core Platforms</span>
<h1>5G Network with Open5GS, srsRAN and COTS UE</h1>
</div>
</div>

## Introduction

These are the generic instructions to set up a 5G network using Open5GS (the 5G Core) and srsRAN (the gNodeB / radio access network). An Ettus X310 USRP and a Pixel 8 phone are used. The phone is a Commercial Off-The-Shelf User Equipment (COTS UE), that is, an ordinary unmodified handset.

**What you will build:** your own private 5G network that a real phone attaches to and uses to reach the internet.

### Steps at a glance

1. Install and configure the 5G Core (Open5GS).
2. Install and configure the gNodeB (srsRAN).
3. Run both the Core and the gNodeB.
4. Register the phone's SIM as a subscriber.
5. Connect the phone and confirm it attaches.

## Components

This private 5G network is built from two software components, connected to a commercial phone:

<div class="repo-list">
<a class="repo-card repo-card--inline" href="https://open5gs.org/open5gs/docs/guide/01-quickstart/">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3" /><path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" /><path d="M7 8l0 .01" /><path d="M7 16l0 .01" /></svg>Open5GS</span>
<span class="repo-card__role">5G Core network functions (AMF, SMF, UPF, NRF and more).</span>
</a>
<a class="repo-card repo-card--inline" href="https://docs.srsran.com/projects/project/en/latest/user_manuals/source/installation.html">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4v8" /><path d="M16 4.5v7" /><path d="M12 5v16" /><path d="M8 5.5v5" /><path d="M4 6v4" /><path d="M20 8h-16" /></svg>srsRAN</span>
<span class="repo-card__role">gNodeB / radio access network software driving the SDR.</span>
</a>
</div>

## Prerequisites

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" /></svg>Host machine running Ubuntu</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -12" /><path d="M9 9h6v6h-6l0 -6" /><path d="M3 10h2" /><path d="M3 14h2" /><path d="M10 3v2" /><path d="M14 3v2" /><path d="M21 10h-2" /><path d="M21 14h-2" /><path d="M14 21v-2" /><path d="M10 21v-2" /></svg>UHD SDR like Ettus X310 USRP</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v16l-6 -4l-6 4z" /></svg>Android Pixel 8 phone</span>
</div>

Note that other Android devices which we have not tested may work too. For details check
the [srsRAN documentation](https://docs.srsran.com/projects/project/en/latest/knowledge_base/source/cots_ues/source/index.html#cots-ues).

## 5G Core installation and configuration

<a class="repo-card repo-card--inline" href="https://open5gs.org/open5gs/docs/guide/01-quickstart/">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3" /><path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" /><path d="M7 8l0 .01" /><path d="M7 16l0 .01" /></svg>Open5GS Quickstart guide</span>
<span class="repo-card__role">Follow the installation procedures here before continuing below.</span>
</a>

For the **config** files go to: `/etc/open5gs/*.yaml`

For the **logs** go to: `/var/log/open5gs/*.log`

The Open5GS Subscriber portal is located in: `http://localhost:9999` (by default admin:1423 as user:password)

### Step 1: Install the 5G Core (Open5GS)

We recommend installing for Ubuntu 24.04 with the following instructions:

#### Getting MongoDB

Import the public key used by the package management system:

```bash
sudo apt update
sudo apt install gnupg
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
```

Create the list file /etc/apt/sources.list.d/mongodb-org-6.0.list.

For Ubuntu 24.04 (noble):

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
```

For Ubuntu 22.04 (jammy):

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
```

Install the MongoDB packages.

```bash
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod (if '/usr/bin/mongod' is not running)
sudo systemctl enable mongod (ensure to automatically start it on system boot)
```

#### Install Open5GS

```bash
sudo add-apt-repository ppa:open5gs/latest
sudo apt update
sudo apt install open5gs
```

#### Install the WebUI of Open5GS

The WebUI allows you to interactively edit subscriber data. Node.js is required to install the WebUI of Open5GS:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt update
sudo apt install nodejs -y

curl -fsSL https://open5gs.org/open5gs/assets/webui/install | sudo -E bash -
```

### Step 2: Configure the 5G Core (Open5GS)

#### IP:port addresses

The default configurations see all of the Open5GS components fully configured for use on a single computer using the
local loopback address space (127.0.0.X). The block below is the full Open5GS default address map; for this 5G setup you only edit the AMF and NRF (and use the WebUI). The MME, SGWC, SGWU, HSS and PCRF entries belong to the 4G EPC and are not used here.

```
MongoDB   = 127.0.0.1 (subscriber data) - http://localhost:9999

MME-s1ap  = 127.0.0.2 :36412 for S1-MME
MME-gtpc  = 127.0.0.2 :2123 for S11
MME-frDi  = 127.0.0.2 :3868 for S6a

SGWC-gtpc = 127.0.0.3 :2123 for S11
SGWC-pfcp = 127.0.0.3 :8805 for Sxa

SMF-gtpc  = 127.0.0.4 :2123 for S5c
SMF-gtpu  = 127.0.0.4 :2152 for N4u (Sxu)
SMF-pfcp  = 127.0.0.4 :8805 for N4 (Sxb)
SMF-frDi  = 127.0.0.4 :3868 for Gx auth
SMF-sbi   = 127.0.0.4 :7777 for 5G SBI (N7,N10,N11)

AMF-ngap  = 127.0.0.5 :38412 for N2
AMF-sbi   = 127.0.0.5 :7777 for 5G SBI (N8,N12,N11)

SGWU-pfcp = 127.0.0.6 :8805 for Sxa
SGWU-gtpu = 127.0.0.6 :2152 for S1-U, S5u

UPF-pfcp  = 127.0.0.7 :8805 for N4 (Sxb)
UPF-gtpu  = 127.0.0.7 :2152 for S5u, N3, N4u (Sxu)

HSS-frDi  = 127.0.0.8 :3868 for S6a, Cx

PCRF-frDi = 127.0.0.9 :3868 for Gx

NRF-sbi   = 127.0.0.10:7777 for 5G SBI
SCP-sbi   = 127.0.0.200:7777 for 5G SBI
SEPP-sbi  = 127.0.0.250:7777 for 5G SBI
SEPP-n32  = 127.0.0.251:7777 for 5G N32
SEPP-n32f = 127.0.0.252:7777 for 5G N32-f
AUSF-sbi  = 127.0.0.11:7777 for 5G SBI
UDM-sbi   = 127.0.0.12:7777 for 5G SBI
PCF-sbi   = 127.0.0.13:7777 for 5G SBI
NSSF-sbi  = 127.0.0.14:7777 for 5G SBI
BSF-sbi   = 127.0.0.15:7777 for 5G SBI
UDR-sbi   = 127.0.0.20:7777 for 5G SBI
```

#### PLMN ID and TAC information

Our setup will be using PLMN ID (MCC/MNC) 001/01 and TAC 7. 5GC and gNodeB will be running in the same machine (we use the default binding addresses). This information needs to be loaded into the NRF and AMF
config files (and the gNB).

A short glossary of the identifiers used here:

* **PLMN ID (Public Land Mobile Network Identifier)** identifies the operator's network. It is made of the **MCC (Mobile Country Code)** and **MNC (Mobile Network Code)**; here 001/01 is a reserved test value.
* **TAC (Tracking Area Code)** identifies the tracking area within the network; here 7.
* **S-NSSAI (Single Network Slice Selection Assistance Information)** identifies a network slice; its **SST (Slice/Service Type)** here is 1.

:::warning[Values must match across all components]
The same PLMN (001/01) and TAC (7) must be configured identically in the NRF config, the AMF config, the gNodeB config, and the SIM card. A mismatch here is the most common reason a phone fails to attach.
:::

Modify `/etc/open5gs/nrf.yaml` to set the Serving PLMN ID:

```yaml
nrf:
  serving:  # 5G roaming requires PLMN in NRF
    - plmn_id:
        mcc: 001
        mnc: 01
  sbi:
    server:
      - address: 127.0.0.10
        port: 7777
```

Modify `/etc/open5gs/amf.yaml` to set the PLMN ID and TAC:

```yaml
amf:
  sbi:
    server:
      - address: 127.0.0.5
        port: 7777
    client:
#      nrf:
#        - uri: http://127.0.0.10:7777
      scp:
        - uri: http://127.0.0.200:7777
  ngap:
    server:
      - address: 127.0.0.5
  metrics:
    server:
      - address: 127.0.0.5
        port: 9090
  guami:
    - plmn_id:
        mcc: 001
        mnc: 01
      amf_id:
        region: 2
        set: 1
  tai:
    - plmn_id:
        mcc: 001
        mnc: 01
      tac: 7
  plmn_support:
    - plmn_id:
        mcc: 001
        mnc: 01
      s_nssai:
        - sst: 1
  security:
    integrity_order : [ NIA2, NIA1, NIA0 ]
    ciphering_order : [ NEA0, NEA1, NEA2 ]
  network_name:
    full: 5G-MAG
    short: 5G-MAG
```

After changing config files, please restart Open5GS daemons.

```bash
sudo systemctl restart open5gs-nrfd
sudo systemctl restart open5gs-amfd
```

#### Adding a route for the UE to have WAN connectivity

In order to bridge between the PGWU/UPF and WAN (Internet), you must enable IP forwarding and add a NAT rule to your IP
Tables.

To enable forwarding and add the NAT rule, enter:

Enable IPv4/IPv6 Forwarding

```bash
sudo sysctl -w net.ipv4.ip_forward=1
sudo sysctl -w net.ipv6.conf.all.forwarding=1
```

Add NAT Rule

```bash
sudo iptables -t nat -A POSTROUTING -s 10.45.0.0/16 ! -o ogstun -j MASQUERADE
sudo ip6tables -t nat -A POSTROUTING -s 2001:db8:cafe::/48 ! -o ogstun -j MASQUERADE
```

Configure the firewall correctly. Some operating systems (Ubuntu) by default enable firewall rules to block traffic.

```bash
sudo ufw disable
```

## gNB installation and configuration

<a class="repo-card repo-card--inline" href="https://docs.srsran.com/projects/project/en/latest/user_manuals/source/installation.html">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4v8" /><path d="M16 4.5v7" /><path d="M12 5v16" /><path d="M8 5.5v5" /><path d="M4 6v4" /><path d="M20 8h-16" /></svg>srsRAN installation guide</span>
<span class="repo-card__role">Follow the installation procedures here before continuing below.</span>
</a>

### Step 1: Install the gNB (srsRAN)

Install dependencies

```bash
sudo apt-get install cmake make gcc g++ pkg-config libfftw3-dev libmbedtls-dev libsctp-dev libyaml-cpp-dev libgtest-dev
```

Install UHD drivers (e.g. for Ettus USRP). More information at the Ettus [website](https://files.ettus.com/manual/page_build_guide.html).

```bash
sudo add-apt-repository ppa:ettusresearch/uhd
sudo apt-get update
sudo apt-get install libuhd-dev uhd-host
```

Download the srsRAN Project packages. If there are no packages for your Ubuntu version, a manual build would be required.

```bash
sudo add-apt-repository ppa:softwareradiosystems/srsran-project
sudo apt-get update
sudo apt-get install srsran-project -y
```

### Step 2: Configure the gNB (srsRAN)

#### Prepare the system

Before running srsRAN Project applications, we recommend tuning your system for best performance:

```bash
sudo ./scripts/srsran_performance
```

#### Configuration files

When installed from packages, srsRAN Project example configs can be found in `/usr/share/srsran`.

We've created the following 5gmag_example.yml. We recommend finding the value ARFCN through
this [link](https://5g-tools.com/5g-nr-arfcn-calculator/).

```yaml
# This example configuration outlines how to configure the srsRAN Project gNB to create a single TDD cell
# transmitting in band 77, with 10 MHz bandwidth and 30 kHz sub-carrier-spacing. A USRP N310 is configured
# as the RF frontend using split 8. Note in this example the internal clock of the N310 is used.

cu_cp:
  amf:
    addr: 127.0.0.5
    port: 38412
    bind_addr: 127.0.1.5
    supported_tracking_areas:
      - tac: 7
        plmn_list:
          - plmn: "00101"
            tai_slice_support_list:
              - sst: 1

ru_sdr:
  device_driver: uhd
  device_args: send_frame_size=1472,recv_frame_size=1472,type=x300
  clock: internal
  sync: internal
  srate: 15.36
  tx_gain: 20
  rx_gain: 20

cell_cfg:
  dl_arfcn: 653668
  band: 77
  channel_bandwidth_MHz: 10
  common_scs: 30
  plmn: "00101"
  tac: 7
  pci: 1

  pucch:
    nof_ue_res_harq_per_set: 2
    f0_or_f1_nof_cell_res_sr: 2
    f2_or_f3_or_f4_nof_cell_res_csi: 2

log:
  filename: /tmp/gnb.log
  all_level: info

pcap:
  mac_enable: false
  mac_filename: /tmp/gnb_mac.pcap
  ngap_enable: false
  ngap_filename: /tmp/gnb_ngap.pcap
```

### Optional: Adding an external GPS reference clock

Ideally the USRPs should be connected to a 10 MHz external reference clock or GPSDO, although this is not a strict
requirement. In our tests, many COTS UEs were only able to connect to the gNB when using an external reference
clock. If this is the case, we recommend using the [Leo Bodnar GPSDO](https://www.leobodnar.com/shop/index.php?main_page=product_info&cPath=107&products_id=234)
for that purpose.

To configure the Leo Bodnar GPSDO follow
the [How to Use instructions](https://www.leobodnar.com/shop/index.php?main_page=product_info&cPath=107&products_id=234)
on the website. If the configuration is done on macOS, the configuration software looks like this:

![5G Core: Leo Bodnar](/assets/images/5gcore/leo-bodnar-config.jpeg)

After the GPS signal is locked connect output of the reference clock to your USRP device. For that reason, connect the output plug
of the reference clock to the `REF IN` connector on the USRP.

Finally adjust the configuration of the srsRAN Project gNB to use an external clock reference:

````yaml
ru_sdr:
  device_driver: uhd                  # The RF driver name.
  device_args: send_frame_size=1472,recv_frame_size=1472,type=x300              # Optionally pass arguments to the selected RF driver.
  clock: external                     # Specify the clock source used by the RF.
  srate: 15.36                        # RF sample rate might need to be adjusted according to selected bandwidth.
  tx_gain: 20                         # Transmit gain of the RF might need to adjusted to the given situation.
  rx_gain: 20                         # Receive gain of the RF might need to adjusted to the given situation.
````

## Running the 5G Core (Open5GS)

When you install the software using the package manager, it is setup to run as a systemd service.

Expected result: the Open5GS daemons are running under systemd; you can confirm the AMF is up before starting the gNodeB, for example with `sudo systemctl status open5gs-amfd`.

## Running the gNB (srsRAN)

Run the gNB as follows, passing the YAML configuration file:

`sudo ./gnb -c 5gmag_example.yml`

Expected result: the gNodeB starts, connects to the AMF over N2, and logs that the cell is active. If it does not connect, check that the PLMN and TAC match the AMF config (see the callout above) and review the 5G Core logs.

## Configure the COTS UE

### Register Subscriber Information

Connect to http://localhost:9999 and login with admin account.
Username : admin
Password : 1423

To add subscriber information, you can do WebUI operations in the following order:

    Go to Subscriber Menu.
    Click + Button to add a new subscriber.
    Fill the IMSI, security context(K, OPc, AMF), and APN of the subscriber.
    Click SAVE Button

The subscriber fields come from your SIM card's provisioning data:

* **IMSI (International Mobile Subscriber Identity)**: the subscriber's unique identifier.
* **K** and **OPc**: the authentication keys.
* **AMF** here means the SIM **Authentication Management Field**, a 16-bit value used in authentication. This is not the same as the network AMF (Access and Mobility Management Function) configured earlier.
* **APN (Access Point Name)**: the data network the subscriber connects to.

Enter the subscriber details of your SIM cards using this tool, to save the subscriber profile in the HSS and UDR
MongoDB database backend.

### SIM card and APN

Insert your SIM card to the UE and set the UE’s APN to match the APN you configured in the Open5GS WebUI. We recommend
to edit the existing APN.
Toggle the UE in and out of flight mode. If it doesn’t automatically connect, try manually searching for a network. If
the PLMN set on the SIM card does not match the PLMN being used by the radio, you will need to ensure ‘data roaming’ on
the UE is switched on.

The UE should connect automatically. If you experience trouble, we recommend checking the 5G Core logs, e.g.:

```bash
sudo tail -f /var/log/open5gs/amf.log
```

Expected result: the phone attaches to your network and can reach the internet through the UPF. In the AMF log you will see the registration and PDU session establishment for the subscriber.

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have a working private 5G network.</strong> The Core, gNB and phone are all running, with the phone attached and reaching the internet through the UPF.</div>
</div>

## Next steps

* Having trouble with the radio hardware? See [SDR Platforms for srsRAN](./sdr-platforms) for installing and verifying your Software Defined Radio.
* Return to the project [Tutorials](.) or the [3GPP RAN and Core Platforms](..) overview.

---
title: Installation 5GMS AF as System Service
hide_title: true
sidebar_position: 2
description: Guide to building and installing the 5GMSd Application Function as a systemd service, including msaf-configuration stream setup.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 4v16l13 -8l-13 -8" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Media Streaming (5GMS)</span>
<h1>Installing the 5GMSd Application Function as a System Service</h1>
</div>
</div>

This guide covers building and installing the 5G Media Streaming downlink (5GMSd) Application Function (AF) as a system service, so that it is installed system-wide and managed by the operating system rather than run from your own account. Choose this approach when you are deploying a release for shared or longer-running use; for active development and testing under your own user account, follow [Installing as a Local User](./installation-local-user-5GMSAF) instead. The end state of this guide is the Application Function installed system-wide and runnable as a managed service.

**What you will build:** a system-wide installation of the 5GMSd Application Function, configured through the `msaf-configuration` utility and its stream configuration files.

## Prerequisites

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><circle cx="12" cy="16" r="1" /><path d="M8 11v-4a4 4 0 0 1 8 0v4" /></svg>sudo access required</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>Network access at build time</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="8" rx="2" /><rect x="3" y="12" width="18" height="8" rx="2" /><path d="M7 8h.01" /><path d="M7 16h.01" /></svg>Running Application Server required</span>
</div>

- A supported Linux system with `sudo` access (the package commands below are for Ubuntu; on other distributions install the equivalent packages).
- Network access to clone the repository and fetch API files at build time.
- A running 5GMSd Application Server for the Application Function to configure (see the [rt-5gms-application-server](https://github.com/5G-MAG/rt-5gms-application-server) repository).

## Install dependencies

```bash
sudo apt install git python3-pip python3-venv python3-setuptools python3-wheel ninja-build build-essential flex bison git libsctp-dev libgnutls28-dev libgcrypt-dev libssl-dev libidn11-dev libmongoc-dev libbson-dev libyaml-dev libnghttp2-dev libmicrohttpd-dev libcurl4-gnutls-dev libnghttp2-dev libtins-dev libtalloc-dev curl wget default-jdk
sudo python3 -m pip install build meson
```

## Downloading

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-5gms-application-function/releases">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-5gms-application-function</span>
<span class="repo-card__role">Release tar files, or clone the repository directly to build from source.</span>
</a>

For example to download the latest release you can use:

```bash
cd ~
git clone --recurse-submodules https://github.com/5G-MAG/rt-5gms-application-function.git
cd rt-5gms-application-function
git submodule update
```

## Build the 5GMSd Application Function

The build process requires a working Internet connection as the API files are retrieved at build time.

To build the 5GMSd Application Function from the source:

```bash
cd ~/rt-5gms-application-function
meson build
ninja -C build
```

**Note:** Errors during the `meson build` command are often caused by missing dependencies or a network issue while trying to retrieve the API files and `openapi-generator` JAR file. See the `~/rt-5gms-application-function/build/meson-logs/meson-log.txt` log file for the errors in greater detail. Search for `generator-5gmsaf` to find the start of the API fetch sequence.

## Installing

To install the built Application Function as a system process:

```bash
cd ~/rt-5gms-application-function/build
sudo meson install --no-rebuild
```

## Running the service

Once installed, the Application Function runs under `systemd`. The commands below use `systemctl` to start, enable and check the service, and `journalctl` to view its logs.

:::warning[Confirm the service unit name]
The unit name used in the commands below is shown as `open5gs-msafd`. Confirm the exact installed unit name with the project maintainers or by listing the installed units (for example `systemctl list-units | grep msaf`) before relying on these commands.
:::

Start the service:

```bash
sudo systemctl start open5gs-msafd
```

Enable the service so that it starts automatically on boot:

```bash
sudo systemctl enable open5gs-msafd
```

Check the service status:

```bash
systemctl status open5gs-msafd
```

View the service logs (follow with `-f`):

```bash
journalctl -u open5gs-msafd -f
```

Stop the service:

```bash
sudo systemctl stop open5gs-msafd
```

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>The 5GMSd Application Function is now installed system-wide and running as a managed system service.</strong> The section below covers configuring media streams with the msaf-configuration utility.</div>
</div>

## Configuration of streams (v1.3.0 and above)

To assist with runtime configuration of the Application Function when it is started as a Systemd service, there is a utility at `/usr/local/bin/msaf-configuration`. This utility uses two configuration files at `/etc/rt-5gms/af-sync.conf` and `/etc/rt-5gms/streams.json`. The utility will also write out an `m8.json` file: the application-level data file distributed via the interface at reference point M8 to the 5GMSd-Aware Application (the media application on the client device) running on the User Equipment (UE).

### `/etc/rt-5gms/af-sync.conf` - `msaf-configuration` configuration file

This file holds some configuration parameters for the `msaf-configuration` utility.

```ini
[af-sync]
m5_authority = af.example.com:7777
docroot = /var/cache/rt-5gms/as/docroots
default_docroot = /usr/share/nginx/html
```

**m5_authority**: This should be set to the M5 address to advertise to the UE via the M8 application data object (default: 127.0.0.23:7777).
**docroot**: This is the directory path to where the Application Server will configure the document roots for each domainNameAlias configured (default: /var/cache/rt-5gms/as/docroots).
**default_docroot**: This is the directory path to the document root for the fallback virtual host offered by the Application Server (default: /usr/share/nginx/html).

The defaults for _docroot_ and _default_docroot_ should not need to be set if the Application Server is running on the same host. These may need to be changed to network filesystem shares, shared with the 5GMSd Application Server, if the AS runs on a different host.

The _m5_authority_ should be set to the external hostname and port that the Application Function M5 interface can be found at.

### `/etc/rt-5gms/streams.json` - Configuration of media streams to synchronise with the Application Function

This is a JSON file which contains the information required to configure the Provisioning Sessions and Content Hosting Configurations on the 5GMSd Application Function.

An example of this file would be:

```json
{
  "aspId": "The ASP ID to use, can be omitted",
  "appId": "The external application id to use for all provisioning sessions",
  "streams": {
    "stream-id-1": {
      "name": "Abc123 media",
      "ingestURL": "https://media.example.com/media_assets/abc123/",
      "distributionConfigurations": [
        {
          "domainNameAlias": "as.example.com",
          "entryPoint": {
            "relativePath": "manifest.mpd",
            "contentType": "application/dash+xml",
            "profiles": ["urn:mpeg:dash:profile:isoff-on-demand:2011"]
          }
        },
        {
          "domainNameAlias": "as.example.com",
          "entryPoint": {
            "relativePath": "manifest.m3u8",
            "contentType": "application/vnd.apple.mpegurl"
          }
        }
      ],
      "consumptionReporting": {
        "reportingInterval": 30,
        "samplePercentage": 50.0,
        "locationReporting": true,
        "accessReporting": true
      },
      "policies": [
        {
          "externalReference": "pol-ext-1",
          "applicationSessionContext": {
            "sliceInfo": { "sst": 1, "sd": "000001" },
            "dnn": "internet"
          },
          "qoSSpecification": {
            "qosReference": "qosRef1",
            "maxAuthBtrUl": "10 Mbps",
            "maxAuthBtrDl": "1 Gbps",
            "defPacketLossRateUl": 0,
            "defPacketLossRateDl": 5
          },
          "chargingSpecification": {
            "sponId": "sponsorIdentity1",
            "sponStatus": "SPONSOR_ENABLED",
            "gpsi": ["msimsi-447000123456", "msimsi-447000654321"]
          }
        },
        {
          "externalReference": "pol-ext-2",
          "qoSSpecification": {
            "maxAuthBtrUl": "100 Mbps",
            "maxAuthBtrDl": "2 Gbps"
          }
        }
      ]
    },
    "stream-id-2": {
      "name": "VOD service",
      "ingestURL": "https://media.example.com/media_assets/",
      "distributionConfigurations": [
        {
          "domainNameAlias": "as.example.com"
        },
        {
          "domainNameAlias": "as.example.com",
          "certificateId": "cert1"
        }
      ]
    }
  },
  "vodMedia": [
    {
      "name": "Def456 VOD Media",
      "stream": "stream-id-2",
      "entryPoints": [
        {
          "relativePath": "def456/manifest.mpd",
          "contentType": "application/dash+xml",
          "profiles": ["urn:mpeg:dash:profile:isoff-live:2011"]
        },
        {
          "relativePath": "def456/manifest.m3u8",
          "contentType": "application/vnd.apple.mpegurl"
        }
      ]
    },
    {
      "name": "Ghi789 VOD Media",
      "stream": "stream-id-2",
      "entryPoints": [
        {
          "relativePath": "ghi789/manifest.mpd",
          "contentType": "application/dash+xml",
          "profiles": ["urn:mpeg:dash:profile:isoff-live:2011"]
        },
        {
          "relativePath": "ghi789/manifest.m3u8",
          "contentType": "application/vnd.apple.mpegurl"
        }
      ]
    }
  ]
}
```

The format is a JSON object which has the following fields:

- **aspId** - The Application Service Provider ID to provide when creating Provisioning Sessions.
- **appId** - The external application ID to use when creating Provisioning Sessions.
- **streams** - A description of the streams to configure, each in its own Provisioning Session.
  - Each stream is identified in the configuration file by a unique identifier so that it may be referenced in the _vodMedia_ field.
  - The value for each stream contains the following fields:
    - **name** - The name of the stream that will be configured in the ContentHostingConfiguration
    - **ingestURL** - The base URL for media ingest from the media origin.
    - **distributionConfigurations** - The array of distribution configurations that can appear in the ContentHostingConfiguration.
      - See [TS 26.512](https://www.3gpp.org/dynareport/26512.htm) for details of the format for this field.
      - Any **certificateId** fields given in a distribution configuration will cause a certificate to be generated and the real certificate id will be substituted. Where the same certificate id is used for multiple entries in the _distributionConfigurations_, the same real certificate id will be substituted and that certificate only generated once.
      - If an **entryPoint** field appears in any distribution configuration, then the M8 data file will contain an entry for this media and will use the _name_ field for the stream as the media name and will only the include the Provisioning Session ID. The UE will be expected to consult the M5 interface for the entry point via the Service Access Information.
      - If there are no *entryPoint*s then it is expected that the stream will be referenced from the _vodMedia_ array in this configuration file.
    - **consumptionReporting** - The optional consumption reporting configuration for the provisioning session.
      - See TS 26.512 for details of this configuration.
      - If this item is present then consumption reporting will be configured for the provisioning session.
      - If this is an empty structure then consumption reporting is enabled for all clients using a single report at the end of the media playback.
      - If the **reportingInterval** is given then the client will send a consumption report every **reportingInterval** seconds.
      - If the **samplePercentage** is given this represents the percentage probability that a client will send consumption reports. At the start of the session the client determines a random number between 0 and 100 and if the value is less than or equal to this field value then the client will send reports for the session. If this field is not given then all clients will send reports.
      - If the **locationReporting** field is present and is `true` then consumption reports will include UE location information.
      - If the **accessReporting** field is present and is `true` then consumption reports will contain access information too.
    - **policies** - The optional list of dynamic policy templates available for this stream.
      - See TS 26.512 for details of PolicyTemplate configurations.
      - If this item is present and has at least one entry then dynamic policies will be advertised to the clients for the provisioning session.
      - Each object in the list must have an `externalReference` property, all other properties are optional.
- **vodMedia** - Array of media asset objects to advertise directly in the `m8.json` M8 interface data file.
  - Each entry will create a media entry in the M8 data file which will have 1 or more entry points associated with it.
  - Each media asset in the array contains the following fields:
    - **name** - The name to use for the media name in the M8 data file media entry.
    - **stream** - A reference to a stream defined in the _streams_ map in this configuration file.
      - This is used to find the provisioning session id and distribution points for the stream.
    - **entryPoints** - An array of relative entry points for the media assets.
      - Each entry takes the same format as the _streams.distributionConfigurations.entryPoint_.
  - Entry points for the media asset written to the M8 data file are absolute URLs and are derived from the _entryPoints_ fields combined with each entry in _stream.distributionConfigurations_.

The following table summarises what the example above produces for each stream, in terms of the M5 Service Access Information entry points advertised to clients and the entries written to the M8 data file. The paragraphs after it explain the derivation in full.

| Stream                         | M5 entries                                           | M8 entries                                                                                                                          |
| ------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `stream-id-1` ("Abc123 media") | Two entry points (DASH over HTTP and HLS over HTTP). | One media asset with a provisioning session id and no entry points.                                                                 |
| `stream-id-2` ("VOD service")  | No entry points listed.                              | Two media assets ("Def456" and "Ghi789"), each with four entry points (DASH/HLS over HTTP/HTTPS) derived from the `vodMedia` array. |

In the example above there are two Provisioning Sessions which will be configured in the running Application Function.

The first, _stream-id-1_, is for a single media asset. This will result in the M8 data file containing an entry for the "Abc123 media" media asset which has no entry points, just a provisioning session Id. The M5 Service Access Information for this provisioning session will contain the two entry points defined, one for the DASH stream and one for the HLS stream both available using the HTTP protocol (no "certificateId" present). This stream will also request that half the clients submit consumption reports every 30 seconds which contain both location and access information. There will also be two dynamic policies advertised as available for use with this stream.

The second, _stream-id-2_, will create a Provisioning Session which acts as a VOD entry point for multiple streams advertised via M8. There are two distribution points for this provisioning session, one HTTP and the other HTTPS. The M5 Service Access Information will have no entryPoints listed. The M8 data file entries using this provisioning session id will be derived from the _vodMedia_ entries which reference stream _stream-id-2_.

The _vodMedia_ array contains two media assets which will be listed in the M8 data file using the _name_ from the _vodMedia_ entry and the Provisioning session Id of the provisioning session created for _stream-id-2_ in the _streams_ section above. Each entry will list the entryPoints for each of the _entryPoints_ defined for the media asset combined with each of the distribution points from the provisioning session for _stream-id-2_. Therefore, in the M8 data file, there will be 4 entry points for "Def456 VOD Media": DASH over HTTP, DASH over HTTPS, HLS over HTTP and HLS over HTTPS; and a similar 4 entry points for the "Ghi789 VOD Media".

The M8 data file generated from the example above will have 3 media assets, the first for "Abc123" will just have a provisioning session id and the other two, "Def456" and "Ghi789", will both contain the same provisioning session id but will have 4 different entry points each for the combinations of DASH/HLS and HTTP/HTTPS.

## Next steps

- Review the settings on the [Configuring the Application Function](./configuration-5GMSAF) page.
- Exercise the interfaces with the testing tutorials: [M1](./testing-m1-v120), [M3](./testing-m3-v110) and [M5](./testing-m5-v100) (choose the page matching your installed version).

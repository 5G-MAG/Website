---
title:  MBMS Service Announcement Files
hide_title: true
sidebar_position: 0
---

<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  <path d="M16.616 13.924a5 5 0 1 0 -9.23 0" />
  <path d="M20.307 15.469a9 9 0 1 0 -16.615 0" />
  <path d="M9 21l3 -9l3 9" />
  <path d="M10 19h4" /></svg>
<h1>MBMS Service Announcement Files</h1>
</div>

## Overview

The `ServiceAnnouncement(SA)` file, also referred to as `bootstrap.multipart` in the context of Reference Tools, contains the information a receiver needs to find and play the available broadcast and unicast streams. The middleware (`rt-mbms-mw`) reads it at startup. The Reference Tools support three main formats. The target format needs to be configured before starting the `rt-mbms-mw` process, as automated format detection at runtime is currently not supported.

Examples of the different SA formats can be found in the [rt-common-shared project](https://github.com/5G-MAG/rt-common-shared/tree/feature/mbms/mbms/bootstrap_examples).

The three formats below share the same overall structure (an envelope, an SDP session description, HLS playlists, a user service description and a schedule); they differ mainly in the MIME boundary string and in how the broadcast and unicast base patterns are written. You do not need to compare the full XML blocks line by line; the notes on each format point out what is specific to it.

### Recurring terms

* **TMGI**: Temporary Mobile Group Identity, the identifier of a broadcast service (for example `0x1009f165`).
* **USD**: User Service Description, the metadata describing a service and how to access it.
* **SDP**: Session Description Protocol, describing the media session (addresses, ports, codecs).
* **FLUTE**: File Delivery over Unidirectional Transport, the protocol used to deliver files one-way over broadcast.
* **TSI**: Transport Session Identifier, identifying a FLUTE session (`flute-tsi` in the SDP).

### Choosing a format

Use the table below to pick the `bootstrap_format` value that matches your use case, and the matching example file.

| Use case | `bootstrap_format` value | Example file |
|---|---|---|
| Original seamless-switching implementation (ORS / Rohde&Schwarz) | `default` | see the Default format below |
| Seamless switching as agreed in 5G-MAG | `5gmag_bc_uc` | `bootstrap.multipart.seamlessswitching.hls.5gmag` |
| Playing the 5G-MAG sample recordings | `5gmag_legacy` | see the 5G-MAG Legacy format below |
| Local service announcement (see the [Configuration of Service Announcement](../../tutorials/configuration-guide) tutorial) | empty (`""`) | pointed to via `local_service.bootstrap_file` |

An empty `bootstrap_format` (`""`) means no format is preselected. This is the intended setting only for the local-service case, where the middleware is started directly with a local SA file rather than receiving one over the air.

## Configuration of the format
The target format can directly be set in `/etc/5gmag-rt.conf` file:

```` 
mw: {
    bootstrap_format: ""
}
````

Possible values are:
* `default`: Format used for the original implementation of seamless switching
* `5gmag_bc_uc`: Format agreed on by 5G-MAG while reviewing the `default` format
* `5gmag_legacy`: Format used for the sample recordings

## Default format
The default format is the one that was used for the original seamless switching implementation implemented in close coordination between ORS and Rohde&Schwarz. The full example file follows; the broadcast and unicast HLS playlists are referenced with absolute `file:///` and `http://localhost` base patterns.

````
MIME-Version: 1.0
Content-Type: multipart/related; boundary="++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--"; type="application/mbms-envelope+xml"
Content-Description: LTE MBMS Service Announcement

--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/mbms-envelope+xml 
Content-Transfer-Encoding: 7bit
Content-Location: file:///envelope.xml

<?xml version="1.0" encoding="utf-8"?>
<metadataEnvelope xmlns="urn:3gpp:metadata:2005:MBMS:envelope"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="urn:3gpp:metadata:2005:MBMS:envelope MetadataEnvelope.xsd">  
  <item contentType="application/sdp"
        metadataURI="file:///TMGI-0x1009f165.sdp"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>  
  <item contentType="application/vnd.apple.mpegurl"
        metadataURI="file:///TMGI-0x1009f165.m3u8"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>  
  <item contentType="application/vnd.apple.mpegurl"
        metadataURI="http://localhost:3333/watchfolder/hls/manifest.m3u8"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>  
  <item contentType="application/mbms-user-service-description+xml"
        metadataURI="file:///usdBundle.xml"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>  
  <item contentType="application/mbms-schedule+xml"
        metadataURI="file:///TMGI-0x1009f165schedule.xml"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>
</metadataEnvelope>
--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/sdp
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165.sdp

v=0
o=ROHDE-SCHWARZ-BSCC 269087077 1634036383 IN IP4 11.11.11.11
s=HLS Streaming Session 0x1009f165
i=File Download Session
t=3843025183 4789105183
a=mbms-mode:broadcast-mbsfn 269087077
c=IN IP4 238.1.1.111/127
b=AS:2000
m=application 40101 FLUTE/UDP 0
a=flute-tsi:0
a=flute-ch:1
a=3GPP-QoE-Metrics:metrics={Object_Loss};rate=null;resolution=10
a=3GPP-QoE-Metrics:metrics={Network_Resource};rate=null;resolution=10

--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/vnd.apple.mpegurl
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165.m3u8

#EXTM3U
#EXT-X-VERSION:6
#EXT-X-STREAM-INF:BANDWIDTH=2305600,RESOLUTION=1280x720,FRAME-RATE=25.000,CODECS="avc1.64001f,mp4a.40.2"
stream_0.m3u8

--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/vnd.apple.mpegurl
Content-Transfer-Encoding: 7bit
Content-Location: http://localhost:3333/watchfolder/hls/manifest.m3u8

#EXTM3U
#EXT-X-VERSION:6
#EXT-X-STREAM-INF:BANDWIDTH=2305600,RESOLUTION=1280x720,FRAME-RATE=25.000,CODECS="avc1.64001f,mp4a.40.2"
stream_0.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1205600,RESOLUTION=960x540,FRAME-RATE=25.000,CODECS="avc1.64001f,mp4a.40.2"
stream_1.m3u8


--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/mbms-user-service-description+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///usdBundle.xml

<?xml version="1.0" encoding="utf-8"?>
<bundleDescription xmlns="urn:3GPP:metadata:2005:MBMS:userServiceDescription"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:sv="urn:3gpp:metadata:2009:MBMS:schemaVersion"
                   xmlns:r7="urn:3GPP:metadata:2007:MBMS:userServiceDescription"
                   xmlns:r8="urn:3GPP:metadata:2008:MBMS:userServiceDescription"
                   xmlns:r9="urn:3GPP:metadata:2009:MBMS:userServiceDescription"
                   xmlns:r12="urn:3GPP:metadata:2013:MBMS:userServiceDescription"
                   xmlns:r14="urn:3GPP:metadata:2017:MBMS:userServiceDescription"
                   xmlns:r15="urn:3GPP:metadata:2018:r15:MBMS:userServiceDescription"
                   xsi:schemaLocation="urn:3GPP:metadata:2005:MBMS:userServiceDescription USD-schema-main.xsd">  
  <sv:schemaVersion>1</sv:schemaVersion>  
  <userServiceDescription serviceId="urn:3gpp:rsservice1"
                          r7:serviceClass="urn:oma:bcast:ext_bsc_3gpp:bscc:rsservice1"
                          r14:romService="true">
    <name lang="EN-GB">BSCC Service1</name>
    <name lang="DE-DE">BSCC Dienst1</name>
    <serviceLanguage>EN-GB</serviceLanguage>
    <serviceLanguage>DE-DE</serviceLanguage>
    <requiredCapabilities>
      <feature>23</feature>
      <feature>27</feature>
    </requiredCapabilities>
    <deliveryMethod sessionDescriptionURI="file:///TMGI-0x1009f165.sdp">
      <sv:delimiter>0</sv:delimiter>
      <r12:broadcastAppService>
        <r12:basePattern>file:///TMGI-0x1009f165.m3u8</r12:basePattern>
        <r12:serviceArea>2</r12:serviceArea>
      </r12:broadcastAppService>
      <r12:unicastAppService>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_0.m3u8</r12:basePattern>
      </r12:unicastAppService>
      <sv:delimiter>0</sv:delimiter>
    </deliveryMethod>
    <r12:appService appServiceDescriptionURI="http://localhost:3333/watchfolder/hls/manifest.m3u8"
                    mimeType="application/vnd.apple.mpegurl">
      <r12:alternativeContent>
        <r12:basePattern>file:///TMGI-0x1009f165.m3u8</r12:basePattern>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_1.m3u8</r12:basePattern>
      </r12:alternativeContent>
      <r12:identicalContent>
        <r12:basePattern>file:///TMGI-0x1009f165.m3u8</r12:basePattern>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_0.m3u8</r12:basePattern>
      </r12:identicalContent>
    </r12:appService>
    <r9:schedule>
      <r9:scheduleDescriptionURI>file:///TMGI-0x1009f165schedule.xml</r9:scheduleDescriptionURI>
    </r9:schedule>
    <sv:delimiter>0</sv:delimiter>
    <r9:availabilityInfo>
      <r9:infoBinding>
        <r9:serviceArea>2</r9:serviceArea>
      </r9:infoBinding>
    </r9:availabilityInfo>
  </userServiceDescription>
</bundleDescription>
--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/mbms-schedule+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165schedule.xml

<?xml version="1.0" encoding="utf-8"?>
<scheduleDescription xmlns="urn:3gpp:metadata:2011:MBMS:scheduleDescription"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:sv="urn:3gpp:metadata:2009:MBMS:schemaVersion"
                     xsi:schemaLocation="urn:3gpp:metadata:2011:MBMS:scheduleDescription ScheduleDescription.xsd"
                     scheduleUpdate="2021-10-12T10:59:43Z">  
  <sv:schemaVersion>1</sv:schemaVersion>  
  <serviceSchedule>
    <sessionSchedule>
      <start>2021-10-12T10:59:43Z</start>
      <stop>2051-10-05T10:59:43Z</stop>
      <index>0</index>
      <sv:delimiter>0</sv:delimiter>
      <sv:delimiter>0</sv:delimiter>
    </sessionSchedule>
  </serviceSchedule>
</scheduleDescription>
--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
````


## 5G-MAG BC_UC format
This format represents a revised version of the default format. The main difference from the default format is that the broadcast base patterns are relative (for example `stream_0.m3u8`) rather than absolute `file:///` paths, and the unicast service lists both playlist variants. The full example file follows.

```` 
MIME-Version: 1.0
Content-Type: multipart/related; boundary="++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--"; type="application/mbms-envelope+xml"
Content-Description: LTE MBMS Service Announcement

--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/mbms-envelope+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///envelope.xml

<?xml version="1.0" encoding="utf-8"?>
<metadataEnvelope xmlns="urn:3gpp:metadata:2005:MBMS:envelope"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="urn:3gpp:metadata:2005:MBMS:envelope MetadataEnvelope.xsd">
  <item contentType="application/sdp"
        metadataURI="file:///TMGI-0x1009f165.sdp"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>
  <item contentType="application/vnd.apple.mpegurl"
        metadataURI="file:///TMGI-0x1009f165.m3u8"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>
  <item contentType="application/vnd.apple.mpegurl"
        metadataURI="http://localhost:3333/watchfolder/hls/manifest.m3u8"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>
  <item contentType="application/mbms-user-service-description+xml"
        metadataURI="file:///usdBundle.xml"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>
  <item contentType="application/mbms-schedule+xml"
        metadataURI="file:///TMGI-0x1009f165schedule.xml"
        validFrom="2021-10-12T10:59:43Z"
        validUntil="2051-10-05T10:59:43Z"
        version="1"/>
</metadataEnvelope>
--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/sdp
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165.sdp

v=0
o=ROHDE-SCHWARZ-BSCC 269087077 1634036383 IN IP4 11.11.11.11
s=HLS Streaming Session 0x1009f165
i=File Download Session
t=3843025183 4789105183
a=mbms-mode:broadcast-mbsfn 269087077
c=IN IP4 238.1.1.111/127
b=AS:2000
m=application 40101 FLUTE/UDP 0
a=flute-tsi:0
a=flute-ch:1
a=3GPP-QoE-Metrics:metrics={Object_Loss};rate=null;resolution=10
a=3GPP-QoE-Metrics:metrics={Network_Resource};rate=null;resolution=10

--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/vnd.apple.mpegurl
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165.m3u8

#EXTM3U
#EXT-X-VERSION:6
#EXT-X-STREAM-INF:BANDWIDTH=2305600,RESOLUTION=1280x720,FRAME-RATE=25.000,CODECS="avc1.64001f,mp4a.40.2"
stream_0.m3u8

--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/vnd.apple.mpegurl
Content-Transfer-Encoding: 7bit
Content-Location: http://localhost:3333/watchfolder/hls/manifest.m3u8

#EXTM3U
#EXT-X-VERSION:6
#EXT-X-STREAM-INF:BANDWIDTH=2305600,RESOLUTION=1280x720,FRAME-RATE=25.000,CODECS="avc1.64001f,mp4a.40.2"
stream_0.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1205600,RESOLUTION=960x540,FRAME-RATE=25.000,CODECS="avc1.64001f,mp4a.40.2"
stream_1.m3u8


--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/mbms-user-service-description+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///usdBundle.xml

<?xml version="1.0" encoding="utf-8"?>
<bundleDescription xmlns="urn:3GPP:metadata:2005:MBMS:userServiceDescription"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:sv="urn:3gpp:metadata:2009:MBMS:schemaVersion"
                   xmlns:r7="urn:3GPP:metadata:2007:MBMS:userServiceDescription"
                   xmlns:r8="urn:3GPP:metadata:2008:MBMS:userServiceDescription"
                   xmlns:r9="urn:3GPP:metadata:2009:MBMS:userServiceDescription"
                   xmlns:r12="urn:3GPP:metadata:2013:MBMS:userServiceDescription"
                   xmlns:r14="urn:3GPP:metadata:2017:MBMS:userServiceDescription"
                   xmlns:r15="urn:3GPP:metadata:2018:r15:MBMS:userServiceDescription"
                   xsi:schemaLocation="urn:3GPP:metadata:2005:MBMS:userServiceDescription USD-schema-main.xsd">
  <sv:schemaVersion>1</sv:schemaVersion>
  <userServiceDescription serviceId="urn:3gpp:rsservice1"
                          r7:serviceClass="urn:oma:bcast:ext_bsc_3gpp:bscc:rsservice1"
                          r14:romService="true">
    <name lang="EN-GB">BSCC Service1</name>
    <name lang="DE-DE">BSCC Dienst1</name>
    <serviceLanguage>EN-GB</serviceLanguage>
    <serviceLanguage>DE-DE</serviceLanguage>
    <requiredCapabilities>
      <feature>23</feature>
      <feature>27</feature>
    </requiredCapabilities>
    <deliveryMethod sessionDescriptionURI="file:///TMGI-0x1009f165.sdp">
      <sv:delimiter>0</sv:delimiter>
      <r12:broadcastAppService>
        <r12:basePattern>stream_0.m3u8</r12:basePattern>
        <r12:serviceArea>2</r12:serviceArea>
      </r12:broadcastAppService>
      <r12:unicastAppService>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_0.m3u8</r12:basePattern>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_1.m3u8</r12:basePattern>
      </r12:unicastAppService>
      <sv:delimiter>0</sv:delimiter>
    </deliveryMethod>
    <r12:appService appServiceDescriptionURI="http://localhost:3333/watchfolder/hls/manifest.m3u8"
                    mimeType="application/vnd.apple.mpegurl">
      <r12:alternativeContent>
        <r12:basePattern>stream_0.m3u8</r12:basePattern>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_1.m3u8</r12:basePattern>
      </r12:alternativeContent>
      <r12:identicalContent>
        <r12:basePattern>stream_0.m3u8</r12:basePattern>
        <r12:basePattern>http://localhost:3333/watchfolder/hls/stream_0.m3u8</r12:basePattern>
      </r12:identicalContent>
    </r12:appService>
    <r9:schedule>
      <r9:scheduleDescriptionURI>file:///TMGI-0x1009f165schedule.xml</r9:scheduleDescriptionURI>
    </r9:schedule>
    <sv:delimiter>0</sv:delimiter>
    <r9:availabilityInfo>
      <r9:infoBinding>
        <r9:serviceArea>2</r9:serviceArea>
      </r9:infoBinding>
    </r9:availabilityInfo>
  </userServiceDescription>
</bundleDescription>
--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
Content-Type: application/mbms-schedule+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165schedule.xml

<?xml version="1.0" encoding="utf-8"?>
<scheduleDescription xmlns="urn:3gpp:metadata:2011:MBMS:scheduleDescription"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:sv="urn:3gpp:metadata:2009:MBMS:schemaVersion"
                     xsi:schemaLocation="urn:3gpp:metadata:2011:MBMS:scheduleDescription ScheduleDescription.xsd"
                     scheduleUpdate="2021-10-12T10:59:43Z">
  <sv:schemaVersion>1</sv:schemaVersion>
  <serviceSchedule>
    <sessionSchedule>
      <start>2021-10-12T10:59:43Z</start>
      <stop>2051-10-05T10:59:43Z</stop>
      <index>0</index>
      <sv:delimiter>0</sv:delimiter>
      <sv:delimiter>0</sv:delimiter>
    </sessionSchedule>
  </serviceSchedule>
</scheduleDescription>
--++++++++++++++++++++++++Rohde&Schwarz-BSCC++++++++++++++++++++++++--
````

## 5G-MAG Legacy format
5G-MAG provides multiple [sample recordings](https://github.com/5G-MAG/Documentation-and-Architecture/wiki/Sample-Files) captured and hosted by ORS. These files were recorded at the start of the project and require a specific format of the ServiceAnnouncement file. This format uses a different MIME boundary string and points the unicast service at the original ORS content server. The full example file follows.

```` 
MIME-Version: 1.0
Content-Type: multipart/related; boundary="xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--"; type="application/mbms-envelope+xml"
Content-Description: LTE MBMS Service Announcement

--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
Content-Type: application/mbms-envelope+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///envelope.xml

<?xml version="1.0" encoding="utf-8"?>
<metadataEnvelope xmlns="urn:3gpp:metadata:2005:MBMS:envelope"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="urn:3gpp:metadata:2005:MBMS:envelope MetadataEnvelope.xsd">
  <item contentType="application/sdp"
        metadataURI="file:///TMGI-0x1009f165.sdp"
        validFrom="2021-09-02T07:45:33Z"
        validUntil="2051-08-26T07:45:33Z"
        version="1"/>
  <item contentType="application/vnd.apple.mpegurl"
        metadataURI="file:///TMGI-0x1009f165.m3u8"
        validFrom="2021-09-02T07:45:33Z"
        validUntil="2051-08-26T07:45:33Z"
        version="1"/>
  <item contentType="application/vnd.apple.mpegurl"
        metadataURI="http://10.160.82.131/out/u/bbb/qxa/manifest.m3u8"
        validFrom="2021-09-02T07:45:33Z"
        validUntil="2051-08-26T07:45:33Z"
        version="1"/>
  <item contentType="application/mbms-user-service-description+xml"
        metadataURI="file:///usdBundle.xml"
        validFrom="2021-09-02T07:45:33Z"
        validUntil="2051-08-26T07:45:33Z"
        version="1"/>
  <item contentType="application/mbms-schedule+xml"
        metadataURI="file:///TMGI-0x1009f165schedule.xml"
        validFrom="2021-09-02T07:45:33Z"
        validUntil="2051-08-26T07:45:33Z"
        version="1"/>
</metadataEnvelope>
--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
Content-Type: application/sdp
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165.sdp

v=0
o=ROHDE-SCHWARZ-BSCC 269087077 1630568733 IN IP4 11.11.11.11
s=HLS Streaming Session 0x1009f165
i=File Download Session
t=3839557533 4785637533
a=mbms-mode:broadcast-mbsfn 269087077
c=IN IP4 238.1.1.111/127
b=AS:1699
m=application 40101 FLUTE/UDP 0
a=flute-tsi:16
a=flute-ch:1
a=3GPP-QoE-Metrics:metrics={Object_Loss};rate=null;resolution=10
a=3GPP-QoE-Metrics:metrics={Network_Resource};rate=null;resolution=10

--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
Content-Type: application/vnd.apple.mpegurl
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165.m3u8

#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:CODECS="avc1.4D401E,mp4a.40.2",BANDWIDTH=1427133,FRAME-RATE=25.000,RESOLUTION=640x360
out/u/bbb/qxa/manifest_3.m3u8?m=1614073235

--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
Content-Type: application/vnd.apple.mpegurl
Content-Transfer-Encoding: 7bit
Content-Location: http://10.160.82.131/out/u/bbb/qxa/manifest.m3u8

#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=3847133,AVERAGE-BANDWIDTH=3847133,RESOLUTION=1280x720,FRAME-RATE=25.000,CODECS="avc1.4D401F,mp4a.40.2"
manifest_1.m3u8?m=1614073235
#EXT-X-STREAM-INF:BANDWIDTH=2857098,AVERAGE-BANDWIDTH=2857098,RESOLUTION=854x480,FRAME-RATE=25.000,CODECS="avc1.4D401E,mp4a.40.2"
manifest_2.m3u8?m=1614073235
#EXT-X-STREAM-INF:BANDWIDTH=1427133,AVERAGE-BANDWIDTH=1427133,RESOLUTION=640x360,FRAME-RATE=25.000,CODECS="avc1.4D401E,mp4a.40.2"
manifest_3.m3u8?m=1614073235

--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
Content-Type: application/mbms-user-service-description+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///usdBundle.xml

<?xml version="1.0" encoding="utf-8"?>
<bundleDescription xmlns="urn:3GPP:metadata:2005:MBMS:userServiceDescription"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:sv="urn:3gpp:metadata:2009:MBMS:schemaVersion"
                   xmlns:r7="urn:3GPP:metadata:2007:MBMS:userServiceDescription"
                   xmlns:r8="urn:3GPP:metadata:2008:MBMS:userServiceDescription"
                   xmlns:r9="urn:3GPP:metadata:2009:MBMS:userServiceDescription"
                   xmlns:r12="urn:3GPP:metadata:2013:MBMS:userServiceDescription"
                   xmlns:r14="urn:3GPP:metadata:2017:MBMS:userServiceDescription"
                   xmlns:r15="urn:3GPP:metadata:2018:r15:MBMS:userServiceDescription"
                   xsi:schemaLocation="urn:3GPP:metadata:2005:MBMS:userServiceDescription USD-schema-main.xsd">
  <sv:schemaVersion>1</sv:schemaVersion>
  <userServiceDescription serviceId="urn:rohde-schwarz:service:16.0"
                          r7:serviceClass="urn:oma:bcast:ext_bsc_3gpp:bscc:rsservice1"
                          r14:romService="true">
    <name>Test Service TMGI-0x1009f165</name>
    <name lang="EN">EN: Test Service TMGI-0x1009f165</name>
    <name lang="DE">DE: Test Service TMGI-0x1009f165</name>
    <serviceLanguage>EN</serviceLanguage>
    <serviceLanguage>DE</serviceLanguage>
    <requiredCapabilities>
      <feature>23</feature>
      <feature>27</feature>
    </requiredCapabilities>
    <deliveryMethod sessionDescriptionURI="file:///TMGI-0x1009f165.sdp">
      <sv:delimiter>0</sv:delimiter>
      <r12:broadcastAppService>
        <r12:basePattern>out/u/bbb/qxa/manifest_3.m3u8?m=1614073235</r12:basePattern>
        <r12:basePattern>file:///TMGI-0x1009f165.m3u8</r12:basePattern>
        <r12:serviceArea>2</r12:serviceArea>
      </r12:broadcastAppService>
      <sv:delimiter>0</sv:delimiter>
    </deliveryMethod>
    <r12:appService appServiceDescriptionURI="http://10.160.82.131/out/u/bbb/qxa/manifest.m3u8"
                    mimeType="application/vnd.apple.mpegurl"/>
    <r9:schedule>
      <r9:scheduleDescriptionURI>file:///TMGI-0x1009f165schedule.xml</r9:scheduleDescriptionURI>
    </r9:schedule>
    <sv:delimiter>0</sv:delimiter>
    <r9:availabilityInfo>
      <r9:infoBinding>
        <r9:serviceArea>2</r9:serviceArea>
      </r9:infoBinding>
    </r9:availabilityInfo>
  </userServiceDescription>
</bundleDescription>
--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
Content-Type: application/mbms-schedule+xml
Content-Transfer-Encoding: 7bit
Content-Location: file:///TMGI-0x1009f165schedule.xml

<?xml version="1.0" encoding="utf-8"?>
<scheduleDescription xmlns="urn:3gpp:metadata:2011:MBMS:scheduleDescription"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:sv="urn:3gpp:metadata:2009:MBMS:schemaVersion"
                     xsi:schemaLocation="urn:3gpp:metadata:2011:MBMS:scheduleDescription ScheduleDescription.xsd"
                     scheduleUpdate="2021-09-02T07:45:33Z">
  <sv:schemaVersion>1</sv:schemaVersion>
  <serviceSchedule>
    <sessionSchedule>
      <start>2021-09-02T07:45:33Z</start>
      <stop>2051-08-26T07:45:33Z</stop>
      <index>0</index>
      <sv:delimiter>0</sv:delimiter>
      <sv:delimiter>0</sv:delimiter>
    </sessionSchedule>
  </serviceSchedule>
</scheduleDescription>
--xxx.yyy.zzz.--Rohde&Schwarz-BSCC--zzz.yyy.xxx--
```` 

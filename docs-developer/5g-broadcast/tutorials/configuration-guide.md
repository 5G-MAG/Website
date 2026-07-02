---
title: Configuration Service Announcement
hide_title: true
sidebar_position: 6
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
<h1>Configuration of Service Announcement</h1>
<p>This tutorial covers the configuration options for running the Linux-based 5G Broadcast stack, focused on the Service Announcement (SA) file and the FLUTE ffmpeg watchfolder.</p>
</div>
</div>

This tutorial covers the configuration options for running the Linux-based 5G Broadcast stack, focused on the Service Announcement (SA) file and the FLUTE ffmpeg watchfolder. The right configuration depends on two choices:

* **Delivery mode**: HLS or DASH broadcast, or HLS seamless switching between broadcast and unicast.
* **Service Announcement source**: served by the FLUTE ffmpeg signalling server, or a local SA file read directly by the middleware.

Use the sections below to pick the combination that matches your scenario. The repeated configuration blocks differ only in a few lines (delivery mode, SA format and paths).

## Setup Resources

* [Hardware, OS & SDR Requirements](./requirements)
* [Sample Files](../additional/sample-files)
* [Service Announcement Formats](../additional/rt-common-shared/MBMS-service-announcement-files)

## Preparation

Running the modem service once and then stopping it generates or refreshes the configuration files the stack needs. After each reboot of your machine run:

1. `sudo systemctl start 5gmag-rt-modem`
2. `sudo systemctl stop 5gmag-rt-modem`

Make sure that you have the latest nginx config enabled in `/etc/nginx/sites-enabled/5gmag-rt-wui`. Compare it to the
config that is provided [here](https://github.com/5G-MAG/rt-common-shared/blob/feature/mbms/mbms/common-config/5gmag-rt-wui)

## Different SA formats

The Reference Tools support three different service announcement formats. In the examples below we either use the
`5gmag_legacy` format for the recordings or the `default` format for seamless switching. To use the seamless switching
format that was agreed in 5G-MAG you have to use `5gmag_bc_uc`. The corresponding service announcement example file is
labeled `bootstrap.multipart.seamlessswitching.hls.5gmag`. More details can be found in the
[Service Announcement Formats](../additional/rt-common-shared/MBMS-service-announcement-files) section.

## Playback of 5GBC together with the MBMS Modem

Set the target configuration in `/etc/5gmag-rt.conf`:

````
  seamless_switching: {
    enabled: <TRUE OR FALSE>;
    truncate_cdn_playlist_segments: 3
  }
  bootstrap_format: <TARGET FORMAT>;
  local_service: {
    enabled: false
  }
````

## Playback of legacy recordings

Set the configuration in `/etc/5gmag-rt.conf` to use the legacy format:

```` 
  seamless_switching: {
    enabled: false;
  }
  bootstrap_format: "5gmag_legacy";
  local_service: {
    enabled: false;
  }
```` 

If you want to play the recorded content in a loop consider increasing the cache values to avoid segments with the same
url being deleted immediately:

```` 
  cache: { 
    max_segments_per_stream: 30;
    max_file_age: 1200;    /* seconds */
    max_total_size: 128; /* megabyte */
  }
```` 

## FLUTE ffmpeg watchfolder with signaling server

### HLS seamless switching

Set the config file for the rt-mbms-examples project in `flute-ffmpeg\config\default.cfg` to:

````
general : {
          multicast_ip = "238.1.1.111";
          multicast_port = 40101;
          mtu = 1500;
          rate_limit = 1200000;
          watchfolder_path = "<PATH TO YOUR WEBSERVER WHERE HLS SEGMENTS ARE WRITTEN TO>";
          path_to_transmit = "<RELATIVE PATH FROM THE ROOT OF YOUR WEBSERVER>"
          stream_type = "hls";
          transmit_service_announcement = true;
          dash: {
              number_of_init_segments = 3;
              resend_init_in_sec = 30;
              service_announcement = "../supporting_files/mbms/bootstrap_examples/bootstrap.multipart.legacy.dash";
          };
          hls: {
              service_announcement = "../supporting_files/mbms/bootstrap_examples/bootstrap.multipart.seamlessswitching.hls";
              media_playlists_to_ignore_in_multicast = []
          }
          webserver_port: 3010;
}
```` 

Note: For seamless switching to work the `watchfolder_path` needs to point to a webserver that hosts the segments.

Enable seamless switching in the `/etc/5gmag-rt.conf` file:

```` 
  seamless_switching: {
    enabled: true;
    truncate_cdn_playlist_segments: 3
  }
```` 

### DASH Broadcast

Disable seamless switching and set the right SA format in the `/etc/5gmag-rt.conf` file:

```` 
  seamless_switching: {
    enabled: false;
    truncate_cdn_playlist_segments: 3
  },
bootstrap_format: "5gmag_legacy";

````

Adjust the config for flute-ffmpeg:

```` 
general : {
          multicast_ip = "238.1.1.111";
          multicast_port = 40101;
          mtu = 1500;
          rate_limit = 1200000;
          watchfolder_path = "/home/dsi/5G-MAG/simple-express-server/public/watchfolder/dash";
          path_to_transmit = ""
          stream_type = "dash";
          transmit_service_announcement = true;
          dash: {
              number_of_init_segments = 3;
              resend_init_in_sec = 30;
              service_announcement = "../supporting_files/mbms/bootstrap_examples/bootstrap.multipart.legacy.dash";
          };
          hls: {
              service_announcement = "../supporting_files/mbms/bootstrap_examples/bootstrap.multipart.seamlessswitching.hls";
              media_playlists_to_ignore_in_multicast = []
          }
          webserver_port: 3010;
}
````  

### HLS Broadcast

Disable seamless switching and set the right SA format in the `/etc/5gmag-rt.conf` file:

```` 
  seamless_switching: {
    enabled: false;
    truncate_cdn_playlist_segments: 3
  },
bootstrap_format: "5gmag_legacy";

````

Adjust the config for flute-ffmpeg:

```` 
general : {
          multicast_ip = "238.1.1.111";
          multicast_port = 40101;
          mtu = 1500;
          rate_limit = 1200000;
          watchfolder_path = "/home/dsi/5G-MAG/simple-express-server/public/watchfolder/hls";
          path_to_transmit = "watchfolder/hls/"
          stream_type = "hls";
          transmit_service_announcement = true;
          dash: {
              number_of_init_segments = 3;
              resend_init_in_sec = 30;
              service_announcement = "../supporting_files/mbms/bootstrap_examples/bootstrap.multipart.legacy.dash";
          };
          hls: {
              service_announcement = "../supporting_files/mbms/bootstrap_examples/bootstrap.multipart.legacy.hls";
              media_playlists_to_ignore_in_multicast = []
          }
          webserver_port: 3010;
}
```` 

## FLUTE ffmpeg with local Service Announcement

In this example we don't need the http server that signals the `mch_info.json`. Instead, we start the MBMS Middleware
directly with a local service announcement file

### General

Enable the local service in the `/etc/5gmag-rt.conf` file:

````
  local_service: {
    enabled: true;
  }
````

Disable `transmit_service_announcement` in the flute-ffmpeg `default.cfg` file:

```` 
transmit_service_announcement = false;
````  

### HLS seamless switching

Point to a local service announcement file with seamless switching support in the `/etc/5gmag-rt.conf` file e.g.:

````
  local_service: {
    bootstrap_file: "/home/dsi/5G-MAG/rt-common-shared/mbms/bootstrap_examples/bootstrap.multipart.seamlessswitching.hls";
  }
````

Enable seamless switching in the `/etc/5gmag-rt.conf` file:

```` 
  seamless_switching: {
    enabled: true;
    truncate_cdn_playlist_segments: 3
  },
bootstrap_format: "";

````

### HLS Broadcast

Point to a local service announcement in the `/etc/5gmag-rt.conf` file e.g.:

````
  local_service: {
    bootstrap_file: "/home/dsi/5G-MAG/rt-common-shared/mbms/bootstrap_examples/bootstrap.multipart.legacy.hls";
  }
````

Disable seamless switching and set the right SA format in the `/etc/5gmag-rt.conf` file:

```` 
  seamless_switching: {
    enabled: false;
    truncate_cdn_playlist_segments: 3
  },
bootstrap_format: "5gmag_legacy";

````

### DASH Broadcast

Point to a local service announcement in the `/etc/5gmag-rt.conf` file e.g.:

````
  local_service: {
    bootstrap_file: "/home/dsi/5G-MAG/rt-common-shared/mbms/bootstrap_examples/bootstrap.multipart.legacy.dash";
  }
````

Disable seamless switching and set the right SA format in the `/etc/5gmag-rt.conf` file:

```` 
  seamless_switching: {
    enabled: false;
    truncate_cdn_playlist_segments: 3
  },
bootstrap_format: "5gmag_legacy";

````

## Next steps

* To play a received HLS stream, see [SDR - HLS Playback over 5G Broadcast](./hls-playback-5gbc).
* For details of each Service Announcement format, see [Service Announcement Formats](../additional/rt-common-shared/MBMS-service-announcement-files).
* Return to the [Tutorials index](./).

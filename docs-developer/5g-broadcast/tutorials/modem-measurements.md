---
title: SDR - Measurements
hide_title: true
sidebar_position: 5
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
<h1>MBMS Modem - Measurements & GPS</h1>
</div>
</div>

This tutorial shows how to have the MBMS Modem log signal-quality measurements (CINR, BLER, MCS and related values) to a CSV file, optionally tagged with GPS position and time. This is useful for drive tests and coverage analysis.

:::note
This page covers measurement logging with position data. If instead you want to discipline the system clock from GPS (for accurate timestamps), see [GPS Time Synchronization for rt-mbms-modem](../additional/rt-mbms-modem/GPS-time-synchronization). The two are related but separate: this page reads GPS position/time into the measurement file; that page feeds GPS time to the system clock via chrony.
:::

## Configuring a GPS mouse

*MBMS Modem* relies on GPSD (https://gpsd.gitlab.io/gpsd/) for GPS data acquisition. GPSD is the GPS daemon that reads the receiver and makes position and time available to other programs.

Please follow the setup instruction for gpsd to configure it for your GPS
receiver: https://gpsd.gitlab.io/gpsd/installation.html

Usually, this should boil down to:

- ``sudo apt install libgps-dev gpsd``
- Checking which (virtual) serial port your GPS mouse uses, once you plug it in (e.g. ``/dev/ttyACM0``)
- Setting this device in /etc/default/gpsd:

```
# Devices gpsd should collect to at boot time.
# They need to be read/writeable, either by user gpsd or the group dialout.
DEVICES="/dev/ttyACM0"
# Other options you want to pass to gpsd
GPSD_OPTIONS=""
```

- Adding gpsd to the *dialout* group: `` sudo usermod -a -G dialout gpsd``
- Checking if everything works with one of the client applications, e.g. `cgps` (can be installed
  with `sudo apt install gpsd-clients`). This should show position data.

## Logging measurement data to a CSV file

### Configuration for measurement file

Is in ``/etc/5gmag-rt.conf``:

```
  measurement_file: {
    enabled: true;
    file_path: "/tmp/modem_measurements.csv";
    interval_secs: 10;      
    gpsd:
    {
      enabled: true;
      host: "localhost";
      port: "2947";
    }
}
```

You can modify the location of the created file here, set the interval in which measurement lines are written to it, and
enable/disable GPS.

### File format

The created file is in semicolon-separated CSV format.

The columns contain:

1. system timestamp
2. latitude
3. longitude
4. gps timestamp
5. CINR
6. PDSCH MCS
7. PDSCH BLER
8. PDSCH BER
9. MCCH MCS
10. MCCH BLER
11. MCCH BER
12. First MCH index
13. First MCH MCS
14. First MCH BLER
15. First MCH BER

If there are more MCHs, they are appended at the end of the line:

16. Second MCH Index

17. Second MCH MCS

18. Second MCH BLER

19. Second MCH BER

### Example output

Each line is one measurement interval. Reading the first row against the column list above:

* `2021-02-26T15:09:54` = system timestamp
* `48.392428` / `16.104939` = latitude / longitude
* `2021-02-26T15:09:54` = GPS timestamp
* `22.847839` = CINR (dB)
* `4` / `0.000000` / `0.000000` = PDSCH MCS / BLER / BER
* `2` / `0.000000` / `-` = MCCH MCS / BLER / BER (a `-` means the value was not available for that interval)
* `0` / `9` / `0.000000` / `-` = first MCH index / MCS / BLER / BER

```
2021-02-26T15:09:54;48.392428;16.104939;2021-02-26T15:09:54;22.847839;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:00;48.392428;16.104939;2021-02-26T15:10:00;27.173386;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:05;48.392428;16.104939;2021-02-26T15:10:05;26.828796;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:11;48.392428;16.104939;2021-02-26T15:10:11;23.722340;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:17;48.392428;16.104939;2021-02-26T15:10:17;24.914352;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:22;48.392428;16.104939;2021-02-26T15:10:22;26.893414;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:28;48.392428;16.104939;2021-02-26T15:10:28;22.102150;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
2021-02-26T15:10:34;48.392428;16.104939;2021-02-26T15:10:34;22.894867;4;0.000000;0.000000;2;0.000000;-;0;9;0.000000;-;
```

## Next steps

* To synchronize the system clock from GPS, see [GPS Time Synchronization for rt-mbms-modem](../additional/rt-mbms-modem/GPS-time-synchronization).
* Return to the [Tutorials index](./).

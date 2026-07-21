---
title: V3C Unity Player (Android) and Streaming
hide_title: true
sidebar_position: 0
description: Step-by-step tutorial to build the V3C Unity player for Android and stream volumetric content from a local DASH server.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
  <path d="M12 12.5l4 -2.5" />
  <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" />
  <path d="M8 10v4.5l4 2.5" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">V3C Immersive Platform</span>
<h1>V3C Unity Player for Android with DASH Streaming Server</h1>
</div>
</div>

## Introduction

This tutorial provides the instructions to set up the V3C Immersive Platform for an Android device using content streamed from a DASH server.

**What you will build:** a Unity-based V3C player running on an Android phone that decodes volumetric content and plays it back from a Dynamic Adaptive Streaming over HTTP (DASH) server you run on your own machine.

The video below walks through the same build.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/4Mj_eJnYVjE?si=DGY8rmDpl-mAJBfH" title="Video walkthrough: building the V3C Unity player for Android with a DASH streaming server" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This tutorial pulls together four repositories:

<div class="repo-list">
<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-v3c-unity-player">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-v3c-unity-player</span>
<span class="repo-card__role">The Unity project for the Android V3C player, built into the APK you install on the device.</span>
</a>
<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-v3c-decoder-plugin">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-v3c-decoder-plugin</span>
<span class="repo-card__role">Native V3C decoder plugin; built for Android and copied into the Unity player's plugin folder.</span>
</a>
<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-common-shared">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-common-shared</span>
<span class="repo-card__role">Shared build tooling: builds the avcodec libraries (Step 2) and provides the simple express DASH server (Step 5).</span>
</a>
<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-v3c-content">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-v3c-content</span>
<span class="repo-card__role">Sample V3C test content for on-device playback and for the DASH streaming server.</span>
</a>
</div>

## Prerequisites

This walkthrough was done on Windows, building an APK for an Android phone (a Samsung S21 in this example). For the supported and tested Android devices, see the [Requirements](./requirements) page. Before you start, install the tools referenced in the steps below:

<div class="spec-chip-row">
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" /></svg>Host: Windows</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l8.09 8.09c.79 .79 2.07 .79 2.86 0l4.362 -4.362a2.025 2.025 0 0 0 0 -2.86l-8.09 -8.09a2.025 2.025 0 0 0 -1.432 -.593" /><path d="M17.5 10.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" /></svg>Unity 6000.0.25f1</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l8.09 8.09c.79 .79 2.07 .79 2.86 0l4.362 -4.362a2.025 2.025 0 0 0 0 -2.86l-8.09 -8.09a2.025 2.025 0 0 0 -1.432 -.593" /><path d="M17.5 10.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" /></svg>CMake 3.30.4</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /></svg>Android Studio: NDK r27c, API 35</span>
<span class="spec-chip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /></svg>Docker Desktop</span>
</div>

Unity Hub is the easiest way to install the pinned Unity version. The exact download links and versions for each tool are given inline in Step 0 below.

## Step 0: Setting up the environment

This walkthrough installs and builds the platform on Windows. The target device to install the apk with the Unity Player will be an Android phone (in this example a Samsung S21).

As indicated in the instructions in the [rt-v3c-unity-player](https://github.com/5G-MAG/rt-v3c-unity-player), this tutorial uses Unity 6000.0.25f1. Download [Unity Hub](https://unity.com/download) and select the version of Unity to install, which can also be downloaded from here: [Unity 6000.0.25 release notes](https://unity.com/releases/editor/whats-new/6000.0.25)

As indicated in the instructions in the [rt-v3c-decoder-plugin](https://github.com/5G-MAG/rt-v3c-decoder-plugin), the following are also needed:

- CMake (for example 3.30.4) - [Download from Cmake](https://cmake.org/files/v3.30/cmake-3.30.4-windows-x86_64.msi)
- Android Studio - [Download from Android](https://developer.android.com/studio) - Once downloaded make sure you install NDK r27c (27.2.12479018), and API 35.
- Docker Desktop - [Download from Docker](https://docs.docker.com/desktop/setup/install/windows-install/) - this is needed to execute Docker in Windows.

## Step 1: Clone the Unity Player Repository

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-v3c-unity-player">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-v3c-unity-player</span>
<span class="repo-card__role">Unity project for the Android V3C player.</span>
</a>

Clone the Unity player repository into your home directory:

```bash
cd ~
git clone https://github.com/5G-MAG/rt-v3c-unity-player
```

Although not immediately used, this will create the directories where the decoder plugin files will be copied.

## Step 2: Install the Decoder Plugin

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-v3c-decoder-plugin">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-v3c-decoder-plugin</span>
<span class="repo-card__role">Native V3C decoder plugin, built for Android in this step.</span>
</a>

Clone the repository:

```bash
cd ~
git clone --recurse-submodules https://github.com/5G-MAG/rt-v3c-decoder-plugin.git
```

Install the dependencies:

```bash
cd ~/rt-v3c-decoder-plugin
./Scripts/dl_deps.sh
```

Add the additional dependency regarding avcodec libraries. For this, instructions are provided in [rt-common-shared](https://github.com/5G-MAG/rt-common-shared). Use the Docker build instructions with Git Bash.

```bash
cd ~
git clone --recurse-submodules https://github.com/5G-MAG/rt-common-shared.git
cd ~/rt-common-shared/avcodec-build/
docker build -t ffmpeg-builder:27 --build-arg NDK_VERSION=27.2.12479018 .
docker run -v /$(PWD)/build/ffmpeg/aarch64:/usr/build/ffmpeg --env TARGET_ABI=aarch64 --env ANDROID_API_LEVEL=35 ffmpeg-builder:27
```

In Windows, the build artifacts can be found in your user folder `rt-common-shared\avcodec-build\build\ffmpeg\aarch64`.

Because this build targets an Android device, once compiled, manually copy the .so libraries from `rt-common-shared\avcodec-build\build\ffmpeg\aarch64\lib` into the `rt-v3c-decoder-plugin\External\avcodec\7.1\Android\arm64-v8a\lib` directory. Create the folders under the rt-v3c-decoder-plugin: `External\avcodec\7.1\Android\arm64-v8a\lib`.

Make sure the ndk is available in the Android directory.

At this point, back in the directory of the rt-v3c-decoder-plugin, compile for Android:

```bash
cd ~/rt-v3c-decoder-plugin
./Scripts/build_android.sh release all
```

Copy the plugins into the rt-v3c-unity-player directories:

```bash
cd ~/rt-v3c-unity-player
../rt-v3c-decoder-plugin/Scripts/copy_libs.sh ./Packages/V3CDecoder/Runtime/Plugins release Android
```

## Step 3: Building the Unity Player for Android

In Unity Hub, import the "rt-v3c-unity-player/V3CImmersiveTest" project. Make sure that the scene V3C-Simple Player.unity is loaded.

Go to File->Build Settings (or Ctrl+Shift+B), select the Android target and select either Build or Build and Run.

Unity will generate a .apk file that you can copy and install on your phone. To use the Build&Run feature, you will need to activate the Debug through USB feature on your device (requires developer mode).

Note that you will need to manually install the content and/or configuration files on your device. Run the application once on your device to ensure the creation of the folder.

## Step 4: Importing configuration files

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-v3c-content">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-v3c-content</span>
<span class="repo-card__role">Sample V3C test content for on-device playback and streaming.</span>
</a>

With the application already installed on the Android device and the directories automatically created, download the V3C Content for testing locally on the device and for streaming.

```bash
git clone --recurse-submodules https://github.com/5G-MAG/rt-v3c-content.git
```

The content of the folder "on-device-data" can be copied into the device (in this example: "\Internal storage\Android\data\com.InterDigital.V3CSimplePlayer\files").

## Step 5: Setting up a DASH streaming server

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-common-shared/">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-common-shared</span>
<span class="repo-card__role">Includes the simple express server used here as the DASH streaming server.</span>
</a>

Before copying the content in the device, you can modify the config.json file to insert the IP address of the machine hosting the DASH server and the port.

Use the simple express server available in [rt-common-shared](https://github.com/5G-MAG/rt-common-shared/).

Just install the server following the instructions, then copy the content of the "on-server-data" inside the public folder of the DASH server. Make sure to unzip the packages containing the segments and mpd for each test sequence.

Streaming can be started from the Unity player.

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have a working V3C Unity player on Android.</strong> It decodes volumetric content and streams it from the DASH server running on your own machine.</div>
</div>

## Troubleshooting

If you experience any errors during the Unity player build. Try selecting the V3CDecoder tab on the top menu and click on "Check plugins" and "Check settings".

## Next steps

- Browse more walkthroughs and recorded talks in the [Tutorials and Video Library](./).
- See the source repositories behind each component on the [Resources](../resources) page.
- For background on the specifications and pipeline, read the [Scope](../scope) page.

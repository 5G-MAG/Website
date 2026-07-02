---
title: V3C Unity Player (Android) and Streaming
hide_title: true
sidebar_position: 0
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
  <path d="M12 12.5l4 -2.5" />
  <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5" />
  <path d="M8 10v4.5l4 2.5" /></svg>
</div>
<div class="topic-banner__text">
<h1>V3C Unity Player for Android with DASH Streaming Server</h1>
<p>This tutorial provides the instructions to set up the V3C Immersive Platform for an Android device using content streamed from a DASH server.</p>
</div>
</div>

## Introduction

This tutorial provides the instructions to set up the V3C Immersive Platform for an Android device using content streamed from a DASH server.

**What you will build:** a Unity-based V3C player running on an Android phone that decodes volumetric content and plays it back from a Dynamic Adaptive Streaming over HTTP (DASH) server you run on your own machine.

The video below walks through the same build.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4Mj_eJnYVjE?si=DGY8rmDpl-mAJBfH" title="Video walkthrough: building the V3C Unity player for Android with a DASH streaming server" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Prerequisites

This walkthrough was done on Windows, building an APK for an Android phone (a Samsung S21 in this example). For the supported and tested Android devices, see the [Requirements](./requirements) page. Before you start, install the tools referenced in the steps below:

- Unity, using the version pinned by the `rt-v3c-unity-player` instructions (Unity 6000.0.25f1 at the time of writing); Unity Hub is the easiest way to install it.
- CMake (for example, the 3.30.4 build linked in Step 2).
- Android Studio, with NDK r27c (27.2.12479018) and API 35 installed.
- Docker Desktop, used to build the avcodec libraries and to run Docker on Windows.

The exact download links and versions are given inline in the steps so you can copy them directly.

## Step 0: Setting up the environment
We are doing the installation and building the platform in Windows. The target device to install the apk with the Unity Player will be an Android phone (in this example a Samsung S21).

As indicated in the instructions in the [rt-v3c-unity-player](https://github.com/5G-MAG/rt-v3c-unity-player), we will use Unity 6000.0.25f1. We recommend downloading [Unity Hub](https://unity.com/download) and selecting the version of Unity to install, which can also be downloaded from here: [https://unity.com/releases/editor/whats-new/6000.0.25](https://unity.com/releases/editor/whats-new/6000.0.25)

As indicated in the instructions in the [rt-v3c-decoder-plugin](https://github.com/5G-MAG/rt-v3c-decoder-plugin), we will also need:
- CMake (for example 3.30.4) - [Download from Cmake](https://cmake.org/files/v3.30/cmake-3.30.4-windows-x86_64.msi)
- Android Studio - [Download from Android](https://developer.android.com/studio) - Once downloaded make sure you install NDK r27c (27.2.12479018), and API 35.
- Docker Desktop - [Download from Docker](https://docs.docker.com/desktop/setup/install/windows-install/) - this is needed to execute Docker in Windows.

## Step 1: Clone the Unity Player Repository

Clone the Unity player repository into your home directory:

```
cd ~
git clone https://github.com/5G-MAG/rt-v3c-unity-player  
```

Although not immediately used, this will create the directories where the decoder plugin files will be copied.

## Step 2: Install the Decoder Plugin

Clone the repository:

```
cd ~
git clone --recurse-submodules https://github.com/5G-MAG/rt-v3c-decoder-plugin.git
```

Install the dependencies:

```
cd ~/rt-v3c-decoder-plugin
./Scripts/dl_deps.sh
```

Add the additional dependency regarding avcodec libraries. For this, instructions are provided in [rt-common-shared](https://github.com/5G-MAG/rt-common-shared). We can use the Docker build instructions with Git Bash.

```
cd ~
git clone --recurse-submodules https://github.com/5G-MAG/rt-common-shared.git
cd ~/rt-common-shared/avcodec-build/
docker build -t ffmpeg-builder:27 --build-arg NDK_VERSION=27.2.12479018 .
docker run -v /$(PWD)/build/ffmpeg/aarch64:/usr/build/ffmpeg --env TARGET_ABI=aarch64 --env ANDROID_API_LEVEL=35 ffmpeg-builder:27
```

In Windows, the build artifacts can be found in your user folder `rt-common-shared\avcodec-build\build\ffmpeg\aarch64`.

As we are targeting an Android device, once compiled, we will have to manually copy the .so libraries from `rt-common-shared\avcodec-build\build\ffmpeg\aarch64\lib` into the `rt-v3c-decoder-plugin\External\avcodec\7.1\Android\arm64-v8a\lib` directory. Please create the folders under the rt-v3c-decoder-plugin: `External\avcodec\7.1\Android\arm64-v8a\lib`.

Make sure the ndk is available in the Android directory.

At this point, back in the directory of the rt-v3c-decoder-plugin, we can compile for Android:

```
cd ~/rt-v3c-decoder-plugin
./Scripts/build_android.sh release all  
```

We can now copy the plugins into the rt-v3c-unity-player directories:

```
cd ~/rt-v3c-unity-player
../rt-v3c-decoder-plugin/Scripts/copy_libs.sh ./Packages/V3CDecoder/Runtime/Plugins release Android
```

## Step 3: Building the Unity Player for Android

In Unity Hub, import the "rt-v3c-unity-player/V3CImmersiveTest" project. Make sure that the scene V3C-Simple Player.unity is loaded.

Go to File->Build Settings (or Ctrl+Shift+B), select the Android target and select either Build or Build and Run.

Unity will generate a .apk file that you can copy and install on your phone. To use the Build&Run feature, you will need to activate the Debug through USB feature on your device (requires developer mode).

Note that you will need to manually install the content and/or configuration files on your device. Run the application once on your device to ensure the creation of the folder.

## Step 4: Importing configuration files

With the application already installed in the Android device and the directories automatically created we can now download the V3C Content for testing locally in the device and for streaming.

```
git clone --recurse-submodules https://github.com/5G-MAG/rt-v3c-content.git
```

The content of the folder "on-device-data" can be copied into the device (in our case: "\Internal storage\Android\data\com.InterDigital.V3CSimplePlayer\files").

## Step 5: Setting up a DASH streaming server

Before copying the content in the device, you can modify the config.json file to insert the IP address of the machine hosting the DASH server and the port.

We recommend using the simple express server available in [https://github.com/5G-MAG/rt-common-shared/](https://github.com/5G-MAG/rt-common-shared/).

Just install the server following the instructions, then copy the content of the "on-server-data" inside the public folder of the DASH server. Make sure to unzip the packages containing the segments and mpd for each test sequence.

Streaming can be started from the Unity player.

## Troubleshooting
If you experience any errors during the Unity player build. Try selecting the V3CDecoder tab on the top menu and click on "Check plugins" and "Check settings".

## Next steps

- Browse more walkthroughs and recorded talks in the [Tutorials and Video Library](./).
- See the source repositories behind each component on the [GitHub Repos](../repositories) page.
- For background on the specifications and pipeline, read the [Scope](../scope) page.

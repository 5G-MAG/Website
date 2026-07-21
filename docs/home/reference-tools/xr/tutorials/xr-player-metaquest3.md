---
title: XR Player - Meta Quest 3
hide_title: true
sidebar_position: 2
description: Step-by-step guide to build the XR Unity Player for Meta Quest 3, load glTF content, and troubleshoot OpenXR setup.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
  <path d="M3 7v-2a2 2 0 0 1 2 -2h2" />
  <path d="M3 17v2a2 2 0 0 0 2 2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M17 21h2a2 2 0 0 0 2 -2v-2" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">XR/3D Scenes with MPEG-I Scene Description</span>
<h1>Building and using XR Player on Meta Quest 3</h1>
</div>
</div>

This guide covers compiling the XR player sample Unity project for Meta Quest 3 and configuring it with specific glTF content.

**What you will build:** a native Meta Quest 3 application that loads glTF scenes with the MPEG glTF extensions, installed and running on the headset.

## Prerequisites

- [adb](https://developer.android.com/tools/adb) installed on the machine, and a Meta Quest 3 with [developer options and USB debugging](https://developer.android.com/studio/debug/dev-options#enable) enabled and connected.
- **Unity 3D 2022.3.34f1** with both the Android and iOS support modules installed (Android API 28 and NDK 27.2.12479018 are used).
- [git LFS](https://git-lfs.com/) (required to clone the `rt-xr-content` test content).
- The native build tools used to compile the MAF library and media pipelines: Meson (the build system) and SWIG (used to generate the C# bindings). See the build steps below for how they are invoked.

This guide assumes a Windows environment with a git-bash terminal (eg. to run shell scripts); the same instructions apply to other platforms.

The tutorial covers the following steps:

1. [Clone the XR Player unity project](#step-1-clone-the-xr-unity-player-project)
2. [Compile & install media pipeline library and plugins for Android](#step-2-build-and-install-media-pipelines)
3. [Configure the glTF asset to be loaded by the XR Unity player](#step-3-configure-the-gltf-asset-to-be-loaded-by-the-xr-unity-player)
4. [Build and run the Unity project](#step-4-build-and-run-the-unity-project)
5. [Launch the player](#step-5-launch-the-player)

## Step 1: Clone the XR Unity Player project

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-xr-unity-player">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-xr-unity-player</span>
<span class="repo-card__role">The Unity project for the XR Player application.</span>
</a>

```bash
git clone --recursive https://github.com/5G-MAG/rt-xr-unity-player.git
```

Note: --recursive is required to get all submodules checked out.

## Step 2: Build and install media pipelines

### Clone and install the source code

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-xr-maf-native">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-xr-maf-native</span>
<span class="repo-card__role">C++ Media Access Function library (libmaf) and the avpipeline media pipeline plugin.</span>
</a>

```bash
git clone https://github.com/5G-MAG/rt-xr-maf-native.git
cd rt-xr-maf-native
```

### Compile the MAF library and media pipeline plugins

This step builds `libmaf` (the C++ Media Access Function library used by the player), the `avpipeline` plugin (a media pipeline built on FFmpeg that decodes audio and video), and the C# bindings. The build uses Meson, and SWIG generates the C# bindings.

#### Compile and install dependencies

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-common-shared">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-common-shared</span>
<span class="repo-card__role">Provides the avcodec-build scripts used to compile the avpipeline (FFmpeg) dependencies.</span>
</a>

Clone [rt-common-shared](https://github.com/5G-MAG/rt-common-shared) as a sibling directory to `rt-xr-maf-native`, then follow [these instructions](https://github.com/5G-MAG/rt-common-shared/tree/main/avcodec-build) to compile the avpipeline dependencies. The avcodec-build produces the FFmpeg libraries that the copy commands below move into the project; if it has not been run, those `cp` commands will fail because the source files do not exist.

Copy the generated libraries into the avpipeline subproject:

```bash
mkdir -p ./rt-xr-maf-native/subprojects/avpipeline/external/avcodec/android/arm64-v8a/lib
cp ./rt-common-shared/avcodec-build/build/ffmpeg/aarch64/lib/*.so ./rt-xr-maf-native/subprojects/avpipeline/external/avcodec/android/arm64-v8a/lib

cp -r ./rt-common-shared/avcodec-build/build/ffmpeg/aarch64/include ./rt-xr-maf-native/subprojects/avpipeline/external/avcodec/android/arm64-v8a/include/

cp ./rt-common-shared/avcodec-build/build/ffmpeg/aarch64/LICENSE ./rt-xr-maf-native/subprojects/avpipeline/external/avcodec/android/arm64-v8a/LICENSE
```

#### Configure cross compilation configuration

- Download and install the Android NDK. The next steps assume a Windows x86_64 environment with the Android NDK _27.2.12479018_ installed in `C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk`.
- Locate the `./rt-xr-maf-native/crossfile/android-arm64-v8a` and modify it to point to your local NDK installation, for instance:

```ini
[binaries]
ar = ['C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk\27.2.12479018\toolchains\llvm\prebuilt\windows-x86_64\bin\llvm-ar']
c = ['C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk\27.2.12479018\toolchains\llvm\prebuilt\windows-x86_64\bin\aarch64-linux-android28-clang.cmd']
cpp = ['C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk\27.2.12479018\toolchains\llvm\prebuilt\windows-x86_64\bin\aarch64-linux-android28-clang++.cmd']
c_ld = ['C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk\27.2.12479018\toolchains\llvm\prebuilt\windows-x86_64\bin\ld.lld']
cpp_ld = ['C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk\27.2.12479018\toolchains\llvm\prebuilt\windows-x86_64\bin\ld.lld']
strip = ['C:\Users\<your_user_name>\AppData\Local\Android\Sdk\ndk\27.2.12479018\toolchains\llvm\prebuilt\windows-x86_64\bin\llvm-strip']
```

#### Configure and compile the MAF library and media pipeline plugins

- `libmaf` and C# bindings are enabled by default.
- the `avpipeline` plugin needs explicit configuration, the `avcodec_dir` must point to a subdirectory of the project where platform specific dependencies have been copied:

```bash
cd rt-xr-maf-native
meson setup --wipe -Davpipeline=true -Davpipeline:avcodec_dir=external/avcodec/android/arm64-v8a build/android/arm64-v8a --cross-file crossfile/android-arm64-v8a
meson compile -C build/android/arm64-v8a
```

### Install the media pipeline factory and plugins into the Unity project

Assuming _rt-xr-unity-player_ repository has been cloned in a sibling directory `../rt-xr-unity-player`, run the following commands with the correct path that applies to your installation:

```bash
export ANDROID_NDK_HOME='/c/Users/<your_user_name>/AppData/Local/Android/Sdk/ndk/27.2.12479018'
cd rt-xr-maf-native
scripts/install_android.sh ../rt-xr-unity-player/Packages/rt.xr.maf
```

The script copies the following:

- all _compiled libraries_ from `rt-xr-maf-native/build/android/arm64-v8a/` to `rt-xr-unity-player/Packages/rt.xr.maf/bin/android/arm64/`
- _C# bindings_ source code from `rt-xr-maf-native/subprojects/maf_csharp/swig/` to `rt-xr-unity-player/Packages/rt.xr.maf/maf/swig/`
- _avpipeline_ dependencies from `rt-xr-maf-native/subprojects/avpipeline/external/avcodec/android/arm64-v8a/lib/` to `rt-xr-unity-player/Packages/rt.xr.maf/dependencies/ffmpeg/7.1/android/arm64` along with the related LICENSE
- _libc++_ from `$ANDROID_NDK_HOME/toolchains/llvm/prebuilt/$ANDROID_NDK_HOSTNAME/sysroot/usr/lib/aarch64-linux-android/libc++_shared.so` to `rt-xr-unity-player/Packages/rt.xr.maf/dependencies/libc++/android/arm64`

Make sure all the *.so libraries are configured properly in the Unity Editor.

<img loading="lazy" src="/assets/images/xr/unity-configure-shared-libraries.png" alt="Configure shared libraries in Unity project" style="width:80%;">

For each library, in the inspector panel:

- _Android_ platform must be checked
- _arm64_ must be selected

The configuration is stored in Unity's *.meta sidecar files and are tracked in the Unity repository. Unity removes the *.meta files if the resource they reference is not found when opening a project.

## Step 3: Configure the glTF asset to be loaded by the XR Unity player

<a class="repo-card repo-card--inline" href="https://github.com/5G-MAG/rt-xr-content">
<span class="repo-card__name"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>rt-xr-content</span>
<span class="repo-card__role">Test glTF content (for example the Studio Apartment scene) used with the player.</span>
</a>

Clone the `rt-xr-content` repository. This **requires [git LFS](https://git-lfs.com/)** to be installed on your system.

```bash
git clone https://github.com/5G-MAG/rt-xr-content.git
```

Push glTF content to the Meta Quest 3, for instance the "Studio Apartment":

```bash
cd rt-xr-content
adb push ./studio_apartment /storage/emulated/0/Android/data/com.fivegmag.rtxrplayer/files/studio_apartment
```

Note: the target path is the application's private storage (`Android/data/com.fivegmag.rtxrplayer/...`), which is created when the app is first installed. If the push fails because the directory does not exist, install the application first (Step 4) and then push the content.

Open the `rt-xr-unity-player` directory as an existing project from Unity Hub.

Now configure the glTF asset in the Unity project by adding the path, e.g. `/storage/emulated/0/Android/data/com.fivegmag.rtxrplayer/files/studio_apartment/studio_apartment.gltf`

<img loading="lazy" src="/assets/images/xr/dev-meta-quest-scene-configuration.png" alt="Meta Quest scene configuration" style="width:80%;">

## Step 4: Build and run the Unity project

In the Unity Editor:

1. Locate the `File > Build Settings` menu
2. Make sure that Android is the selected platform, Switch Platform if needed
3. Ensure that `MetaQuestARF` is the default scene.
4. Select the device on which the application will be installed.
5. Hit `Build and Run` to compile the project and install it on the mobile device

<img loading="lazy" src="/assets/images/xr/dev-meta-quest-build-settings.png" alt="Meta Quest build settings" style="width:80%;">

## Step 5: Launch the player

Locate and launch the player in the Meta Quest 3.

Expected result: the player starts on the headset and renders the configured glTF scene (for example the Studio Apartment). If no scene appears, check that the content was pushed to the app-private path (Step 3) after the application was installed, and see Troubleshooting below.

<div class="tutorial-complete">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2l4 -4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9" /></svg>
<div><strong>You now have the XR Player running on Meta Quest 3.</strong> The app is installed on the headset and rendering the glTF scene you configured in Step 3.</div>
</div>

## Troubleshooting

If the player launches but XR input or rendering does not work, check the OpenXR configuration.

Symptom: the scene does not render in XR, or the headset is not detected. Ensure the project is configured for OpenXR with Meta Quest support:
<img loading="lazy" src="/assets/images/xr/dev-meta-quest-openxr-features-settings.png" alt="Unity OpenXR feature settings with Meta Quest support enabled" style="width:80%;">

Symptom: controllers or hand input do not respond. Ensure the Meta Quest interaction profiles are configured:
<img loading="lazy" src="/assets/images/xr/dev-meta-quest-openxr-project-settings.png" alt="Unity OpenXR project settings showing Meta Quest interaction profiles" style="width:80%;">

## Next steps

- Try authoring your own content: [Creation of MPEG-I Scene Description Test Assets](./creating-test-assets).
- Explore the sharing use cases: [Immersive and 3D Media message](./immersive-3d-media-message).
- Return to the [Tutorials index](.).

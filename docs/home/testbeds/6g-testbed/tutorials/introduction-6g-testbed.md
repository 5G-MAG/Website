---
title: Run the testbed
sidebar_label: Run the testbed
hide_title: true
sidebar_position: 0
description: How to install and run the 6G AI Traffic Characterization Testbed, from a single scenario to the full test matrix used to cross-check SA4 results, and how to extend it with scenarios and providers.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 8l-4 4l4 4" />
  <path d="M17 8l3.111 3.111" />
  <path d="M14 4l-2.175 8.7" />
  <path d="M14 21v-4a2 2 0 1 1 4 0v4" />
  <path d="M14 19h4" />
  <path d="M21 15v6" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">6G AI Traffic Characterization</span>
<h1>Run the testbed</h1>
</div>
</div>

:::tip[In short]

- **Get it:** the [5G-MAG/6G-Testbed](https://github.com/5G-MAG/6G-Testbed) repository (TR 26.870 annex B.3 gives this location). It needs Linux, Python 3.10 or later, and the right to configure traffic control (sudo, or Docker with `NET_ADMIN`). At 20 October 2026 the default `main` branch does not yet list the chat with token IDs and real-time video understanding scenarios or the lossy profile; the README of the `development` branch describes them, and the OpenClaw and A2A agentic scenarios are on the `refactor` branch (open pull request 10).
- **Configure:** scenarios and models in `configs/scenarios.yaml`, network profiles in `configs/profiles.yaml`.
- **Run:** one scenario over one profile, or the full matrix; add packet capture for network-layer metrics.
- **Reproduce SA4 results:** `run_full_tests.sh` runs the full matrix with capture and the complete report pipeline.

:::

## Quick start

```bash
git clone https://github.com/5G-MAG/6G-Testbed.git
```

Install the testbed (open **Install** below), then, from the `aitestbed` folder, run one scenario over one network profile:

```bash
python orchestrator.py --scenario chat_basic --profile 5g_urban --runs 10
```

Annex B.3 of the TR shows this command, and `python orchestrator.py --scenario all --runs 5` for the full matrix. Results are logged to an SQLite database, from which the testbed computes the [metrics](../metrics).

<details>
<summary>Install</summary>

Prerequisites and steps, as the README files of the repository (`development` branch for the VLM items) list them: Python 3.10 or later; Node.js 18 or later, for the MCP servers; Linux with `iproute2`, for network emulation; `tcpdump`, for packet capture; sudo access or Docker with `NET_ADMIN`; and, for the VLM scenarios, an NVIDIA GPU with about 30 GB of memory (about 2.5 GB for the VLM client and 27 GB for the VLM server) and CUDA Toolkit 12.1 or later.

From the root of the repository:

```bash
cd <repo-root>
python -m venv venv
source venv/bin/activate

# Install netemu (sibling package)
pip install -e netemu

# Install aiortc extension (for VLM/RTP scenarios)
pip install -e aiortc-main-clean

# Install testbed dependencies
pip install -r aitestbed/requirements.txt

# Install npm-based MCP servers
npm install -g @modelcontextprotocol/server-brave-search
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-memory
```

Hosted providers need an API key, for example `export OPENAI_API_KEY="your-key"`. To evaluate a self-hosted model without a commercial key, use the vLLM client and a scenario such as `chat_vllm`: it reaches the model through the OpenAI-compatible API of vLLM, with the same metrics and logging as hosted providers.

The emulator changes queueing disciplines on a network interface, so it needs the privileges to do so. In Docker, grant the `NET_ADMIN` capability:

```bash
docker build -t 6g-ai-testbed -f aitestbed/Dockerfile .
docker run --cap-add=NET_ADMIN -e OPENAI_API_KEY="..." \
  6g-ai-testbed python orchestrator.py --scenario all --runs 10
```

</details>

<details>
<summary>More run options</summary>

Run every scenario, the full matrix, with `--scenario all`. Add `--capture-pcap` for L3/L4 packet capture, which the network-layer metrics need, and `--capture-l7` for L7 capture through mitmproxy. `--list-scenarios` and `--list-profiles` show what is configured.

Results are logged to an SQLite database, from which the testbed computes the [metrics](../metrics) and generates plots. Setting `TRACE_PAYLOADS=1` also logs protocol and payload traces, such as WebRTC SDP samples and the exact request and response payloads of an agent.

</details>

<details>
<summary>Token and real-time video scenarios</summary>

The two scenarios in which TR 26.870 observes tokenized traffic (clause C.8.6, table C.8.6-1) need their own setup. Their setup is described in the README of the `development` branch of the repository, not in the TR.

**Real-time video understanding** streams video tokens over WebRTC to a locally hosted vision language model. It needs the VQGAN tokenizer and the Liquid_V1_7B model in the `aiortc-main-clean` checkpoints, and a StreamingBench dataset; the repository README lists the downloads and where to put them. Start the server, then the scenario:

```bash
cd aitestbed
# Start server first
python ./server/realtime_vlm_server.py

# Run test
python orchestrator.py --scenario realtime_video_understanding --profile 5g_urban --runs 10
```

**Chat with token IDs** sends the prompt as token identifiers to an OpenAI-compatible server running an open-source model. Copy the tokenizer files to a folder, and set `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `MODEL_NAME` and `TOK_PATH` in `.env`:

```bash
# Start up OpenAI-compatible server (locally or remotely)
# Edit .env file with OPENAI_BASE_URL, OPENAI_API_KEY, MODEL_NAME, TOK_PATH

# Run test
python orchestrator.py --scenario chat_token --profile 5g_urban --runs 10
```

Both can also be run over the `lossy` profile with packet capture; the repository README gives the full commands. The README sets that profile to a fixed 10 % loss with no added delay, while TR 26.870 clause D.3.1 defines it as configurable from 1 % to 30 %, as used in annex D.5.1.

</details>

<details>
<summary>Agentic scenarios: personal assistant and agent-to-agent</summary>

TR 26.870 defines a personal assistant agent scenario (clause D.1.2.9) and agent-to-agent collaboration scenarios (clause D.1.2.10), and reports a campaign with them in clause C.3.3. The README of the `refactor` branch lists them as `openclaw_personal_assistant`, `a2a_single_task_local` and `a2a_streaming_local`, with the OpenClaw and A2A phases for `--enable`. That branch is an open pull request and is not merged into `main`, so check it before relying on these names.

</details>

<details>
<summary>Reproduce SA4 results</summary>

To cross-check results contributed to SA4, use `run_full_tests.sh`. It runs the full matrix of `configs/scenarios.yaml` across the network profiles, captures L3/L4 traffic, and runs the post-processing: charts, an Excel export, `RESULTS.md`, `TRACES.md`, and an anonymized database.

```bash
cd aitestbed
cp .env.example .env          # fill in at least OPENAI_API_KEY

# Smoke test — 3 runs/scenario, ~30 min depending on scenarios enabled
bash run_full_tests.sh --quick

# Cross-check run — 30 runs/scenario (default --full), hours to a day
bash run_full_tests.sh

# Narrow to a single phase to reproduce a specific contribution
bash run_full_tests.sh --enable chat --runs 30
bash run_full_tests.sh --enable realtime --runs 30
bash run_full_tests.sh --enable vllm --runs 30
```

A full run can take many hours. If it is interrupted, re-run it with the same parameters and `--resume`: completed combinations are skipped and new results are appended to the existing database. Keep packet capture on for cross-check runs, and match the run count (`--runs N`) to the contribution being checked. The repository README lists every option.

</details>

<details>
<summary>Use the network emulator on its own</summary>

The network emulator, `netemu`, is a standalone package and can shape traffic for any measurement, not only the AI scenarios. Every queueing discipline it creates is cleared when the block exits:

```python
from netemu import NetworkEmulator
with NetworkEmulator(interface="eth0",
                     profiles_path="configs/profiles.yaml") as emulator:
    emulator.apply_profile("cell_edge")
    run_scenario()
# every queueing discipline created by the emulator is cleared on exit
```

The profiles and their parameters (TR 26.870 table D.3.1-1) are on [Test design](../scope#network-profiles), and the emulator itself (annex E) on [Test design](../scope#network-emulator).

</details>

<details>
<summary>Extend it</summary>

- **A new scenario:** create a class in `scenarios/` that extends `BaseScenario`, register it in `scenarios/__init__.py`, and add an entry in `configs/scenarios.yaml`.
- **A new provider:** implement a client in `clients/` that subclasses `LLMClient`, and register it in the orchestrator client factory.

To contribute changes, see the [6G-Testbed](https://github.com/5G-MAG/6G-Testbed) repository and [How to Contribute](/contributing).

</details>

## Video introduction

An introduction to the network emulator and the AI traffic characterization framework is on the [Developer Exchange](../tutorials#developer-exchange).

<details>
<summary>Sources for this page</summary>

- **Steps, extension, vLLM and source location:** TR 26.870 V0.6.1, annex B.3. Trace logging with `TRACE_PAYLOADS=1` and the capture options: annex B.1.
- **Network emulator:** TR 26.870 V0.6.1, annex E.1 and listing 4.4.3-1 (numbered as in the annex).
- **Commands, requirements, Docker and `run_full_tests.sh`:** the README files of the 6G-Testbed repository (root and `aitestbed/`).
- **Token and real-time video scenarios:** TR 26.870 V0.6.1, clauses D.1.2.1, D.1.2.5, C.8.6 and D.5.1; commands from `aitestbed/README.md` on the `development` branch.
- **Agentic scenarios:** TR 26.870 V0.6.1, clauses D.1.2.9, D.1.2.10 and C.3.3; scenario names from `aitestbed/README.md` on the `refactor` branch.

</details>

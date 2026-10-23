---
title: 6G AI Traffic Characterization Testbed
sidebar_label: 6G AI Traffic Characterization Testbed - install, run and extend
hide_title: true
sidebar_position: 0
description: "Install and run the 6G AI Traffic Characterization Testbed: from a single test to the full matrix, with its network emulator used alone and extended."
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
<span class="topic-banner__kicker">AI Traffic Characterization</span>
<h1>6G AI Traffic Characterization Testbed</h1>
</div>
</div>

In this tutorial you install the 6G AI Traffic Characterization Testbed, run chat, real-time, video and agentic tests over emulated network profiles, reproduce the full test matrix used to cross-check SA4 results, use the network emulator (`netemu`) on its own, and add your own tests and providers. The testbed is described in TR 26.870 annexes B to E; the clauses are given where they apply.

:::tip[Read the READMEs first]
The testbed has three README files. Read the [root README](https://github.com/5G-MAG/6G-Testbed#readme) before you start, the [aitestbed README](https://github.com/5G-MAG/6G-Testbed/blob/main/aitestbed/README.md) when you reach sections 2 to 5, and the [netemu README](https://github.com/5G-MAG/6G-Testbed/blob/main/netemu/README.md) for section 6. The metrics are documented in [METRICS.md](https://github.com/5G-MAG/6G-Testbed/blob/main/aitestbed/METRICS.md) and the agentic tests in [AGENTIC.md](https://github.com/5G-MAG/6G-Testbed/blob/main/aitestbed/AGENTIC.md).
:::

| Repository | What it is | Used in |
|---|---|---|
| [6G-Testbed](https://github.com/5G-MAG/6G-Testbed) | The testbed: `aitestbed/` orchestrates tests, clients and application-layer metrics; `netemu/` shapes the network, captures packets and parses them | All sections |

| You want | Go to |
|---|---|
| A first result with one chat test over one network profile | [1. Install and run a first test](#1-install-and-run-a-first-test) |
| To run the tests and read the results | [2. Run tests and read the results](#2-run-tests-and-read-the-results) |
| To reproduce the SA4 cross-check run | [3. Run the full matrix](#3-run-the-full-matrix) |
| The chat with token IDs and real-time video understanding tests | [4. Token and real-time video tests](#4-token-and-real-time-video-tests) |
| The OpenClaw personal assistant and agent-to-agent (A2A) tests | [5. Agentic tests](#5-agentic-tests) |
| Network shaping, capture and packet metrics without the AI tests | [6. Use netemu on its own](#6-use-netemu-on-its-own) |
| To add a test, a provider or a network profile | [7. Extend the testbed](#7-extend-the-testbed) |

**You need:** a Linux machine with Python 3.10 or later, `iproute2`, `tcpdump`, and either sudo rights for `tc`, `tcpdump`, `ip` and `modprobe` or Docker with the `NET_ADMIN` capability; Node.js 18 or later for the MCP servers (22 or later for the OpenClaw test); an OpenAI API key for the first test. The video and local-model tests need an NVIDIA GPU with about 30 GB of memory (about 2.5 GB for the video client and 27 GB for the server) and CUDA Toolkit 12.1 or later. A full run with packet capture produces a few GB of captures.

## 1. Install and run a first test

Clone the repository and install `netemu` (with the `pcap` extra, which brings the packet parser) and the testbed dependencies:

```bash
git clone https://github.com/5G-MAG/6G-Testbed.git
cd 6G-Testbed
python -m venv venv
source venv/bin/activate

pip install -e "netemu[pcap]"
pip install -r aitestbed/requirements.txt
```

The emulator needs the right to change queueing disciplines, and the packet capture needs `tcpdump`. Allow them once without a password prompt:

```bash
TCPDUMP_PATH=$(which tcpdump)
echo "$USER ALL=(ALL) NOPASSWD: /usr/sbin/tc, $TCPDUMP_PATH, /usr/sbin/modprobe, /usr/sbin/ip" \
  | sudo tee /etc/sudoers.d/testbed
sudo chmod 440 /etc/sudoers.d/testbed
```

Set the key and run one chat test over the `5g_urban` profile, 10 times (the command shown in TR 26.870 annex B.3):

```bash
export OPENAI_API_KEY="your-key"
cd aitestbed
python orchestrator.py --scenario chat_basic --profile 5g_urban --runs 10
```

**Check:** the run writes one record per request to the SQLite database `logs/traffic_logs.db` and an aggregated report to `results/reports/experiment_report.json`. Count the records of the test:

```bash
python -c "import sqlite3; print(sqlite3.connect('logs/traffic_logs.db').execute('select count(*) from traffic_logs').fetchone())"
```

:::tip[Hosted keys and the other providers]
Each provider reads its key from the environment: `OPENAI_API_KEY`, `GOOGLE_API_KEY`, `DEEPSEEK_API_KEY`, `BRAVE_API_KEY`, `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`, `ALPACA_API_KEY` and `ALPACA_SECRET_KEY`. You can also copy `.env.example` to `.env` and fill it in. To evaluate a self-hosted model without a commercial key, use the vLLM client and a test such as `chat_vllm` (see [More run options](#2-run-tests-and-read-the-results)).
:::

<details>
<summary>Install with Docker instead</summary>

Build from the root of the repository and grant `NET_ADMIN`:

```bash
docker build -t 6g-ai-testbed -f aitestbed/Dockerfile .
docker run --rm --cap-add=NET_ADMIN \
  -e OPENAI_API_KEY="your-key" \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/results/reports:/app/results/reports \
  6g-ai-testbed:latest \
  python orchestrator.py --scenario chat_basic --profile 5g_urban --runs 10
```

The image also starts an interactive shell with `--shell`. Docker Compose (`docker compose up -d testbed`) and the Makefile shortcuts (`make build`, `make test`, `make shell`, `make all`) are in the aitestbed README. Mount `results/captures` and `results/l7_captures` as well to keep packet captures and L7 logs.

</details>

<details>
<summary>Optional installs for other tests</summary>

- **MCP servers for the agent tests:** `npm install -g @modelcontextprotocol/server-brave-search @modelcontextprotocol/server-filesystem @modelcontextprotocol/server-memory`.
- **Video and WebRTC tests that use the modified `aiortc`:** `pip install -e aiortc-main-clean` from the root of the repository (section 4).
- **Browser tests:** `pip install playwright && playwright install chromium`.

</details>

## 2. Run tests and read the results

Run all commands from the `aitestbed` folder. The routine is the same for every test: pick a test and a profile, run, read the database and the report.

```bash
python orchestrator.py --list-scenarios      # the tests that are configured
python orchestrator.py --list-profiles       # the network profiles

# one test over one profile
python orchestrator.py --scenario chat_basic --profile 5g_urban --runs 10

# one test over several profiles: one command for each profile (--profile takes one name)
for p in 5g_urban cell_edge; do
  python orchestrator.py --scenario chat_basic --profile "$p" --runs 10
done

# the full matrix, as in TR 26.870 annex B.3
python orchestrator.py --scenario all --runs 5

# add layer 3 and 4 packet capture
python orchestrator.py --scenario chat_basic --profile 5g_urban --runs 10 --capture-pcap
```

**Check:** with `--capture-pcap` a `.pcap` file with a metadata file next to it appears in `results/captures/` for each run.

<details>
<summary>More run options</summary>

- **Capture:** `--capture-pcap` records L3/L4 traffic with `tcpdump`, and the network-layer metrics need it; `--capture-l7` records L7 traffic through mitmproxy into `results/l7_captures/`. `--capture-dir` sets the folder of the captures. `--interface` names the interface to shape and capture (`auto` detects it; `lo` for a model on the same machine).
- **Paths:** `--config`, `--profiles`, `--db` and `--report` change the test file, the profile file, the database and the report.
- **Shaping direction:** shaping is applied in both directions by default. Add `--egress-only` to shape only egress, or `--ingress-profile <profile>` to use another profile on the downlink, for example `--profile 5g_urban --ingress-profile satellite_leo`.
- **Self-hosted model:** start vLLM, then run `chat_vllm` or `video_understanding_vllm`. The Docker route of the aitestbed README starts the container `vllm-testbed` with `Qwen/Qwen3-VL-30B-A3B-Instruct` on `127.0.0.1:8000`; the full-suite script starts and stops it for you by default (`MANAGE_VLLM`, see section 3).
- **Payload traces:** set `TRACE_PAYLOADS=1` to also log protocol and payload traces, such as WebRTC SDP samples and the request and response payloads of an agent (TR 26.870 annex B.1). The traces are redacted recursively and kept private to the run.
- **From Python:** `from orchestrator import TestbedOrchestrator`, then `TestbedOrchestrator().run_experiment("chat_streaming", "5g_urban", runs=10)`.

</details>

<details>
<summary>The network profiles</summary>

The profiles are in `configs/profiles.yaml`, aligned with the SA4 contribution S4-260848 (TR 26.870 clause D.3.1, table D.3.1-1). The full matrix uses ten of them: `no_emulation`, `6g_itu_hrllc`, `5g_urban`, `wifi_good`, `cell_edge`, `satellite_leo`, `satellite_geo`, `congested`, `5qi_7` and `5qi_80`. The `satellite_*` profiles have a separate uplink block. The profiles and their parameters are on [Test design](../scope#network-profiles).

The repository also defines `lossy`: 0 ms delay, no jitter and a fixed 10 % packet loss, with no rate limit. The TR defines the same profile as a loss between 1 % and 30 % (clause D.3.1, used at 1, 3, 5, 10, 20 and 30 % in annex D.5.1). The token and video tests of section 4 run over it.

</details>

<details>
<summary>Where each metric is computed</summary>

The metrics come from three places (aitestbed README and METRICS.md). Application-layer metrics, such as time to first token, time to last token, percentiles, token rates, agent loops, stalls and request burstiness, are computed by `analysis/metrics.py` from the SQLite log. The RAN2 methodology metrics (S4-260859, Q1 to Q5) are computed by `analysis/ran2_metrics.py`, which joins the pcap metrics to the session records. Network-layer metrics, such as handshake round-trip time, TLS setup, retransmissions, per-direction volumes, windowed throughput and burst segmentation, are computed by `netemu.pcap` from the captures. The RAN2 families that depend on packets stay empty unless you run with `--capture-pcap`. The definitions are on [Metrics](../metrics).

</details>

## 3. Run the full matrix

To cross-check results contributed to SA4, use `run_full_tests.sh`. It runs the matrix defined under `test_matrix:` in `configs/scenarios.yaml` over the ten profiles above, captures L3/L4 packets, and runs the whole report pipeline: charts, an Excel workbook, `RESULTS.md`, `TRACES.md`, and an anonymized copy of the database.

```bash
cd aitestbed
cp .env.example .env          # fill in at least OPENAI_API_KEY

# Smoke test: 3 runs per test, about 30 minutes depending on the phases enabled
bash run_full_tests.sh --quick

# Cross-check run: 10 runs per test by default, hours to a day
bash run_full_tests.sh

# Publication run: 30 runs per test
bash run_full_tests.sh --full

# One phase only, to reproduce a specific contribution
bash run_full_tests.sh --enable chat --runs 30
bash run_full_tests.sh --enable realtime --runs 30
bash run_full_tests.sh --enable vllm --runs 30
```

The default is 10 runs per test and profile (`RUNS_PER_SCENARIO`); `--full` sets 30 and `--runs N` sets any number. Match the run count to the contribution you check.

| Option | Effect |
|---|---|
| `--quick` | 3 runs per test and short delays |
| `--full` | 30 runs per test |
| `--runs N` | exactly N runs |
| `--enable LIST`, `--disable LIST` | run only, or skip, the listed phases (comma separated) |
| `--stress` | add the burst and parallel search phase |
| `--no-capture` | switch off packet capture (leave it on for cross-check runs) |
| `--no-anonymize` | keep the real provider and model names |
| `--no-clean` | keep the earlier database and captures |
| `--resume` | continue an interrupted run (below) |
| `--add-runs N` | append N more runs of every combination to the existing cycle; the script help says it is exclusive with `--resume` |
| `--verbose`, `-v` | full log instead of a progress bar |

The phases for `--enable` and `--disable` are `chat`, `realtime`, `image`, `search`, `deepseek`, `gemini`, `music`, `trading`, `computer_use`, `playwright`, `multimodal`, `google_search`, `stress`, `vllm`, `openclaw` and `a2a`. The `openclaw` and `a2a` phases run only when you enable them (section 5). The local video and token ID tests are not phases of the full suite; section 4 runs them.

**Check:** the run ends with a summary of duration, records, success rate and failed tests with the path of each log. These files are produced, relative to `aitestbed/`:

| File | Content |
|---|---|
| `logs/traffic_logs.db` | per-request records |
| `results/reports/experiment_report.json` | aggregated metrics in the 3GPP report format |
| `RESULTS.md`, `TRACES.md` | evaluation report; sample request and response traces |
| `results/reports/figures/`, `results/reports/chart_data.xlsx` | charts; a 15-sheet workbook |
| `results/captures/`, `results/l7_captures/` | packet captures; L7 logs when enabled |
| `logs/backups/<timestamp>/` | the previous database and captures, archived at a clean start |

For a submission, attach `RESULTS.md`, the figures folder and, if requested, the anonymized database.

### Resume an interrupted run

A full run takes 8 to 24 hours, so expect an interruption. Run again with the same parameters and add `--resume`:

```bash
bash run_full_tests.sh --resume
bash run_full_tests.sh --resume --runs 30
bash run_full_tests.sh --resume --enable vllm
```

The script reads `logs/traffic_logs.db` and skips every test and profile that already has the target number of completed sessions. Sessions with every record successful, and sessions that ended in a timeout under a harsh profile, count as completed; a session with a failed record is run again. New runs are appended, no existing row is changed, and the reports are regenerated over the whole database. Start without `--resume` after you change a profile, a model or a prompt, because the earlier runs are then no longer comparable. To top a `--quick` run up to `--full`, run `bash run_full_tests.sh --resume --full`.

### Settings

Set these in `.env` or in the shell before the command (`bash run_full_tests.sh --help` lists more).

| Variable | Default | Purpose |
|---|---|---|
| `RUNS_PER_SCENARIO` | 10 | runs per test and profile |
| `RUN_TIMEOUT_SEC` | 600 | timeout of one run; raise it for slow reasoning models |
| `NETWORK_INTERFACE` | `auto` | pin the interface to shape and capture |
| `CAPTURE_FILTER` | HTTP(S) and WebRTC ports | the capture filter: ports 443, 80, 8080 and 8000, and the ICE, STUN, TURN, SRTP, RTP and RTCP UDP ports 3478, 3479, 5349, 5350 and 19302 |
| `CAPTURE_LOOPBACK` | `true` | second capture on `lo`, for MCP over HTTP and for local tests |
| `MCP_TRANSPORT` | `http` | MCP over HTTP, so that tool traffic is shaped; `stdio` bypasses the shaping |
| `MANAGE_VLLM`, `VLLM_BACKEND` | `true`, `docker` | start and stop the vLLM container; set `MANAGE_VLLM=false` if you run vLLM yourself |
| `MANAGE_OPENCLAW`, `OPENCLAW_AUTO_INSTALL` | `true`, `true` | manage the OpenClaw gateway (section 5) |
| `TRACE_PAYLOADS` | `0` | set to `1` for redacted payload traces |
| `STOP_ON_ERROR` | `true` | stop at the first failed run; continue later with `--resume` |

:::tip[Before a long run]
Read the preamble the script prints. A phase whose API key is missing is skipped, and without passwordless `sudo` for `tc` and `tcpdump` the script warns and runs `no_emulation` only. The local-model phase `vllm` needs a GPU (use `--disable vllm` without one), and `playwright` and `computer_use` need Chromium. Raise `RUN_TIMEOUT_SEC` to 1200 if you see `timeout_*` session IDs. Run the script in `tmux` or with `nohup`.
:::

<details>
<summary>Clear stale network rules</summary>

The script clears its shaping rules at start and on exit. After a `SIGKILL`, clear them yourself (replace `<iface>` with your interface):

```bash
sudo tc qdisc del dev <iface> root; sudo tc qdisc del dev <iface> ingress
sudo tc qdisc del dev lo root;     sudo tc qdisc del dev lo ingress
sudo tc qdisc del dev ifb0 root;   sudo ip link set dev ifb0 down
```

</details>

<details>
<summary>Real-time voice and WebRTC tests</summary>

The `realtime_*` tests call the OpenAI Realtime API over WebSocket and WebRTC. The WebRTC tests use the general-availability handshake: the SDP offer and the session configuration go as multipart fields to `/v1/realtime/calls`, and events use the `session` and `response.output_*` schema over the data channel. For a quick check of the RTP capture:

```bash
python orchestrator.py --scenario realtime_audio_webrtc \
  --profile no_emulation --runs 1 --interface auto \
  --capture-pcap --capture-dir results/captures
```

**Check:** the primary capture holds the bidirectional UDP flow to one of the default WebRTC service ports. The paired loopback capture holds only local testbed traffic and is not the media source.

</details>

## 4. Token and real-time video tests

These two tests, in which TR 26.870 observes tokenized traffic (clause C.8.6, table C.8.6-1), run a model on your own machine or server. They are not phases of `run_full_tests.sh`. Run them through the orchestrator, or with `run_vlm_test.sh` and `run_chat_test.sh`, which repeat the test over a list of profiles.

### 4.1 Real-time video understanding

The `realtime_video_understanding` test (TR 26.870 clauses D.1.2.5 and D.5.1) streams video frames over WebRTC to a vision language model hosted locally and records the traffic of the uplink video and the downlink answers.

1. Install the modified `aiortc` from the root of the repository: `pip install -e aiortc-main-clean`.
2. Download the tokenizer files [vqgan.ckpt](https://huggingface.co/spaces/Junfeng5/Liquid_demo/resolve/main/chameleon/vqgan.ckpt) and [vqgan.yaml](https://huggingface.co/spaces/Junfeng5/Liquid_demo/resolve/main/chameleon/vqgan.yaml) into `aiortc-main-clean/src/aiortc/liquid/checkpoints/chameleon`.
3. Download all files of [Liquid_V1_7B](https://huggingface.co/Junfeng5/Liquid_V1_7B/tree/main) into `aiortc-main-clean/src/aiortc/liquid/checkpoints/model`.
4. Download a StreamingBench dataset and unzip it where the table says. The test has two task classes, each with its own dataset and configuration entry:

| Task class | Dataset | Unzip to |
|---|---|---|
| `real` | [Real-Time Visual Understanding_1-50.zip](https://huggingface.co/datasets/mjuicem/StreamingBench/resolve/main/Real-Time%20Visual%20Understanding_1-50.zip) | `aitestbed/examples/assets/dataset_real` |
| `proactive_output` | [Proactive Output_1-25.zip](https://huggingface.co/datasets/mjuicem/StreamingBench/blob/main/Proactive%20Output_1-25.zip) | `aitestbed/examples/assets/dataset` |

The entry `realtime_video_understanding` in `configs/scenarios.yaml` is set to `task_class: "real"`. For `proactive_output`, change it to `task_class: "proactive_output"` with `results_dir` and `video_paths` set to `examples/assets/dataset/`; a commented example is in the file.

5. Start the server, then the test:

```bash
cd aitestbed
# start the server first
python ./server/realtime_vlm_server.py

# run the test
python orchestrator.py --scenario realtime_video_understanding --profile 5g_urban --runs 10
```

To keep a trace of the lossy profile, with the capture on the loopback interface:

```bash
PROFILE=lossy
python orchestrator.py \
  --scenario realtime_video_understanding \
  --profile $PROFILE \
  --runs 20 \
  --interface lo \
  --capture-pcap \
  --capture-dir results/captures/vlm/${PROFILE} \
  --report results/reports/experiment_report_realtime_video_understanding_${PROFILE}.json \
  --db logs/traffic_logs_vlm_${PROFILE}.db \
  --egress-only
```

The model server runs on the same host, and ICE offers no `127.0.0.1` candidate, so the media travels between the address of the primary interface and itself, over `lo`. The test therefore declares `uses_loopback`: the testbed starts the loopback capture and shapes all UDP on `lo` plus the TCP signalling port with the active profile. **Check:** the video media is in the `capture_lo_*.pcap` file of the capture folder, not in the primary capture.

To run the test over a list of profiles, use `bash run_vlm_test.sh` from `aitestbed`. It runs 2 runs per profile (`RUNS` at the top of the script) for `congested`, `no_emulation`, `lossy`, `6g_itu_hrllc`, `5g_urban`, `cell_edge`, `5qi_7` and `5qi_80`, waits 20 seconds between profiles, writes a database, report and capture folder per profile, and archives the results in `archived_results/`. Edit the variables at the top to change the runs and the interval.

How to read the result: each inference call uses only the most recent received frame, and the questions are part of the client request, not timed to the video. The test measures the traffic shape and volume of a continuous uplink video stream against the downlink answers, not the accuracy of multi-frame video understanding.

### 4.2 Chat with token IDs

The `chat_token` test (TR 26.870 clause D.1.2.1) sends the prompt as token identifiers to an OpenAI-compatible server that runs an open-source model.

1. Start an OpenAI-compatible server with an open-source model, on this machine or another.
2. Copy the tokenizer files of the model to a folder.
3. Set `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `MODEL_NAME` and `TOK_PATH` (the tokenizer folder) in `.env`. The base URL looks like `http://<server>:<port>/v1`, where `<server>` and `<port>` are those of your server.
4. Run the test:

```bash
cd aitestbed
python orchestrator.py --scenario chat_token --profile 5g_urban --runs 10
```

To keep a trace of the lossy profile:

```bash
PROFILE=lossy
python orchestrator.py \
  --scenario chat_token \
  --profile $PROFILE \
  --runs 10 \
  --interface eno1 \
  --capture-pcap \
  --capture-dir results/captures/${PROFILE} \
  --report results/reports/experiment_report_chat_token_${PROFILE}.json \
  --db logs/traffic_logs${PROFILE}.db
```

Replace `eno1` with the interface that reaches your server. `bash run_chat_test.sh` repeats the test over the same eight profiles as the video script (10 runs each, 20 seconds between profiles) with `--interface lo`, which suits a server on the same machine; edit the script for a remote server.

**Check:** the database holds records for `chat_token`, and the capture folder holds one capture per run.

### 4.3 Other loss values

The `lossy` profile is a fixed 10 % loss with no added delay. The TR uses 1, 3, 5, 10, 20 and 30 % in annex D.5.1. For the other values, add a profile with the same fields and another `loss_pct` to `configs/profiles.yaml`, then pass its name to `--profile`.

## 5. Agentic tests

TR 26.870 defines a personal assistant agent (clause D.1.2.9) and agent-to-agent collaboration (clause D.1.2.10), and reports a campaign with them in clause C.3.3. The repository runs them as the OpenClaw test and the A2A tests. Both register a provider that makes no model calls, so the testbed builds them without an API key, and both run only when you enable them, because they need setup outside the repository.

| Test | Transport | What it does |
|---|---|---|
| `openclaw_personal_assistant` | local gateway on `127.0.0.1:18789`, plus the LLM and tool traffic of OpenClaw | drives the local OpenClaw agent |
| `a2a_single_task_local` | JSON-RPC `message/send` on loopback | one task against a local echo agent |
| `a2a_streaming_local` | JSON-RPC `message/stream` (server-sent events) on loopback | streaming artifact updates from a local echo agent |
| `a2a_multi_agent_local` | multi-hop on loopback | an orchestrator agent delegates to two downstream agents |
| `a2a_single_task_remote`, `a2a_streaming_remote` | JSON-RPC over the main interface | the same calls against an external agent (`A2A_REMOTE_AGENT_URL`) |

### 5.1 OpenClaw personal assistant

[OpenClaw](https://openclaw.ai) is a self-hosted personal agent that connects a model to browser, file and shell tools. It runs a gateway on `127.0.0.1:18789` and calls its model from its own process. The testbed runs one agent turn per prompt with `openclaw agent --json --session-id <random> -m "<prompt>"` through the gateway, with a new session for each turn so that the context stays small between turns. The control channel on `lo:18789` is shaped and captured on loopback; the model and tool traffic is shaped on the main interface.

**Managed run.** You need Node.js 22 or later (the script activates `nvm` if the system Node is older and `nvm` is present) and `OPENAI_API_KEY` in the environment, because OpenClaw uses `openai/gpt-5.5` by default. Then:

```bash
cd aitestbed
bash run_full_tests.sh --enable openclaw --runs 5
```

With `MANAGE_OPENCLAW=true` (the default) the script installs the CLI if it is missing (`OPENCLAW_AUTO_INSTALL=true`, version `openclaw@2026.7.1-2`, into `OPENCLAW_NPM_PREFIX`, by default `~/.npm-global`, so that no root rights are needed), sets `gateway.auth.mode=none` so that the local CLI can open the gateway without credentials, starts `openclaw gateway run --allow-unconfigured --auth none --port 18789 --force`, runs the test over all profiles, and stops the gateway on exit. If Node is older than 22 and `nvm` is missing, the script stops and says to upgrade. Set `MANAGE_OPENCLAW=false` to run OpenClaw yourself, and use `OPENCLAW_START_CMD` and `OPENCLAW_STOP_CMD` to replace the start and stop commands.

**Manual run** (gateway already running):

```bash
python orchestrator.py --scenario openclaw_personal_assistant --profile 5g_urban --runs 1 --capture-pcap
```

**Check:** the database holds one record per turn with `record_type: openclaw_task` in its metadata, and the loopback capture of port 18789 is not empty. Read the results with care: `response_bytes` is the size of the CLI JSON result (about 20 KB), not network bytes, so take volumes from the captures; the CLI call is blocking, so time to first token and time to last token equal the total latency; and the average latency in the end-of-run summary includes capture placeholder rows, so use `RESULTS.md` for latency.

### 5.2 Agent-to-agent (A2A)

The A2A tests use the official `a2a-sdk` (version 1.1.x, installed by `requirements.txt`) for the client and the servers. The local agents are deterministic and make no model calls, so the traffic shows the cost of the protocol and transport. The three local tests are `a2a_single_task_local` (`message/send`), `a2a_streaming_local` (`message/stream`, with six chunks 40 ms apart) and `a2a_multi_agent_local` (an orchestrator on port 9003 that delegates to agents on ports 9001 and 9002). The testbed starts the agents as subprocesses on loopback, captures the agent ports on `lo`, and shapes the target port with the profile.

```bash
cd aitestbed
bash run_full_tests.sh --enable a2a --runs 10               # all local tests over all profiles
python orchestrator.py --scenario a2a_single_task_local --profile cell_edge --runs 5 --capture-pcap
python orchestrator.py --scenario a2a_streaming_local   --profile 5g_urban  --runs 5
python orchestrator.py --scenario a2a_multi_agent_local --profile congested --runs 5
```

**Check:** the database holds records with `record_type` `a2a_task` (or `a2a_delegation` for the multi-agent test); for the streaming test `chunk_count` is above 1, and a loopback capture of the agent ports is in `results/captures/`. In the multi-agent test only the target port is shaped: the hop from the client to the orchestrator is shaped, and the downstream hops are captured.

**Remote agent.** Free public A2A agents that work with the current SDK are hard to find, so host your own and expose it through a tunnel. This example uses `cloudflared` (a quick tunnel needs no account):

```bash
cloudflared tunnel --url http://localhost:9001      # prints https://<tunnel-host>
python -m a2a_agents.echo_agent --port 9001 --public-url https://<tunnel-host>
export A2A_REMOTE_AGENT_URL=https://<tunnel-host>
python orchestrator.py --scenario a2a_single_task_remote --profile 5g_urban --runs 5
```

`<tunnel-host>` is the address the tunnel prints. `--public-url` makes the agent card advertise the tunnel address, so that the client dials the tunnel and not `localhost`. Run the `python -m` command from `aitestbed`. For a stable address, host the agent on a small server and point `A2A_REMOTE_AGENT_URL` at it. The remote tests go over the main interface, with the egress shaping and the primary capture. `run_full_tests.sh --enable a2a` includes the remote test when `A2A_REMOTE_AGENT_URL` is set.

<details>
<summary>Settings of the agentic tests</summary>

In `configs/scenarios.yaml`, the OpenClaw entry has `drive` (`cli`, or `http` to post to the gateway), `cli_args` (the command template with `{session}` and `{prompt}`), `gateway_url`, `loopback_ports` (`[18789]`, which turns on the loopback capture and shaping) and `task_timeout_sec`. An A2A entry has `streaming` (`false` for `message/send`, `true` for `message/stream`), `agents` (the local agents to start, with `module`, `port` and `args`), `target_port`, `loopback_ports`, `agent_card_url` or `agent_card_url_env` for a remote agent, `agent_card_path` (for an agent that serves the card at `/.well-known/agent.json`) and `request_timeout_sec` (60 s by default). The design is in AGENTIC.md.

</details>

## 6. Use netemu on its own

`netemu` is a standalone package. It shapes traffic, captures it with `tcpdump`, parses the capture into network-layer metrics, and aggregates many captures into distributions, for any measurement and not only the AI tests. It imports nothing from the testbed. Install it from the repository without the rest of the testbed:

```bash
pip install "netemu[pcap] @ git+https://github.com/5G-MAG/6G-Testbed.git#subdirectory=netemu"
```

Shape traffic and capture it; every queueing discipline the emulator creates is cleared when the block exits and the capture stops with a metadata file written:

```python
from netemu import NetworkEmulator, capture_to, analyze_pcap

with NetworkEmulator(interface="eth0") as emu:
    emu.apply_profile("cell_edge")
    with capture_to("run.pcap", interface="eth0", filter_expr="port 443"):
        run_workload()

m = analyze_pcap("run.pcap", target_ports=[443])
print(f"{m.total_packets} packets in {m.tcp_flows} TCP flows")
print(f"handshake RTT: mean {m.rtt_mean_ms:.1f} ms, p95 {m.rtt_p95_ms:.1f} ms")
print(f"retransmissions: {m.retransmission_rate:.2%}")
print(f"UL/DL bytes: {m.ul_bytes_total} / {m.dl_bytes_total}")
print(f"burstiness @100ms: {m.burstiness_by_window['100ms']:.2f}")
```

Replace `run_workload()` with the program you measure. Aggregate a folder of captures into distributions:

```python
from netemu import analyze_multiple_pcaps, compute_packet_metrics

captures = analyze_multiple_pcaps("captures/", target_ports=[443, 8443])
report = compute_packet_metrics(captures)
print(report.connection.connection_setup_ms.p95)
print(report.direction.ul_dl_byte_ratio)
```

**Check:** the first script prints the packet count, the round-trip time and the volumes of your workload.

<details>
<summary>Your own profile, asymmetric links and loopback</summary>

- **Settings without a profile file:** `emu.apply_settings(delay_ms=100, loss_pct=1.0, rate_mbit=10)`, then `emu.clear()`.
- **Profile file:** `NetworkEmulator(interface="eth0", profiles_path="configs/profiles.yaml")`. An example file is `netemu/examples/profiles.yaml`.
- **Different uplink and downlink:** `emu.apply_profile("good_wifi", ingress_profile="poor_cellular")`.
- **Two programs on one machine:** their traffic crosses `lo`, not the shaped interface. Use `emu.apply_profile_to_loopback("poor_cellular", 8080)` for one TCP port, `selectors=[("udp", None), ("tcp", 1234)]` for a local WebRTC session (all UDP plus a TCP port), and `emu.clear_loopback()` to remove the rules. A one-way delay on `lo` gives a round trip of about twice that value, because both directions cross `lo`.

The profiles and their parameters (TR 26.870 table D.3.1-1) are on [Test design](../scope#network-profiles), and the emulator itself (annex E) on [Test design](../scope#network-emulator). The package is tested with `python -m pytest netemu/tests`.

</details>

## 7. Extend the testbed

- **A new test:** create a class in `scenarios/` that extends `BaseScenario`, register it in `scenarios/__init__.py`, and add an entry in `configs/scenarios.yaml`. To include it in the full matrix, add it to `test_matrix:` in the same file.
- **A new provider:** implement a client in `clients/` that subclasses `LLMClient`, register it in `clients/__init__.py` and in the client factory of the orchestrator.
- **A new network profile:** add it to `configs/profiles.yaml`. If it needs a netem parameter that is not modelled yet, extend `NetworkProfile` in `netemu`.
- **A new metric:** a packet-, flow- or window-level metric belongs in `netemu.pcap`; a metric that combines pcap output with session records belongs in `analysis/ran2_metrics.py`; an application-layer metric belongs in `analysis/metrics.py`.

**Check:** `python orchestrator.py --list-scenarios` shows the new test, and `python -m pytest tests` (in `aitestbed`) passes. To contribute changes, see the [6G-Testbed](https://github.com/5G-MAG/6G-Testbed) repository and [How to Contribute](/contributing).

## Video introduction

An introduction to the network emulator and the AI traffic characterization framework is on the [Developer Exchange](../tutorials#developer-exchange).

<details>
<summary>Sources for this page</summary>

- **Steps, extension, vLLM and source location:** TR 26.870 V0.6.1, annex B.3. Trace logging with `TRACE_PAYLOADS=1` and the capture options: annex B.1.
- **Network emulator:** TR 26.870 V0.6.1, annex E.1 and listing 4.4.3-1 (numbered as in the annex).
- **Install, commands, settings, `run_full_tests.sh`, the video and token ID tests, OpenClaw and A2A, and where each metric is computed:** the README files of the 6G-Testbed repository (root, `aitestbed/` and `netemu/`), `aitestbed/METRICS.md`, `aitestbed/AGENTIC.md`, the scripts `run_full_tests.sh`, `run_vlm_test.sh` and `run_chat_test.sh`, and `configs/scenarios.yaml` and `configs/profiles.yaml`.
- **Token and real-time video tests:** TR 26.870 V0.6.1, clauses D.1.2.1, D.1.2.5, C.8.6 and D.5.1. The fixed 10 % of the `lossy` profile is from `configs/profiles.yaml`; the 1 % to 30 % range is from clause D.3.1.
- **Agentic tests:** TR 26.870 V0.6.1, clauses D.1.2.9, D.1.2.10 and C.3.3.
- **Verification:** the commands come from the repository documentation at its current state and have not been run for this page. Check them on a clean machine before you rely on them.

</details>

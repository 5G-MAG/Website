// The "Latest updates and roadmap" slide of each project's slide deck, keyed by the project's slug. Written by the deck
// build (admin-graphics/slides, DECKS_ROADMAP_DIR) so the project page and the deck show the same columns and words.
export const PROJECT_ROADMAPS = {
  "3gpp-platforms": {
    "read": "23 October 2026",
    "merged": "9 pull requests in 2 repositories",
    "phases": [
      {
        "label": "KNOWN GAPS",
        "items": [
          {
            "head": "libscpcf",
            "body": "No optional feature is negotiated, and a termination request from the PCF is not served."
          },
          {
            "head": "libscbsf",
            "body": "Looks up a PCF binding by IPv4 address or IPv6 prefix only; no register or update operation."
          },
          {
            "head": "libscmbsmf",
            "body": "Needs fixes, among them updating a status subscription and the 200 reply where TS 29.532 gives 204."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Open5GS",
            "body": "Open pull requests port the 5G-MAG patches onto Open5GS v2.8.0 and carry collocated NF instances in the NF profile."
          },
          {
            "head": "srsRAN_4G",
            "body": "Open pull requests bring Release 16 features of 5G Broadcast (PBCH repetition, aggregation level 16, CFI in the MIB)."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-5gc-service-consumers 2.1.1",
            "body": "5 Jun 2026. A bug-fix release: memory issues fixed, and the callback is called after a DELETE operation."
          }
        ]
      }
    ],
    "since": "5 Jun 2026"
  },
  "5g-broadcast": {
    "read": "23 October 2026",
    "merged": "61 pull requests in 8 repositories",
    "phases": [
      {
        "label": "PLANNED",
        "items": [
          {
            "head": "Release 17 to 19 transmitter",
            "body": "Wider bandwidths, new UHF bands, CAS muting and interleaving in the QRD and CRD transmitter."
          },
          {
            "head": "Android playback modes",
            "body": "DASH and RTP playback, and seamless switching with DASH, in the MBMS Android Middleware."
          },
          {
            "head": "Docker setup",
            "body": "Container images for the transmitter and the client-side components."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "ETSI TS 103 720 update",
            "body": "The update of the specification for 3GPP Release 18 is in progress."
          },
          {
            "head": "BM-SC and application provider",
            "body": "xMB interface fields reworked to the specification, real Raptor FEC and a stricter FLUTE profile in the BM-SC."
          },
          {
            "head": "MBMS Client announcement",
            "body": "The MBMS Client gains every client-side way of acquiring the service announcement, and a broadcast demo chain."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-libflute 0.12.4",
            "body": "1 Sep 2026. Option to finish sending all files when the transmitter is deactivated; fixes unbounded FDT growth."
          },
          {
            "head": "rt-mbms-examples 1.1.0",
            "body": "5 Nov 2024. Adds configuration changes and sample scripts for the IBC 24 demo."
          },
          {
            "head": "rt-mbms-mw-android 1.0.0",
            "body": "5 Sep 2024. Seamless switching between 5G broadcast and unicast delivery on Android, with HLS support."
          }
        ]
      }
    ],
    "since": "v1.0.0"
  },
  "5g-mbs": {
    "read": "23 October 2026",
    "merged": "40 pull requests in 8 repositories",
    "phases": [
      {
        "label": "REPORTS IN PROGRESS",
        "items": [
          {
            "head": "Service and System Aspects",
            "body": "Technical Report on MBS: Service and System Aspects."
          },
          {
            "head": "Service Layer Aspects",
            "body": "Technical Report on MBS: Service Layer Aspects."
          },
          {
            "head": "RAN Aspects",
            "body": "Technical Report on MBS: RAN Aspects. Further reports cover mobility, RAN procedures and NTN."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "MBS Broadcast demonstration",
            "body": "An end-to-end MBS Broadcast demonstration: 5GC, MBSF, MBSTF, gNB and UE, with DASH over broadcast."
          },
          {
            "head": "Closer to the specifications",
            "body": "Compliance work on the MBSF, the MBSTF, the MBS Client and the application and provider tools."
          },
          {
            "head": "Broadcast in the RAN",
            "body": "More robust MBS Broadcast reception in the UE and the gNodeB, including concurrent sessions."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-mbs-examples v0.4.0",
            "body": "2 Oct 2026. Docker set up for MBS User Services, loadable demo templates and a non-interactive tutorial mode."
          },
          {
            "head": "rt-mbs-function 1.1.0",
            "body": "3 Jul 2026. Support for the Packet Distribution Method for MBS Distribution Sessions."
          },
          {
            "head": "MBS gNodeB v0.1.4-5mbs-srsRAN_Project",
            "body": "14 Jul 2026. MBS support across the gNodeB: broadcast session setup and delivery."
          }
        ]
      }
    ],
    "since": "9 Jun 2026"
  },
  "5gms": {
    "read": "23 October 2026",
    "merged": "21 pull requests in 8 repositories",
    "phases": [
      {
        "label": "UNDER STUDY",
        "items": [
          {
            "head": "Testing in testbeds",
            "body": "Testing of the 5G Media Streaming Reference Tools in testbeds."
          },
          {
            "head": "Commercial OTT app",
            "body": "Integration of the 5GMS clients with a commercial OTT application, a candidate."
          },
          {
            "head": "Advanced Media Delivery",
            "body": "Documentation on the standards related to Advanced Media Delivery."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Reference Tools for Releases 17 and 18",
            "body": "Implementation of the Reference Tools for 3GPP Release 17 and Release 18 is in progress."
          },
          {
            "head": "Several Application Servers",
            "body": "More than one Application Server, also over HTTPS, and integration of the Data Collection Application Function."
          },
          {
            "head": "CMMF and DVB-I",
            "body": "A CMMF recipe in the Docker setup, and a native Android DVB-I client for the 5GMS-Aware Application."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-5gms-application-function v1.4.7",
            "body": "3 Aug 2026. Rejects an invalid content hosting ingest URL and prevents crashes on invalid or missing configuration."
          },
          {
            "head": "rt-5gms-application-server 1.2.5",
            "body": "3 Aug 2026. Adds CMCD capture and forwarding."
          },
          {
            "head": "rt-5gms-application-provider 1.3.0",
            "body": "3 Aug 2026. QoE metrics reporting is absorbed into the Management UI, and CMCD is added."
          }
        ]
      }
    ],
    "since": "v1.4.6"
  },
  "6g": {
    "read": "23 October 2026",
    "merged": null,
    "phases": [
      {
        "label": "FOR FURTHER STUDY",
        "items": [
          {
            "head": "Metrics",
            "body": "Whether and how TTFT, TTLT and tool-call latency can be used for AI traffic evaluation is for further study in TR 26.870."
          },
          {
            "head": "Agentic uplink",
            "body": "Whether the retransmitted context that explains the uplink-heavy agentic traffic occurs in agentic applications is for further study."
          },
          {
            "head": "AI gateway",
            "body": "The test scenario of the AI gateway, and the source code of its call flow, are still to be provided."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Agentic scenarios",
            "body": "Pull request 10 adds the agentic measurement scenarios agreed for the 6G media study and separates network measurement into the standalone netemu package."
          },
          {
            "head": "Video analysis scenarios",
            "body": "Scenario configurations for video-traffic analysis."
          },
          {
            "head": "Chat with token IDs",
            "body": "A chat scenario configuration in which the client sends token identifiers."
          }
        ]
      }
    ]
  },
  "ai-in-media-services": {
    "read": "23 October 2026",
    "merged": null,
    "phases": [
      {
        "label": "UNDER STUDY",
        "items": [
          {
            "head": "Metrics",
            "body": "A careful review and detailed definition of the metrics, and of how the traffic characteristics are measured."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "AI traffic testbed",
            "body": "Agentic measurements for the 6G media study, and video analysis and chat traffic with tokens."
          },
          {
            "head": "Network emulator",
            "body": "Network capture and measurement as a standalone package, which the testbed uses for shaping and pcap analysis."
          },
          {
            "head": "AI and ML evaluation framework",
            "body": "Split inferencing and compressed model transfer, including incremental transfer of model data."
          }
        ]
      }
    ]
  },
  "ai-ml": {
    "read": "23 October 2026",
    "merged": null,
    "phases": [
      {
        "label": "NO SCRIPTS YET",
        "items": [
          {
            "head": "Human pose estimation",
            "body": "The README describes the split inferencing of PoseNet at different layers; the repository has no scripts for it yet."
          },
          {
            "head": "Video super resolution",
            "body": "The README gives the motivation: video calls are typically 480p today and XR calls need more. The repository has no scripts for it yet."
          },
          {
            "head": "Hand gestures and federated learning",
            "body": "The README has the headings and no text. Both are planned."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Bit incremental transfer",
            "body": "A pull request is open to merge the bit incremental transfer feature into the main branch."
          }
        ]
      }
    ]
  },
  "avatar": {
    "read": "23 October 2026",
    "merged": "5 pull requests in 3 repositories",
    "phases": [
      {
        "label": "PLANNED",
        "items": [
          {
            "head": "Body animation support",
            "body": "Planned for rt-avatar-call."
          },
          {
            "head": "Call-flow UI",
            "body": "A UI that supports a call flow."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "v0.10.155",
            "body": "Initial support for Gaussian splatting based avatars, with UnityARF 1.1.0.155; pre-release v0.10.155-b2 is out."
          },
          {
            "head": "Android XR support",
            "body": "Animation generation on AndroidXR is under development."
          },
          {
            "head": "Base Avatar Repository",
            "body": "rt-avatar-bar: the service is ready; the client fetch in rt-avatar-call is pending."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-avatar-call v0.10.154",
            "body": "16 Oct 2026. CLI build tooling and updated default camera framing."
          },
          {
            "head": "rt-avatar-content v0.10.154",
            "body": "16 Oct 2026. Content supporting rt-avatar-call v0.10.154."
          },
          {
            "head": "rt-3gpp-swap v0.9",
            "body": "16 Oct 2026. Closes the TS 26.113 SWAP conformance gaps."
          }
        ]
      }
    ],
    "since": "v0.9.1"
  },
  "beyond-2d": {
    "read": "23 October 2026",
    "merged": "1 pull request in 1 repository",
    "phases": [
      {
        "label": "PLANNED",
        "items": [
          {
            "head": "Test content",
            "body": "Collecting the initial contents for the evaluation of the FS_Beyond2D formats."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Evaluation services",
            "body": "Completing the evaluation setups for the three services of the study."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-beyond2d-evaluation-framework v0.2.1",
            "body": "24 Jul 2025. Adds the point cloud setup and updates for video generation scripts."
          }
        ]
      }
    ],
    "since": "v0.2.0"
  },
  "content-delivery": {
    "read": "23 October 2026",
    "merged": "7 pull requests in 4 repositories",
    "phases": [
      {
        "label": "EARLY STAGE",
        "items": [
          {
            "head": "FLUTE conformance",
            "body": "A validator that tests a FLUTE implementation against the FLUTE profiles, starting with the FLUTE library."
          },
          {
            "head": "rt-cmmf-encoder",
            "body": "A reference implementation of ETSI TS 103 973: no encoder code on the main branch yet, and no release."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "FLUTE library",
            "body": "Further FEC schemes, FLUTE version 2 signalling, congestion control and tunnelled operation, outside the 3GPP profiles."
          },
          {
            "head": "Media origin",
            "body": "Radio channels, real-time push transports and documentation for the media origin server and packager."
          },
          {
            "head": "Reference Media Application",
            "body": "An Android app and a test rig that check each delivery method of the media origin on a phone."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-libflute 0.12.4",
            "body": "1 Sep 2026. Finish-sending option, a tunnel mode test, and fixes for FDT growth and compression."
          }
        ]
      }
    ],
    "since": "0.12.4"
  },
  "data-collection": {
    "read": "23 October 2026",
    "merged": "2 pull requests in 1 repository",
    "phases": [
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Embedding in other functions",
            "body": "The Data Collection AF library is being made to build and run inside other Application Functions, such as the 5G Media Streaming AF."
          },
          {
            "head": "Automated testing",
            "body": "The regression tests are being run automatically, and the library is being hardened against missing configuration."
          },
          {
            "head": "Newer 5G core base",
            "body": "Moving the Data Collection AF to a newer Open5GS release line."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "Data Collection AF 1.1.0",
            "body": "13 May 2025. Fixes a returned status code and adds Docker Compose."
          }
        ]
      }
    ],
    "since": "1.1.0"
  },
  "dvb-i": {
    "read": "23 October 2026",
    "merged": "1 pull request in 1 repository",
    "phases": [
      {
        "label": "PLANNED",
        "items": [
          {
            "head": "Service list acquisition",
            "body": "DVB-I service list acquisition in the 5GMSd-aware application, as in the deployment guidelines."
          },
          {
            "head": "Reference service list",
            "body": "A DVB-I reference service list that uses 5G Media Streaming, for development and demonstration."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Native Android DVB-I client",
            "body": "A native Android DVB-I client inside the 5GMS-Aware Application, following the DVB-I specification."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-5gms-application v1.3.0",
            "body": "26 May 2026. A new demonstration interface for 5GMS features, closely aligned with commercial streaming interfaces."
          }
        ]
      }
    ],
    "since": "v1.3.0"
  },
  "emergency-alerts": {
    "read": "23 October 2026",
    "merged": "4 pull requests in 2 repositories",
    "phases": [
      {
        "label": "UNDER STUDY",
        "items": [
          {
            "head": "ETWS support",
            "body": "The tooling focuses on the CMAS path (SIB12); ETWS notifications (SIB10 and SIB11) are tracked on the boards."
          },
          {
            "head": "More 5G Broadcast transmitter features",
            "body": "Further radio features of the shared transmitter, such as new bands and more robust broadcast signalling."
          },
          {
            "head": "Improvements to the specification",
            "body": "The work towards ETSI TS 103 720 V1.3.1 adds PWS-related improvements."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Custom alert content",
            "body": "A developer will be able to supply custom message content and warning type instead of a hardcoded payload."
          },
          {
            "head": "Cell Broadcast Centre",
            "body": "The CBC takes a warning as JSON and sends it to the MME; the step on to the transmitter is open."
          },
          {
            "head": "Docker support",
            "body": "Running the transmitter in containers."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-mbms-tx-for-qrd-and-crd ea-1.0.0",
            "body": "5 Sep 2024. Release of the transmitter for QRD and CRD devices, for the emergency alerts work."
          },
          {
            "head": "rt-mbms-tx v1.0.0",
            "body": "21 Jun 2023. The first release of the LTE-based 5G Broadcast transmitter."
          }
        ]
      }
    ],
    "since": "1.0.0"
  },
  "rtc": {
    "read": "23 October 2026",
    "merged": null,
    "phases": [
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "Call teardown and errors",
            "body": "The server accepts the acknowledgement that ends a call, and returns the error details the specification asks for."
          },
          {
            "head": "Endpoint selection",
            "body": "Selection among matching endpoints brought in line with the matching rules of the specification."
          },
          {
            "head": "SDP handling",
            "body": "An enforcement point on the answering side, so that a preliminary answer is not sent."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-3gpp-swap v0.9",
            "body": "16 Oct 2026. First release of the SWAP server and its JavaScript library."
          }
        ]
      }
    ]
  },
  "v3c": {
    "read": "23 October 2026",
    "merged": "3 pull requests in 3 repositories",
    "phases": [
      {
        "label": "PLANNED",
        "items": [
          {
            "head": "Haptics over DASH",
            "body": "Streaming of haptics over DASH."
          },
          {
            "head": "Real-time protocols",
            "body": "Support for real-time protocols such as RTP and WebRTC."
          },
          {
            "head": "More synthesizers",
            "body": "Support for an additional synthesizer, such as V-DMC."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "V3C Unity Player",
            "body": "A fuller player on Android: title and source on screen, content library and settings, playback statistics from the decoder."
          },
          {
            "head": "V3C Unity Player",
            "body": "Support for new devices: Meta Quest headsets."
          },
          {
            "head": "Content and origin",
            "body": "Titles that carry their own name, description and environment; real-time push transports in the media origin."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-v3c-unity-player v1.1",
            "body": "30 Sep 2025. Improves V-PCC rendering, with renamed and extended materials and shaders."
          },
          {
            "head": "rt-v3c-decoder-plugin v1.1",
            "body": "30 Sep 2025. Adds the source code of the haptic decoder and synthesizer and of the V-PCC synthesizer."
          },
          {
            "head": "rt-v3c-content v1.1",
            "body": "9 Oct 2025. Adds a V3C DASH packager and tools to generate V-PCC bitstreams."
          }
        ]
      }
    ],
    "since": "v1.0"
  },
  "vops": {
    "read": "23 October 2026",
    "merged": null,
    "phases": [
      {
        "label": "PLANNED",
        "items": [
          {
            "head": "Testing with conformance bitstreams",
            "body": "Every operation point is to be tested with its conformance bitstreams, to confirm the schemas and parsers."
          },
          {
            "head": "Version 19.3.0 of the specification",
            "body": "The Standards page keeps V19.2.0 as the baseline until the validator is rebuilt against V19.3.0, which changes the dual-layer HEVC capabilities."
          }
        ]
      }
    ]
  },
  "xr": {
    "read": "23 October 2026",
    "merged": "23 pull requests in 5 repositories",
    "phases": [
      {
        "label": "UNDER INVESTIGATION",
        "items": [
          {
            "head": "Delivery over 5G Media Streaming",
            "body": "Serving glTF content to rt-xr-unity-player applications."
          },
          {
            "head": "Real-time communication",
            "body": "Avatar based real time communication, TR 26.813 (Release 20 study complete), with the MPEG_node_avatar extension."
          },
          {
            "head": "Split rendering",
            "body": "TS 26.249 (Immersive Audio for Split Rendering Scenarios) and TS 26.565 (Split Rendering Media Service Enabler)."
          }
        ]
      },
      {
        "label": "IN DEVELOPMENT",
        "items": [
          {
            "head": "XR Scene Player",
            "body": "A smartphone app with media control, and compliance work."
          },
          {
            "head": "Reference scenes and validator",
            "body": "Reference scenes that follow ISO/IEC 23090-14, and a scene validator."
          },
          {
            "head": "Media pipelines and loader",
            "body": "Decoding of timed metadata tracks, and fixes for the scene description extensions and interactivity."
          }
        ]
      },
      {
        "label": "RELEASED",
        "items": [
          {
            "head": "rt-xr-unity-player v1.1.0",
            "body": "27 Feb 2025. Media pipelines, video textures and spatial audio sources on Android."
          },
          {
            "head": "rt-xr-blender-exporter v1.1.0",
            "body": "16 Apr 2025. XR anchors defined in Blender and exported as MPEG_anchor glTF extensions."
          }
        ]
      }
    ],
    "since": "v1.1.0"
  }
};

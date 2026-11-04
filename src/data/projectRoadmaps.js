// The "Latest updates and roadmap" block of each project page, keyed by the project's slug: the project's slide of the
// Where We Stand deck (admin-graphics/slides/where_we_stand, sync_website.py), so the page and the deck show the same
// columns and words. A project without a slide there keeps the roadmap of its own deck.
export const PROJECT_ROADMAPS = {
  "5g-broadcast": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Integration of DVB-I with 5G Broadcast",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Release 19 transmitter and receiver",
            "body": ""
          },
          {
            "head": "Docker set-up",
            "body": ""
          },
          {
            "head": "Validator for the BM-SC, the RAN and the signal",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "LTE-based 5G Broadcast transmitter",
            "body": ""
          },
          {
            "head": "Seamless switching between 5G Broadcast and unicast",
            "body": ""
          },
          {
            "head": "Demonstration set-up for IBC 2024",
            "body": ""
          }
        ]
      }
    ]
  },
  "5g-mbs": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "MBS Multicast",
            "body": ""
          },
          {
            "head": "MBS over NTN",
            "body": ""
          },
          {
            "head": "Porting to Release 19",
            "body": ""
          },
          {
            "head": "Support in OCUDU",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "MBS Broadcast Rel-18 end-to-end",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Implementation of MBS User Services including MBSF and MBSTF",
            "body": ""
          },
          {
            "head": "Initial implementation of 5GC, gNodeB and UE supporting MBS",
            "body": ""
          }
        ]
      }
    ]
  },
  "5gms": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Study of implementation of 5GMS and RTC architectures",
            "body": ""
          },
          {
            "head": "Candidate topics from 3GPP AMD Phase 2",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Implementation of Dynamic QoS policies",
            "body": ""
          },
          {
            "head": "Implementation of Network Assistance",
            "body": ""
          },
          {
            "head": "Implementation of CMMF support in 5GMS",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Implementation of Content Hosting",
            "body": ""
          },
          {
            "head": "Implementation of QoE Metrics and Consumption Reporting",
            "body": ""
          },
          {
            "head": "Initial Implementation of CMCD",
            "body": ""
          }
        ]
      }
    ]
  },
  "ai-in-media-services": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "More evaluation scenarios: pose and gesture split inferencing, video super resolution, federated learning",
            "body": ""
          },
          {
            "head": "Metrics",
            "body": ""
          },
          {
            "head": "AI gateway",
            "body": ""
          },
          {
            "head": "Agentic uplink",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Bit incremental transfer of model data",
            "body": ""
          },
          {
            "head": "Measurement package",
            "body": ""
          },
          {
            "head": "Scenario configurations for video-traffic analysis",
            "body": ""
          },
          {
            "head": "Chat scenario in which the client sends token identifiers",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "AI traffic characterization testbed (draft TR 26.870)",
            "body": ""
          },
          {
            "head": "Model transfer and split inference (TR 26.927)",
            "body": ""
          },
          {
            "head": "Real-time translation scenario",
            "body": ""
          }
        ]
      }
    ]
  },
  "avatar": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Avatar calls phase 2",
            "body": ""
          },
          {
            "head": "Body animation support in the avatar call client",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Gaussian splatting avatars",
            "body": ""
          },
          {
            "head": "Animation generation on Android XR",
            "body": ""
          },
          {
            "head": "Base Avatar Repository",
            "body": ""
          },
          {
            "head": "Android Avatar Call Client Application with enhanced UX",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Initial Avatar Call Client",
            "body": ""
          },
          {
            "head": "Initial implementation of SWAP protocol",
            "body": ""
          },
          {
            "head": "Avatar content for the call client",
            "body": ""
          }
        ]
      }
    ]
  },
  "beyond-2d": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Scenario 1: UE-to-UE stereoscopic video live streaming",
            "body": ""
          },
          {
            "head": "Scenario 2: Streaming of professionally produced volumetric video with a single asset containing people",
            "body": ""
          },
          {
            "head": "Scenario 3: On-demand streaming of multi-view plus depth",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Completing the evaluation setups",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Multi-view plus depth evaluation framework",
            "body": ""
          },
          {
            "head": "Point cloud (V-PCC) evaluation scripts for scenario 2",
            "body": ""
          },
          {
            "head": "Point cloud setup and video generation scripts",
            "body": ""
          }
        ]
      }
    ]
  },
  "content-delivery": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": []
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Implementation of a versatile Media Origin and Packager to support 5G-MAG projects (DASH, HLS, CMAF packaging, V3C over DASH, live media in XR scenes,...)",
            "body": ""
          },
          {
            "head": "Implementation of Reference Application for Android",
            "body": ""
          },
          {
            "head": "CMMF (Coded Multisource Media Format) encoder for the xCD-1 code type of ETSI TS 103 973",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "FLUTE library supporting MBMS Download, MBS and standard RFC profiles",
            "body": ""
          }
        ]
      }
    ]
  },
  "data-collection": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Uplift of the Data Collection AF to Release 19",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Integration of UE Data Collection Application Function as part of 5GMS",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Initial implementation of standalone UE Data Collection Application Function",
            "body": ""
          }
        ]
      }
    ]
  },
  "dvb-i": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Implementation of 5GMS and 5G Broadcast delivery for DVB-I, as in ETSI TR 103 972 and TS 103 770",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Open-source implementation of DVB-I end-to-end components including Application Provider, Service List Registry, Web Application and Android Application",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Initial implementation of DVB-I Webplayer",
            "body": ""
          }
        ]
      }
    ]
  },
  "emergency-alerts": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Support of 3GPP Service URL to wake up 5G Broadcast receiver on emergency alert reception",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Cell Broadcast Centre",
            "body": ""
          },
          {
            "head": "Docker support",
            "body": ""
          },
          {
            "head": "Custom alert message and warning type",
            "body": ""
          },
          {
            "head": "ETWS support (SIB10, SIB11)",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Emergency alert broadcast",
            "body": ""
          },
          {
            "head": "First release of the LTE-based 5G Broadcast transmitter",
            "body": ""
          }
        ]
      }
    ]
  },
  "network-apis": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Alignment with CAMARA Sync26 meta-release: Dedicated Networks r2.3 (rc planned); code follows r2.2 (rc)",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Initial implementation of Quality on Demand (API) consumer with Telefónica QoD sandbox",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Insomnia collections for Dedicated Networks",
            "body": ""
          },
          {
            "head": "Dedicated Networks portal for reservation and device access",
            "body": ""
          },
          {
            "head": "MCP Server for AI assistants",
            "body": ""
          }
        ]
      }
    ]
  },
  "npn": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": []
      },
      {
        "label": "ON-GOING",
        "items": []
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Non-Public 5G Networks for Content Production",
            "body": ""
          },
          {
            "head": "Deploying stand-alone Non-Public 5G Networks for media production",
            "body": ""
          },
          {
            "head": "5G NPNs for media production in collaboration with third-party networks",
            "body": ""
          },
          {
            "head": "Guidelines on registration and onboarding for media production equipment over 5G NPNs",
            "body": ""
          },
          {
            "head": "Roles in the 5G Media Production Ecosystem",
            "body": ""
          },
          {
            "head": "Spectrum access for live media production using Non-Public Networks (NPNs)",
            "body": ""
          },
          {
            "head": "Towards a comprehensive 5G-based toolbox for live media production",
            "body": ""
          }
        ]
      }
    ]
  },
  "ntn": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "OCUDU NTN Release 17",
            "body": ""
          },
          {
            "head": "Uplift to Release 19",
            "body": ""
          },
          {
            "head": "MBS over NTN",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": []
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Study on handover and mobility over NTN",
            "body": ""
          },
          {
            "head": "MBS over NTN profiling: broadcast, multicast and multicast mobility",
            "body": ""
          },
          {
            "head": "NTN overview: system model, radio-layer adaptations and system information",
            "body": ""
          }
        ]
      }
    ]
  },
  "rtc": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Split rendering (TS 26.565, TS 26.249)",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Preparation for Release 19 media delivery",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": []
      }
    ]
  },
  "tsc": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": []
      },
      {
        "label": "ON-GOING",
        "items": []
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Report: Time synchronization services for media production over 5G networks",
            "body": ""
          },
          {
            "head": "Report: Time synchronization and media streams for content production using SMPTE ST 2110 standards",
            "body": ""
          }
        ]
      }
    ]
  },
  "v3c": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Support for Haptics over DASH",
            "body": ""
          },
          {
            "head": "Support for Real-time protocols (RTP, WebRTC) in the player",
            "body": ""
          },
          {
            "head": "Support for an additional synthesizer, such as V-DMC",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "New Android player",
            "body": ""
          },
          {
            "head": "Support for Meta Quest headsets",
            "body": ""
          },
          {
            "head": "V3C over DASH streaming to devices",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Improved V-PCC rendering in the Unity player",
            "body": ""
          },
          {
            "head": "Haptic decoder and synthesizer, and V-PCC synthesizer, as source code",
            "body": ""
          },
          {
            "head": "V3C DASH packager and tools to generate V-PCC bitstreams",
            "body": ""
          }
        ]
      }
    ]
  },
  "vdmc": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": []
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Initial implementation of V-DMC web decoder and player",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": []
      }
    ]
  },
  "vops": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Keeping the validator in step with the specification",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "Porting of VOPS Validator from 3GPP",
            "body": ""
          },
          {
            "head": "Fixes identified on verdicts",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Porting of Validator from 3GPP under the umbrella of the Media Connectivity Software Accelerator",
            "body": ""
          }
        ]
      }
    ]
  },
  "xr": {
    "read": "4 November 2026",
    "phases": [
      {
        "label": "BROUGHT TO STUDY",
        "items": [
          {
            "head": "Support for new MPEG Extensions for glTF 2.0",
            "body": ""
          },
          {
            "head": "New XR Scene Player for Meta Quest",
            "body": ""
          },
          {
            "head": "Split rendering (TS 26.565, TS 26.249) and delivery of XR scenes over the RTC architecture",
            "body": ""
          }
        ]
      },
      {
        "label": "ON-GOING",
        "items": [
          {
            "head": "New XR Scene Player for Android",
            "body": ""
          },
          {
            "head": "Contributions to MPEG Scene validator",
            "body": ""
          },
          {
            "head": "Decoding of timed metadata tracks",
            "body": ""
          },
          {
            "head": "Support of media streaming of live content within XR/3D scenes",
            "body": ""
          }
        ]
      },
      {
        "label": "OUTCOMES",
        "items": [
          {
            "head": "Reference scenes aligned with ISO/IEC 23090-14",
            "body": ""
          },
          {
            "head": "Unity Player, Blender Project, Content repository",
            "body": ""
          }
        ]
      }
    ]
  }
};

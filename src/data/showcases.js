// Showcases by basket: what a business can build, the spec features that realise it, and one tutorial.
//
// Three layers, kept apart (the page shows only the first two, then the item's paths):
//   - the showcase: the business use, as a headline and one paragraph;
//   - `features`: the spec functionality that realises it, each with its implementation status as stated on the
//     project's implementation page ('yes', 'partial' or 'no');
//   - the tutorial: the one page that shows how to run it. Tools (AF, AS, Application Provider UI, Docker,
//     Postman, a 5G network) belong inside the tutorial, never here.
//
// `project` names each topic's main project by its slug (the last segment of its Reference Tools or testbed page).
// The topic's Learn, Implement and Deploy buttons open that project's Technology, Reference Tools and Deploy pages.
//
// `status` is 'available' or 'early' for a topic's showcase. `pipeline` lists what else could be built (shown as
// "Also possible"), with the feature each needs (`needs: null` when none is identified) and its Reference Tools status.

export const FEATURE_STATUS = {
  yes: 'implemented',
  partial: 'partial',
  no: 'not implemented',
  early: 'early stage',
  unknown: 'to be checked',
};

export const SHOWCASE_STATUS = {
  available: 'Available',
  early: 'Early stage',
};

const TUT = '/reference-tools/5gms/tutorials/';

// Case titles and descriptions use the wording of the 5G-MAG Reference Tools presentation slides noted beside
// each (slide numbers are for traceability; the source is not named on the site). Topic names use the industry
// terms. Feature names follow 3GPP TS 26.501 V19.4.0 clause 4.0 ("Media Streaming features"); CMCD as the client
// data format: TS 26.512 V19.3.0 clause 10.5.1; Release 20 topics as sourced on /tech/5gms/more/advanced-media-delivery
// (SP-251265, SP-260973); Object Repair: TS 26.502 V18.6.0 clause 4.2.6.
export const SHOWCASE_BASKETS = {
  'content-delivery': {
    basket: 'content-delivery', // taxonomy.json basket key: its title and icon head the page
    heroDiagram: 'hero',
    title: 'Content Delivery and Streaming',
    headline: 'Better streaming services, end to end',
    description:
      'Content delivery and streaming showcases: QoE and audience analytics, CDN and edge delivery, network-assisted streaming and the specifications behind each.',
    lead:
      'Media services may need more from networks than a bit pipe: insight into what viewers experience, help when the network can give it, delivery at scale, and a way to bring content in and keep it protected.\n\nEach showcase below starts from that problem, follows with the technology that supports a solution and what you can build with Reference Tools.',
    topics: [
      {
        id: 'insight',
        project: '5gms',
        title: 'QoE and audience analytics',
        diagram: 'insight',
        showcase: {
          title: 'The Media Player Is the Best Sensor of User Experience', // slide 13
          about:
            'Packet and server observations alone cannot fully reconstruct the player’s current experience. Players report QoE metrics and their consumption, and add CMCD key–value pairs, such as buffer state, playback rate and throughput estimate, to ordinary HTTP media requests.', // slides 13, 7
          status: 'available',
          features: [
            { name: 'QoE metrics reporting', status: 'partial' }, // 4.0.9; audit 2026-10-01: wrong report media type at the AF, no final report
            { name: 'Consumption reporting', status: 'partial' }, // 4.0.8; audit: no final report when no interval is set
            { name: 'In-band client data reporting (CMCD)', status: 'partial' }, // 4.0.2, 5.13; TS 26.512 10.5.1; audit: not provisioned, AS forwards headers
          ],
          tutorial: { label: 'QoE and Audience Analytics', to: `${TUT}#qoe-and-audience-analytics` }, // the three reporting tutorials
        },
        pipeline: [
          { title: 'Client Metadata: From CMCD to Actionable Delivery Insight', needs: 'CMCD version 2 (Release 20, in progress)', status: 'no' }, // slide 14; AMD page
          { title: 'Data collection, reporting and exposure framework', needs: 'Data collection, reporting and exposure', status: 'no' }, // slide 7; 4.0.12
          { title: 'Measure Latency Against a Common Reference', needs: 'Latency measurement and control (Release 20, in progress)', status: 'no' }, // slide 15; AMD page
          { title: 'Energy Information as an Additional Optimisation Input', needs: null }, // slide 19; not on /tech/5gms
        ],
      },
      {
        id: 'cdn',
        project: '5gms',
        title: 'CDN and edge delivery',
        diagram: 'cdn',
        showcase: {
          title: 'Content Hosting', // slide 7
          about:
            'Downlink media streaming with pull- and push-based content ingest: a service equivalent to a CDN, deployed inside or outside the mobile network, while the application keeps standard HTTP adaptive-streaming formats.', // slides 7, 5; 4.0.2
          status: 'available',
          features: [
            {
              name: 'Content hosting (no content preparation, edge resources, geo-fencing or URL signing)', // 4.0.2
              status: 'partial',
            },
          ],
          tutorial: { label: '5GMSd + 5G Network', to: `${TUT}end-to-end-with-5g` },
        },
        pipeline: [
          { title: 'Media Delivery from Multiple Service Endpoints', needs: 'Multiple service locations: Content Steering, CMMF', status: 'early' }, // slide 9; 5.2.6
          { title: 'Edge processing', needs: 'Edge processing', status: 'no' }, // slide 12; 4.0.10
          { title: 'Distributing Encrypted and High-Value Content', needs: 'Content preparation with DRM', status: 'no' }, // slide 8; 4.0.4, 5.14
          { title: 'Service URLs and deep links', needs: 'Service URL handling', status: 'no' }, // slide 12; 4.0.13
          { title: 'One Media Service over Multiple Access Networks', needs: 'Multi-access media delivery (Release 20, in progress)', status: 'no' }, // slide 17; AMD page, TS 26.501 Annex H
        ],
      },
      {
        id: 'quality',
        project: '5gms',
        title: 'Network-assisted streaming',
        diagram: 'network',
        showcase: {
          title: 'Network Assistance and Dynamic Policies', // slide 7
          about:
            'AF-based and ANBR-based assistance towards the client and the RAN, such as a short delivery boost when the buffer runs low; policy templates instantiated and provisioned through the PCF, one per quality tier (SD, HD, UHD).', // slide 7; 4.0.5, 4.0.6
          status: 'early',
          features: [
            { name: 'Network assistance: delivery boost', status: 'partial' }, // 4.0.5; audit: the AF can request it, no client asks for it
            { name: 'Network assistance: bit rate recommendation', status: 'no' }, // 4.0.5
            { name: 'Dynamic policies (5-tuple only)', status: 'partial' }, // 4.0.6
          ],
        },
        pipeline: [
          { title: 'Improved QoS Support for Media Streaming: ECN and L4S', needs: 'Dynamic policies: ECN marking for L4S', status: 'no' }, // slide 8; 4.0.6
          { title: 'QoS monitoring during a media streaming session', needs: 'Dynamic policies: QoS monitoring', status: 'no' }, // 4.0.6
          { title: 'Background data transfer in off-peak windows', needs: 'Dynamic policies: Background Data Transfer', status: 'no' }, // 4.0.6
          { title: 'Slice awareness', needs: 'Dynamic policies per Network Slice', status: 'no' }, // slide 12; 4.0.6, TS 26.510 5.2.7.1
          { title: 'The Player Should Not Have to Rediscover a Known Limit', needs: 'In-band signalling of rate limits (Release 20, in progress)', status: 'no' }, // slide 16; AMD page
        ],
      },
    ],
  },
  'connected-media-production': {
    basket: 'connected-media-production',
    title: 'Connected Media Production',
    topics: [
      {
        id: 'contribution',
        project: '5gms', // its features are 5GMS uplink (content publishing)
        title: 'Live contribution',
        diagram: null,
        showcase: null,
        // The presentation covers downlink only; these use the industry and 3GPP terms.
        pipeline: [
          { title: 'Mobile contribution', needs: 'Content publishing (uplink)', status: 'no' }, // 4.0.3
          { title: 'Network assistance for the contribution uplink', needs: 'Network assistance (uplink)', status: 'no' }, // 4.0.5
          { title: 'From contribution to distribution', needs: 'Content publishing and content hosting', status: 'no' }, // 4.0.3, 4.0.2
        ],
      },
    ],
  },
  'broadcast-multicast': {
    basket: 'broadcast-multicast',
    title: 'Broadcast and Multicast',
    description: 'The 3GPP specifications for multicast and broadcast delivery, and the 5G Broadcast and 5G MBS projects.',
    // TS 23.247 V19.3.0 and TS 26.346 V19.3.0, clause 1 Scope
    lead:
      'TS 23.247 "specifies architectural enhancements to the 5G system using NR to support multicast and broadcast communication services". TS 26.346 "defines a set of media codecs, formats and transport/application protocols to enable the deployment of MBMS user services either over the MBMS bearer service or other UMTS Bearer Services within the 3GPP system".\n\n5G-MAG works on both through two projects: 5G Broadcast and 5G MBS.',
    topics: [
      {
        id: 'hybrid',
        project: '5g-broadcast',
        icon: 'antenna-signal',
        title: 'Hybrid broadcast and unicast delivery',
        diagram: 'broadcast',
        showcase: {
          title: 'Broadcast What Is Common, Use Unicast Where Needed', // slide 18
          about:
            'Broadcast delivers what is common to all viewers; unicast handles what is individual, personalised, unavailable or interactive. An Android device plays a stream over 5G Broadcast and falls back to unicast when the broadcast signal is unavailable.', // slide 18; 5G Broadcast tutorial
          status: 'early',
          features: [
            { name: 'Seamless switching between unicast and 5G Broadcast (Android)', status: 'yes' }, // 5G Broadcast Tutorials
          ],
          tutorial: {
            label: 'Seamless Switching between Unicast and Broadcast',
            to: '/reference-tools/5g-broadcast/tutorials/android-mw-seamless-switching',
          },
        },
        pipeline: [],
      },
      {
        id: 'converged',
        project: '5g-mbs',
        icon: 'broadcast-waves',
        title: 'Converged unicast and multicast delivery',
        diagram: null,
        showcase: null,
        pipeline: [
          { title: 'In-Session Unicast Repair for MBS/MBMS Object Distribution', needs: 'Object Repair (TS 26.502 clause 4.2.6)', status: 'unknown' }, // slide 8
          { title: 'Broadcast What Is Common, Use Unicast Where Needed, over 5G MBS', needs: 'Combined unicast, multicast and broadcast delivery (Release 20, in progress)', status: 'no' }, // slide 18; AMD page
        ],
      },
    ],
  },
  'towards-6g': {
    basket: 'towards-6g',
    title: 'Towards 6G Media',
    seoTitle: 'Towards 6G Media: Study and Work Topics',
    headline: 'Study on Media Aspects for 6G System',
    heroDiagram: 'sixgai',
    description:
      'Towards 6G media: the 3GPP SA4 study on media aspects of 6G (TR 26.870, Release 20), its work topics and the AI in Media Services testbeds.',
    // TR 26.870 V0.6.1 (2026-09): title page, Introduction, clause 1 Scope and the headings of clause 6
    lead:
      'This study aims to identify media-related opportunities and gaps in the context of 6G. It builds on service requirements defined by SA1 and architectural enhancements defined by SA2.\n\nIts work topics are Media Delivery Architecture, 6G media, Media aspects related to SA2 topics, Media for ubiquitous access, Trusted and private communication for media, Software and asset management, and Real-time communication system enhancements. The conclusions of the study will form the basis for further detailed studies as well as normative work.\n\nThe part 5G-MAG builds is AI in Media Services, with two testbeds: 6G AI Traffic Characterization, which measures the traffic of AI media services for the study, and the AI/ML Evaluation Framework, which evaluates the scenarios of TR 26.847 (AI and ML in 5G media services).',
    topics: [
      {
        id: 'ai-traffic',
        project: '6g-testbed',
        icon: 'code-ai',
        title: 'AI traffic characterization',
        diagram: 'ai',
        showcase: {
          title: 'Characterise the Traffic of AI Media Services',
          // TR 26.870 V0.6.1 annex B.1, C.1, D.1.1
          about:
            'Run AI service scenarios, from chat and agents to real-time video understanding, over emulated network conditions, and measure their traffic: volume and direction, bursts, response time and tokens. The same measurements answer the questions 6G radio and system design asks about AI traffic, such as whether it is uplink heavy.',
          status: 'available',
          features: [
            { name: 'AI service scenarios (TR 26.870 annex D.1)', status: 'yes' }, // table D.1.1: defined in the testbed's configs/scenarios.yaml; AI gateway (D.1.2.11) not yet defined
            { name: 'Network profiles (annex D.3)', status: 'yes' }, // all eleven profiles of table D.3.1-1, lossy at a fixed 10 %
            { name: 'Traffic, response-time, service and task metrics (annex D.4)', status: 'yes' }, // D.4.1: the metrics produced by the testbed
          ],
          tutorial: { label: 'Run the testbed', to: '/testbeds/6g-testbed/tutorials/introduction-6g-testbed' },
        },
        pipeline: [],
      },
    ],
  },
  'non-terrestrial-networks': {
    basket: 'ntn',
    title: 'Non-Terrestrial Networks (NTN)',
    description: 'Satellite and high-altitude platform access for media: what it means for multicast and broadcast delivery.',
    // docs/tech/ntn (overview and MBS Broadcast NTN analysis): Release 17 NTN; Release 19 broadcast MBS over NR NTN
    lead:
      '5G access by satellite and high-altitude platforms, standardised in 3GPP Release 17.\n\nFor media, NTN is not a system of its own: it is a delivery layer under existing 5G services such as MBS Multicast and MBS Broadcast. There is no dedicated NTN reference tool; the 5G MBS tools are the relevant software.',
    topics: [
      {
        id: 'mbs-over-ntn',
        project: '5g-mbs', // there is no NTN tool; the MBS Reference Tools are the relevant software
        learn: '/tech/ntn',
        projectLabel: 'Non-Terrestrial Networks in 5G Systems, with 5G Multicast Broadcast Services (MBS)',
        icon: 'satellite-link',
        title: 'Multicast and broadcast over satellite',
        diagram: null,
        showcase: {
          title: 'Bringing Point-to-Multipoint capabilities to NTN',
          about:
            'Release 19 supports a broadcast MBS session over NR non-terrestrial networks. The session works as it does terrestrially; NTN adds an Intended Service Area, a geographical area signalled for the broadcast service, so a device can start or stop receiving it as it enters or leaves the area.',
          status: 'early',
          features: [
            { name: 'Broadcast MBS session over NR NTN (Release 19)', status: 'unknown' },
            { name: 'Intended Service Area for MBS broadcast', status: 'unknown' },
          ],
        },
        pipeline: [],
      },
    ],
  },
  'immersive-media': {
    basket: 'immersive-media',
    title: 'Immersive Media',
    description: 'Immersive media over 5G: 3D scenes, volumetric video, dynamic meshes, avatars and the formats that lead to them, one topic per project.',
    // the projects' own taglines and landing pages
    lead:
      'Media that goes beyond flat video: dynamic 3D scenes, volumetric video, compressed 3D meshes, conversational avatars, and the evaluation of the formats that lead to them.\n\nEach topic below belongs to one project, with what the Reference Tools offer today.',
    topics: [
      {
        id: 'xr-scenes',
        project: 'xr',
        icon: 'cube-spark',
        title: 'XR and 3D scenes',
        diagram: null,
        showcase: {
          title: 'Compose and deliver dynamic 3D scenes',
          about:
            'Composing, positioning and temporally synchronising dynamic 3D visual and audio objects for XR. The tools deliver scenes made of glTF objects, spatial audio and haptic elements through 5G Media Streaming.',
          status: 'early',
          features: [],
        },
        pipeline: [],
      },
      {
        id: 'volumetric-video',
        project: 'v3c',
        icon: 'virtual-space',
        title: 'Volumetric video',
        diagram: null,
        showcase: {
          title: 'Move freely around volumetric content',
          about:
            'An end-to-end pipeline for 3D object and scene delivery, so viewers can move freely around volumetric video.',
          status: 'early',
          features: [],
        },
        pipeline: [],
      },
      {
        id: 'dynamic-meshes',
        project: 'vdmc',
        icon: 'icosahedron',
        title: 'Dynamic meshes',
        diagram: null,
        showcase: {
          title: 'Compress moving 3D surfaces for real-time use',
          about:
            'Compressing moving 3D surface meshes for real-time immersive environments. The reference tool, a web decoder and player for V-DMC content, is in early development.',
          status: 'early',
          features: [],
        },
        pipeline: [],
      },
      {
        id: 'beyond-2d',
        project: 'beyond-2d',
        icon: 'cube',
        title: 'Beyond 2D video',
        diagram: null,
        showcase: {
          title: 'Evaluate formats that go beyond flat video',
          about:
            'Evaluating and characterising stereoscopic video, multi-view video, video plus depth, point clouds and dynamic meshes, with an evaluation framework.',
          status: 'early',
          features: [],
        },
        pipeline: [],
      },
      {
        id: 'avatars',
        project: 'avatar',
        icon: 'avatar-figure',
        title: 'Conversational avatars',
        diagram: null,
        showcase: {
          title: 'Real-time avatar calls',
          about:
            'Avatars are digital representations of participants, animated in real time from audio and video input, for immersive calls and virtual presence. The tools provide codec, rendering and streaming for avatar communication over 5G.',
          status: 'early',
          features: [],
        },
        pipeline: [],
      },
    ],
  },
};

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
// data format: TS 26.512 V19.3.0 clause 10.5.1; Release 20 topics as sourced on /tech/5gms/overview-amd
// (SP-251265, SP-260973); Object Repair: TS 26.502 V18.6.0 clause 4.2.6.
export const SHOWCASE_BASKETS = {
  'content-delivery': {
    basket: 'content-delivery', // taxonomy.json basket key: its title and icon head the page
    heroDiagram: 'hero',
    title: 'Content Delivery and Streaming',
    headline: 'Better streaming services, end to end',
    description:
      'What you can build for content delivery and streaming: QoE and audience analytics, CDN and edge delivery, network-assisted streaming, with the spec features behind each and where to learn, implement, test and deploy it.',
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
          tutorial: {
            label: 'Network Assistance and Dynamic Policies',
            to: `${TUT}network-assistance-and-dynamic-policies`,
            inPreparation: true,
          },
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
  '5g-broadcast': {
    basket: '5g-broadcast',
    title: 'Broadcast',
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
    ],
  },
  'towards-6g': {
    basket: 'towards-6g',
    title: 'Towards 6G Media',
    headline: 'The 3GPP study of media for 6G',
    heroDiagram: 'sixg',
    description:
      'Media for 6G in 3GPP: the SA4 study on media aspects for 6G (TR 26.870), its work topics, and the measured traffic of AI media services.',
    // TR 26.870 V0.6.1: Introduction, clause 1 and the work topics of clause 6
    lead:
      'Media for 6G is at the study stage in 3GPP. The SA4 study, TR 26.870, identifies media-related opportunities and gaps in the context of 6G, to improve existing services and support new ones.\n\nIts work topics range from the media delivery architecture and 6G media to media for ubiquitous access, trusted and private communication, software and asset management, and real-time communication. Its conclusions will form the basis for further studies and normative work.\n\nThe part 5G-MAG builds is AI for Media, with two testbeds: the 6G AI Traffic Characterization Testbed, which measures the traffic of AI media services for the study, and the AI/ML Evaluation Framework, which implements TR 26.927 (AI and ML in 5G media services).',
    topics: [
      {
        id: 'ai-traffic',
        project: 'ai-for-media',
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
  multicast: {
    basket: 'multicast',
    title: 'Point-to-Multipoint Communication',
    topics: [
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
};

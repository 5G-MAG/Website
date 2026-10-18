// Specification catalogue for avatar communications (MPEG ARF, Scene Description
// integration, IVAS immersive audio and the related transport work).
//
// Extracted from the MPEG and 3GPP bullet lists this page used to carry, so the
// whole set can be searched and filtered in one place (see
// src/components/SpecIndex). `layer` is the role each specification plays, using
// the same roles as the "Specifications by Role" table above the index; `note`
// carries the scope qualifier that used to trail the title.
export const AVATAR_SPECS = [
  {
    id: 'ISO/IEC 23090-39',
    title: 'Coded representation of immersive media; Part 39: Avatar representation format (ARF)',
    url: 'https://www.iso.org/standard/91745.html',
    layer: 'Avatar representation',
    note: 'interoperable storage, carriage and animation of 3D avatars; storage containers are ISOBMFF (ISO/IEC 14496-12) and Zip-based (ISO/IEC 21320-1)',
  },
  {
    id: 'ISO/IEC 23090-14',
    title: 'Coded representation of immersive media; Part 14: Scene description',
    url: 'https://www.iso.org/standard/90191.html',
    layer: 'Scene placement',
    note: 'second edition, ISO/IEC 23090-14:2025 (2025-11); its clause 8.3 defines the MPEG_node_avatar extension and annex H the reference avatar',
  },
  {
    id: 'ISO/IEC 23090-14 Amd 1',
    title: 'Support of MPEG-I audio, scene understanding and other extensions',
    url: 'https://www.iso.org/standard/90191.html',
    layer: 'Scene placement',
    note: 'Amendment 1 to the second edition; final draft (FDAM 1, 2026-05-01). The avatar extension and the reference avatar are in clause 8.3 and annex H of the second edition',
  },
  {
    id: 'TS 26.264',
    title: 'IMS-based AR Real-Time Communication',
    url: 'https://www.3gpp.org/dynareport/26264.htm',
    layer: 'Real-time media transport',
    release: '19',
    note: 'avatar calls over the IMS data channel: ARF container and profile requirements (clause 5.6), the avatar animation data channel (clause 6.3.2), network animation and rendering (clause 7.3.2) and the three animation modes (annex A.2.3); V19.4.1',
  },
  {
    id: 'TS 26.114',
    title:
      'IP Multimedia Subsystem (IMS); Multimedia Telephony; Media handling and interaction',
    url: 'https://www.3gpp.org/dynareport/26114.htm',
    layer: 'Real-time media transport',
  },
  {
    id: 'TS 26.506',
    title: '5G Real-time Media Communication Architecture (Stage 2)',
    url: 'https://www.3gpp.org/dynareport/26506.htm',
    layer: 'Real-time media transport',
    note: 'the stage-2 architecture for RTC over 5G',
  },
  {
    id: 'draft-ietf-avtcore-rtp-avatar',
    title: 'RTP payload format for ARF (ISO/IEC 23090-39) avatar animations',
    url: 'https://datatracker.ietf.org/doc/draft-ietf-avtcore-rtp-avatar/',
    layer: 'Real-time media transport',
    note: 'IETF work in progress, not a 3GPP or MPEG deliverable',
  },
  {
    id: 'TS 26.250',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); General overview',
    url: 'https://www.3gpp.org/dynareport/26250.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.251',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); C code (fixed-point)',
    url: 'https://www.3gpp.org/dynareport/26251.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.252',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Test sequences',
    url: 'https://www.3gpp.org/dynareport/26252.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.253',
    title:
      'Codec for Immersive Voice and Audio Services (IVAS); Detailed Algorithmic Description including RTP payload format and SDP parameter definitions',
    url: 'https://www.3gpp.org/dynareport/26253.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.254',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Rendering',
    url: 'https://www.3gpp.org/dynareport/26254.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.255',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Error concealment of lost packets',
    url: 'https://www.3gpp.org/dynareport/26255.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.256',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); Jitter Buffer Management',
    url: 'https://www.3gpp.org/dynareport/26256.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TS 26.258',
    title: 'Codec for Immersive Voice and Audio Services (IVAS); C code (floating-point)',
    url: 'https://www.3gpp.org/dynareport/26258.htm',
    layer: 'Immersive audio',
  },
  {
    id: 'TR 26.813',
    title: 'Avatar Representation and Communication',
    url: 'https://www.3gpp.org/dynareport/26813.htm',
    layer: 'Studies',
  },
  {
    id: 'TR 26.928',
    title: 'Extended Reality (XR) in 5G',
    url: 'https://www.3gpp.org/dynareport/26928.htm',
    layer: 'Studies',
    note: 'includes avatar and presence use cases',
  },
];

// Order the filter chips by the role each specification plays in the system,
// matching the "Specifications by Role" table, rather than alphabetically.
export const AVATAR_LAYER_ORDER = [
  'Avatar representation',
  'Scene placement',
  'Real-time media transport',
  'Immersive audio',
  'Studies',
];

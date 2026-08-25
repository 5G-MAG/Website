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
    note: 'published in 2023 as a set of extensions to Khronos glTF 2.0; the 2023 edition (Edition 1) is now withdrawn, consolidated with Amendment 1 into Edition 2 (2025), linked here -- Amendment 2 (avatar support, see below) is not part of this edition',
  },
  {
    // Corrected 2026-08-25: this used to claim Amendment 2 was "consolidated
    // directly into Edition 2" with its own catalog entry "retired". Neither
    // holds: ISO's catalogue carries Amendment 2 as an active, distinct
    // Draft Amendment (DAmd) at the URL below, currently at the enquiry/DIS
    // stage, not yet published and not folded into Edition 2 -- only
    // Amendment 1 is (see the base entry above). Same correction applied to
    // docs/tech/xr/mpeg-i-scene-description.mdx's "Editions and amendments"
    // section, which had the identical overclaim.
    id: 'ISO/IEC 23090-14 Amd 2',
    title:
      'Support for haptics, augmented reality, avatars, interactivity, MPEG-I audio, and lighting',
    url: 'https://www.iso.org/standard/86439.html',
    layer: 'Scene placement',
    note: 'the amendment that adds avatar support to Scene Description; still a separate Draft Amendment at the ISO enquiry stage as this is written, not yet published and not part of Edition 2 (2025) above',
  },
  {
    id: 'TS 26.114',
    title:
      'IP Multimedia Subsystem (IMS); Multimedia Telephony; Media handling and interaction (MTSI)',
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
    title: 'Extended reality (XR) in 5G',
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

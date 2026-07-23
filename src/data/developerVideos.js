// Byline/title lookup for Developer Exchange (Reference Tools + Testbeds
// demos/tutorials) videos, keyed by YouTube video id. Unlike
// workshopVideos.js/publicCallVideos.js this isn't a full historical
// list -- the developer gallery only ever shows a handful of the most
// recent uploads (see mergeDeveloperVideos below), so there's no need to
// carry every video ever published here, just enough to give a byline
// and a clean title to whichever ones the live feed currently returns.
// A video not in this lookup (a genuinely new upload) still shows fine,
// just with YouTube's own raw title and no byline until someone adds it
// here.
export const DEVELOPER_VIDEO_INFO = {
  YjzC08BrniA: { title: 'Reference Tools', by: null },
  OfNl92FmglY: { title: 'Initial steps', by: null },
  'Jbir8B-gC4c': { title: '5G Broadcast-Broadband Seamless Switching', by: 'By Klaus Kühnhammer (Bitstem) and Daniel Silhavy (Fraunhofer Fokus)' },
  O_MfEE5KG6o: { title: 'Closing the gap towards a 5G Broadcast Rel-16 open-source transmitter', by: 'By Jaime Sánchez Roldán (iTEAM-UPV)' },
  '1L5vonxICOg': { title: 'OSMART Workshop - 09.05.22 - 5G-MAG Reference Tools presentation', by: null },
  F2xGDeoBfck: { title: 'Target 2023 - 5G & Media, all we need to know', by: null },
  '4RZ_cON5bfo': { title: '5G-MAG Reference Tools XCHANGE + DEMOS', by: null },
  '2IU_18Dvhew': { title: '5G Media Streaming in the BBC R&D standalone testbed', by: 'By Richard Bradbury (BBC), David Waring (BBC), Dev Audsin (BBC) and John Elliott (BBC)' },
  'L5nGVf-WhNE': { title: '5G Media Streaming End-to-end setup with Android clients', by: 'By Daniel Silhavy (Fraunhofer FOKUS)' },
  TtM98uZxHuc: { title: '5G Broadcast supported by 5G-MAG Reference Tools', by: 'By Klaus Kühnhammer (Bitstem)' },
  lJG1hNty_AU: { title: '5G Media Streaming supported by 5G-MAG Reference Tools', by: 'By Richard Bradbury (BBC)' },
  PD3JbPppLLE: { title: 'XR Player supported by 5G-MAG Reference Tools', by: 'By Imed Bouazizi (Qualcomm)' },
  fv_LoZXk5Oc: { title: '5GMS Consumpion Reporting, Network Assistance and Dynamic Policies', by: 'By David Waring (BBC) and Daniel Silhavy (Fraunhofer FOKUS)' },
  WLFxoN6HCZ8: { title: '5G-MAG REFERENCE TOOLS in Action', by: null },
  bEMjw1YA78M: { title: 'Using the Blender glTF exporter with the XR Unity Player', by: 'By Nils Duval (Motion Spell)' },
  qewsQhGi8aE: { title: 'Introducing the 5GMS Application Provider Management Portal', by: 'By Vuk Stojkovic (Fraunhofer FOKUS)' },
  hiHWE3DyhdM: { title: '5G Media Streaming QoE Metrics Reporting', by: 'By Daniel Silhavy (Fraunhofer FOKUS)' },
  vEhv0RYGbKo: { title: '5G Media Streaming at FOKUS Media Web Symposium 2024', by: null },
  dZaUAhYZTUU: { title: '5G Broadcast at FOKUS Media Web Symposium 2024', by: null },
  O0qrTlmYKpA: { title: 'Emergency Alerts over 5G Broadcast at FOKUS Media Web Symposium 2024', by: null },
  gFiNKcQKVuU: { title: 'V3C Immersive Platform - 5G-MAG Reference Tools for Volumetric Video', by: 'By Patrick Fontaine (InterDigital)' },
  '0RxLPcpwFzw': { title: 'V3C Immersive Platform - 5G-MAG Insights Demo Video 1', by: null },
  nRFp7M_cayY: { title: 'V3C Immersive Platform - 5G-MAG Insights Demo Video 2', by: null },
  DDDplLD0WjE: { title: 'V3C Immersive Platform - 5G-MAG Insights Demo Video 3', by: null },
  '9jHwMHVm3PM': { title: 'GPAC FLUTE support', by: 'By Sohaib Larbi (Motion Spell)' },
  lJh2F0xXxpE: { title: 'Initial support of 5MBS core network functions', by: 'By Borja Iñesta Hernández (iTEAM-UPV)' },
  '3iIichQmjBg': { title: 'The Nakolos Core - Interoperability with 5G-MAG Reference Tools', by: 'By Johann Mika (ORS Group)' },
  FFnyln0YB1A: { title: 'UE Data Collection, Reporting and Event Exposure', by: 'By Richard Bradbury (BBC), Dev Audsin (BBC) and David Waring (BBC)' },
  ZpktgeRCqNY: { title: 'Docker Setup with Insomnia REST Client - UE Data Collection', by: 'By Daniel Silhavy (Fraunhofer FOKUS)' },
  '13O2lJHs_jo': { title: 'V3C Immersive Platform - Support for MPEG Haptics', by: 'By Bart Kroon (Philips)' },
  'CVpTbiN-tmc': { title: 'News on XR Unity Player - XR Media Integration in 5G with MPEG-I SD', by: 'By Nils Duval (Motion Spell)' },
  '4Mj_eJnYVjE': { title: 'Unity Player for Android with DASH Streaming - V3C Immersive Platform', by: null },
  anrtRfPttmo: { title: 'Basic implementation of MBS Transport Function - Multicast Broadcast Services (MBS)', by: 'By Richard Bradbury (BBC), Dev Audsin (BBC) and David Waring (BBC)' },
  hkVgL8yq0V8: { title: 'Emergency Alerts over 5G Broadcast embedded in DVB-T2 at IBC 2025', by: null },
  AvjtVrTrWsA: { title: '5G Media Streaming at IBC 2025', by: null },
  'RvHWQht-7Q4': { title: 'XR Media with MPEG-I Scene Description at IBC 2025', by: null },
  '4C9bySDoVqA': { title: 'V3C Immersive Platform at IBC 2025', by: null },
  '0re77KNmxYQ': { title: 'Basic implementation of MBS Function (MBSF) - Multicast Broadcast Services (MBS)', by: 'By Richard Bradbury (BBC), Dev Audsin (BBC) and David Waring (BBC)' },
  SOA7OGF86Gg: { title: 'Introducing the new 5GMS Application Provider Portal', by: 'By Erik Gaida (Fraunhofer FOKUS)' },
  'KtYMui-cRc0': { title: 'Introducing Network Emulator & AI Traffic Characterization Framework', by: 'By Thomas Stockhammer (Qualcomm)' },
  MF9rhnaEEP8: { title: 'Demonstrating the OBJECT_CAROUSEL operating mode', by: 'By David Waring, Dev Audsin and Richard Bradbury (BBC R&D)' },
  e_xK_ckkhgc: { title: 'Demonstrating MBS User Service Announcement mechanisms', by: 'By Dev Audsin, David Waring and Richard Bradbury (BBC R&D)' },
  uEfBaTqh5vw: { title: 'Overview of the latest updates to the 5G Media Streaming Project', by: 'By Daniel Silhavy (5G-MAG WG DEV Chair, Fraunhofer Fokus)' },
};

/** Enrich the live feed's videos (already newest-first, capped at ~15 by
 * YouTube's own RSS feed) with a known clean title/byline where
 * available, capped to `limit` -- "some of the most recent", not the
 * full archive (that's what /reference-tools and /standards/workshops
 * are for). Keeps the feed's own url/thumbnail/published -- only
 * title/by ever come from the lookup. */
export function mergeDeveloperVideos(feedVideos, limit = 8) {
  return (feedVideos || []).slice(0, limit).map((v) => {
    const known = DEVELOPER_VIDEO_INFO[v.id];
    return {
      ...v,
      title: known ? known.title : v.title,
      by: known ? known.by : null,
    };
  });
}

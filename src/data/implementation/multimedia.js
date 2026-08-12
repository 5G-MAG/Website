// Per-feature implementation audit for rt-libflute, 5G-MAG's FLUTE library and
// the one part of the multimedia delivery protocol set that 5G-MAG writes
// itself (ROUTE and the DASH/HLS/CMAF formats are tracked at the role level on
// the Scope page).
//
// Migrated out of six stacked bullet lists plus a hand-written summary table on
// the Scope page. Two things changed in the move, both deliberate: status is now
// a state (yes / partial / hold / no / na) with the reasoning in its own `note`,
// so the status column can actually be skimmed; and the roll-up counts are
// derived from these rows by src/components/ImplementationBoard rather than
// written by hand, so a summary can never drift away from the detail it
// summarises. That derived roll-up replaces the old "rt-libflute summary" table.
//
// "Out of scope" (na) rows are the layers the library deliberately leaves to its
// consuming application; the board keeps them out of the implemented/audited
// denominator, since they are decisions rather than gaps.
export const LIBFLUTE_COMPONENTS = [
  {
    name: "rt-libflute",
    repo: "5G-MAG/rt-libflute",
  },
];

export const LIBFLUTE_SECTIONS = [
  {
    spec: "RFC 3926 / TS 26.346 §7.2",
    title: "Protocol core: FLUTE / ALC / LCT",
    component: "rt-libflute",
    rows: [
      {
        feature: "FLUTE version 1 on the wire (RFC 3926; TS 26.346 §7.2.0)",
        status: "yes",
        note: "every FDT-carrying packet's EXT_FDT extension is stamped with version 1 in its high nibble on transmit. The decoder additionally tolerates a version 2 nibble on receive. Matches RFC 3926's own text: \"This document specifies FLUTE version 1... MUST set this field to '1'.\"",
      },
      {
        feature: "LCT header fields (TS 26.346 §7.2.7)",
        status: "yes",
        note: "CCI fixed at 32 bits and always zero; TSI as a 16-bit half-word (S=0, H=1); TOI as a 16-bit half-word on transmit (the decoder accepts a wider TOI); TOI 0 reserved exclusively for FDT Instances; Sender-Current-Time and Expected-Residual-Time flags always zero; HDR_LEN in 32-bit words.",
      },
      {
        feature: "LCT extension headers (TS 26.346 §7.2.8)",
        status: "yes",
        note: "EXT_FDT and EXT_FTI generated on every FDT Instance (TOI 0) packet, omitted from every file (TOI>0) packet. EXT_CENC decoded on receive but never generated, since §7.2.8 separately requires FDT Instances never be content encoded. EXT_NOP/EXT_AUTH/EXT_TIME accepted and ignored on receive, matching RFC 3926's default action for unrecognised extensions.",
      },
      {
        feature: "Close Session / Close Object flags (TS 26.346 §7.2.7)",
        status: "no",
        note: "parsed on receive, but not settable on transmit",
      },
      {
        feature:
          "TSI wider than 16 bits on transmit (RFC 3451 §4.2, the LCT S/H flags)",
        status: "no",
        note: "silently truncated rather than using the S flag's 48-bit field width. Doesn't affect a compliant MBMS session, since §7.2.7 fixes MBMS TSI at 16 bits regardless; this would only matter for a caller using the library outside that profile.",
      },
      {
        feature: "FDT Instance ID wraparound (RFC 3926 §3.4.1)",
        status: "no",
        note: "the ID increments without bound instead of wrapping within the wire format's 20-bit field",
      },
    ],
  },
  {
    spec: "TS 26.346 §7.2.2",
    title: "Forward Error Correction",
    component: "rt-libflute",
    rows: [
      {
        feature:
          "Compact No-Code FEC (RFC 3695; TS 26.346 §7.2.2, §7.2.3)",
        status: "yes",
        note: "FEC Payload ID as a 16-bit Source Block Number plus a 16-bit Encoding Symbol ID (§7.2.7); source-block partitioning follows RFC 3926's \"Algorithm for Computing Source Block Structure\" (§7.2.3). Works correctly, but carries no redundancy at all: a lost packet loses that piece of the file until the next FDT carousel cycle.",
      },
      {
        feature:
          "Raptor FEC (RFC 5053; TS 26.346 §7.2.2, §7.2.12, Annex B)",
        status: "no",
        note: "the gap that matters most: §7.2.2 requires every MBMS User Services UE to support a Raptor decoder, and that decoder does not exist in the development branch today. See the caution above this board.",
      },
      {
        feature: "RaptorQ FEC (RFC 6330)",
        status: "na",
        note: "reference only, not part of this standard: it doesn't appear anywhere in TS 26.346's FEC scheme definitions (§7.2.2, §7.2.12). Not required, not forbidden, simply outside this standard's scope; would matter only for a non-3GPP deployment or a future 3GPP adoption.",
      },
    ],
  },
  {
    spec: "TS 26.346 §7.2.9",
    title: "FDT Instances",
    component: "rt-libflute",
    rows: [
      {
        feature: "Mandatory FDT attributes (TS 26.346 §7.2.9)",
        status: "yes",
        note: "every FDT Instance and File entry carries Content-Location, TOI and Expires, the three elements §7.2.9 marks mandatory",
      },
      {
        feature: "Optional FDT attributes (TS 26.346 §7.2.9)",
        status: "yes",
        note: "Content-Length, Content-Type, Content-Encoding, Content-MD5, and the FEC-OTI-* attributes are all read and written. Content-MD5 is actively checked: a mismatch on reception triggers re-reception rather than silently accepting a corrupt file.",
      },
      {
        feature: "3GPP FDT extensions (TS 26.346 §7.2.10, §7.2.13)",
        status: "yes",
        note: "mbms2007:Cache-Control (no-cache, Expires) and mbms2012:File-ETag, both read and written",
      },
      {
        feature: "FDT expiry hard enforcement (TS 26.346 §7.2.9)",
        status: "partial",
        note: "§7.2.9 requires: \"the UE shall not use a received FDT Instance to interpret packets received beyond the expiration time.\" The Expires value is parsed and made available to callers (cache-eviction logic reads it), but nothing in the packet-receive path itself checks an FDT Instance's expiry before using it to interpret an incoming packet. The common case is covered by cache eviction; the hard, spec-mandated cutoff at packet-processing time is not yet there.",
      },
      {
        feature:
          "Complete attribute (RFC 3926 §3.4.2; TS 26.346 §7.2.9)",
        status: "no",
        note: "marking an FDT Instance as the final, definitive file list for the session",
      },
      {
        feature:
          "Group, MBMS-Session-Identity/Expiry, FullFDT, Decryption-KEY-URI, FEC-Redundancy-Level (§7.2.6, §7.2.11, §7.2.14–7.2.16)",
        status: "no",
        note: "and the Rel-11/Rel-13 extensions (Alternate-Content-Location, IndependentUnitPositions)",
      },
    ],
  },
  {
    spec: "TS 26.346 §7.2.5, §7.2.8",
    title: "Content encoding",
    component: "rt-libflute",
    rows: [
      {
        feature: "GZIP content encoding (RFC 1952; TS 26.346 §7.2.5)",
        status: "yes",
        note: "files GZIP-encoded on transmit, decoded on receive; decoded length is checked against the declared Content-Length. Deflate also handled.",
      },
      {
        feature:
          "FDT Instances never content encoded (TS 26.346 §7.2.8)",
        status: "yes",
        note: "a separate rule from the file-encoding one above; enforced on transmit",
      },
    ],
  },
  {
    spec: "RFC 4607 / TS 23.247",
    title: "Transport, session and platform",
    component: "rt-libflute",
    rows: [
      {
        feature: "UDP multicast, IPv4 and IPv6",
        status: "yes",
        note: "transmit and receive both work over plain UDP multicast on either protocol",
      },
      {
        feature:
          "UDP tunnel mode (TS 23.247, the N3mb transport context)",
        status: "yes",
        note: "encapsulated IPv4+UDP inner headers for delivery through a GTP-U user plane, used by rt-mbs-transport-function",
      },
      {
        feature: "IPsec ESP protection",
        status: "yes",
        note: "both transmit and receive directions, via Linux XFRM/netlink",
      },
      {
        feature: "Source-Specific Multicast (SSM) (RFC 4607)",
        status: "partial",
        note: "implemented for IPv4; the IPv6 path isn't at parity",
      },
      {
        feature: "Multicast join on a specific interface",
        status: "partial",
        note: "also IPv4-only; not yet at parity for IPv6",
      },
      {
        feature: "Receive buffer sized to the maximum UDP datagram",
        status: "no",
        note: "currently fixed well below that, which can silently truncate large encoding symbols",
      },
    ],
  },
  {
    spec: "TS 26.346 §5.2, §7.3, §9.x",
    title: "What rt-libflute deliberately doesn't do",
    component: "rt-libflute",
    intro:
      "rt-libflute implements the FLUTE/ALC/LCT protocol layer and FEC, the transport itself. The layers around it are the consuming application's job, not the library's. They are implemented in the reference tools that sit above rt-libflute: rt-mbs-transport-function, rt-mbs-client, rt-mbms-bmsc, and rt-mbms-client.",
    rows: [
      {
        feature:
          "SDP session descriptions for FLUTE sessions (TS 26.346 §7.3)",
        status: "na",
        note: "parsed/generated by rt-mbms-client, rt-mbs-client and the transport functions",
      },
      {
        feature:
          "Service announcement / User Service Description (§5.2)",
        status: "na",
        note: "how a receiver discovers a session exists in the first place",
      },
      {
        feature:
          "Associated delivery procedures: file repair (§9.3), reception reporting (§9.4), consumption reporting (§9.4A)",
        status: "na",
        note: "all of which need a return channel, which this protocol by design doesn't have",
      },
      {
        feature:
          "OMA Push (§7.4), RTSP session control (§7.5), Keep Updated service (§7.7), partial file handling (§7.9)",
        status: "na",
      },
      {
        feature:
          "MBSTF/MBS service APIs (TS 29.581) and MBMS client APIs (TS 26.347)",
        status: "na",
      },
    ],
  },
];

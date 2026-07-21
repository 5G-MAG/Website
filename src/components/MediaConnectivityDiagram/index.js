// A polished "Media ⇄ Connectivity" loop diagram: two solid navy circles
// with a cyan glow/shadow, surrounded by a halo of topic icons, linked by
// two arcs that arrive at specific halo icons (the cloud, and the cube) —
// matching the source deck's composition rather than touching the circles
// directly. Transparent background (no card) so it sits directly on the
// page in both light and dark mode — built natively as SVG from our own
// icon paths, so there's no external image/licensing question. Shared by
// the homepage and /about (both feature the same diagram).
//
// Icon halo — each icon reused from an existing SCOPE_TAGS/HeroFigure path
// rather than invented fresh, so the halo reads as "these are the topics"
// instead of decorative filler. Matches the source deck's composition:
// face-scan/XR upper-left, a cloud icon where the top arrow arrives, a
// clock and wifi/satellite cluster around Connectivity, a camera/old-TV
// pair around Media, and a wireframe cube where the bottom arrow arrives.
// Icons sit at 5 clean angular slots per circle, measured in degrees from
// each circle's own outward direction (away from the other circle, 0deg)
// toward straight-up (positive) or straight-down (negative) — evenly spread
// from -85deg to 85deg, at a fixed radius R from that circle's center.
const MEDIA_CENTER = { cx: 340, cy: 290 };
const CONNECTIVITY_CENTER = { cx: 686, cy: 290 };
const HALO_R = 175;
const HALO_ANGLES = [85, 42.5, 0, -42.5, -85];
function haloPos(center, outwardSign, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    cx: center.cx + outwardSign * Math.cos(rad) * HALO_R,
    cy: center.cy - Math.sin(rad) * HALO_R,
  };
}
const VENN_HALO = [
  {
    ...haloPos(MEDIA_CENTER, -1, HALO_ANGLES[0]),
    d: 'M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0 M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2 M3 7v-2a2 2 0 0 1 2 -2h2 M3 17v2a2 2 0 0 0 2 2h2 M17 3h2a2 2 0 0 1 2 2v2 M17 21h2a2 2 0 0 0 2 -2v-2',
  }, // XR / face-scan
  {
    ...haloPos(MEDIA_CENTER, -1, HALO_ANGLES[1]),
    d: 'M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4 M12 2v2 M9 12v9 M15 12v9 M5 16l4 -2 M15 14l4 2 M9 18h6 M10 8v.01 M14 8v.01',
  }, // M06 Conversational Avatar
  {
    ...haloPos(MEDIA_CENTER, -1, HALO_ANGLES[2]),
    d: 'M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4 M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8',
  }, // M18 Non-Public Networks
  {
    ...haloPos(MEDIA_CENTER, -1, HALO_ANGLES[3]),
    d: 'M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9 M16 3l-4 4l-4 -4',
  }, // old TV
  {
    ...haloPos(MEDIA_CENTER, -1, HALO_ANGLES[4]),
    d: 'M4 8v-2a2 2 0 0 1 2 -2h2 M4 16v2a2 2 0 0 0 2 2h2 M16 4h2a2 2 0 0 1 2 2v2 M16 20h2a2 2 0 0 0 2 -2v-2 M12 12.5l4 -2.5 M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5l-4 2.5 M8 10v4.5l4 2.5',
  }, // M05 V3C Immersive
  {
    ...haloPos(CONNECTIVITY_CENTER, 1, HALO_ANGLES[0]),
    d: 'M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1 M9 15l3 -3l3 3 M12 12l0 9',
  }, // M12 cloud upload
  {
    ...haloPos(CONNECTIVITY_CENTER, 1, HALO_ANGLES[1]),
    d: 'M9 4h6 M12 4v3 M12 20a7 7 0 1 0 0 -14a7 7 0 0 0 0 14z M12 10l0 3l2 0 M17.5 7l1 -1 M5.5 7l-1 -1',
  }, // chronometer / stopwatch
  {
    ...haloPos(CONNECTIVITY_CENTER, 1, HALO_ANGLES[2]),
    d: 'M12 12l0 .01 M14.828 9.172a4 4 0 0 1 0 5.656 M17.657 6.343a8 8 0 0 1 0 11.314 M9.168 14.828a4 4 0 0 1 0 -5.656 M6.337 17.657a8 8 0 0 1 0 -11.314',
  }, // wifi / signal
  {
    ...haloPos(CONNECTIVITY_CENTER, 1, HALO_ANGLES[3]),
    d: 'M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 0 -1.414z M6 10l-3 3l3 3l3 -3 M10 6l3 -3l3 3l-3 3 M14 17a3 3 0 0 0 3 -3 M20 13a9 9 0 0 0 -9 9',
  }, // satellite
  {
    ...haloPos(CONNECTIVITY_CENTER, 1, HALO_ANGLES[4]),
    d: 'M4 13h5 M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3 M20 8v8 M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5',
  }, // M04 Network APIs
];

export default function MediaConnectivityDiagram() {
  return (
    <svg
      viewBox="0 0 1020 580"
      style={{ width: '100%', maxWidth: '820px', display: 'block', margin: '0 auto' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="vennShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#001125" floodOpacity="0.15" />
        </filter>
        <filter id="vennGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <marker
          id="vennArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#00A0D2" />
        </marker>
      </defs>

      {/* icon halo */}
      {VENN_HALO.map((h, i) => (
        <g
          key={i}
          transform={`translate(${h.cx - 31.2},${h.cy - 31.2}) scale(2.6)`}
          fill="none"
          stroke="#00A0D2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={h.d} />
        </g>
      ))}

      {/* MEDIA circle */}
      <circle
        cx="340"
        cy="290"
        r="126"
        fill="none"
        stroke="#00A0D2"
        strokeWidth="6"
        filter="url(#vennGlow)"
      />
      <circle
        cx="340"
        cy="290"
        r="120"
        fill="#001125"
        stroke="#00A0D2"
        strokeWidth="2"
        filter="url(#vennShadow)"
      />
      <g
        transform="translate(293.2,206) scale(3.9)"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 4v16l13 -8l-13 -8" />
      </g>
      <text
        x="340"
        y="343"
        textAnchor="middle"
        fontSize="24"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="1"
      >
        MEDIA
      </text>

      {/* CONNECTIVITY circle */}
      <circle
        cx="686"
        cy="290"
        r="126"
        fill="none"
        stroke="#00A0D2"
        strokeWidth="6"
        filter="url(#vennGlow)"
      />
      <circle
        cx="686"
        cy="290"
        r="120"
        fill="#001125"
        stroke="#00A0D2"
        strokeWidth="2"
        filter="url(#vennShadow)"
      />
      <g
        transform="translate(639.2,206) scale(3.9)"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.364 19.364a9 9 0 1 0 -12.728 0" />
        <path d="M15.536 16.536a5 5 0 1 0 -7.072 0" />
        <path d="M11 13a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </g>
      <text
        x="686"
        y="343"
        textAnchor="middle"
        fontSize="24"
        fontWeight="800"
        fill="#ffffff"
        letterSpacing="1"
      >
        CONNECTIVITY
      </text>

      {/* captions — drawn after the circles so they render on top instead of
          being painted over; sit close to each arc, just inside the loop */}
      <text
        x="513"
        y="120"
        textAnchor="middle"
        fontSize="19"
        fontWeight="700"
        fontStyle="italic"
        fill="#00A0D2"
      >
        Media applications
      </text>
      <text
        x="513"
        y="143"
        textAnchor="middle"
        fontSize="19"
        fontWeight="700"
        fontStyle="italic"
        fill="#00A0D2"
      >
        inspire new capabilities
      </text>
      <text
        x="513"
        y="437"
        textAnchor="middle"
        fontSize="19"
        fontWeight="700"
        fontStyle="italic"
        fill="#00A0D2"
      >
        New network capabilities
      </text>
      <text
        x="513"
        y="460"
        textAnchor="middle"
        fontSize="19"
        fontWeight="700"
        fontStyle="italic"
        fill="#00A0D2"
      >
        open new experiences
      </text>

      {/* arcs, drawn last so they sit on top of everything — top-center to
          top-center, bottom-center to bottom-center, exactly */}
      <path
        d="M358.4 146.8 A 210 210 0 0 1 667.6 146.8"
        fill="none"
        stroke="#00A0D2"
        strokeWidth="4"
        markerEnd="url(#vennArrow)"
      />
      <path
        d="M667.6 433.2 A 210 210 0 0 1 358.4 433.2"
        fill="none"
        stroke="#00A0D2"
        strokeWidth="4"
        markerEnd="url(#vennArrow)"
      />
    </svg>
  );
}

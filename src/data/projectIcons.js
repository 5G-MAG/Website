// Icon paths for the few non-project labels ProjectIcon is asked for: the
// developer portal's product-type cards (Reference Tools, Testbeds,
// Tutorials). A project's own icon is not here: ProjectIcon takes it
// from src/data/taxonomy.json (the project's `icon` key in iconCatalog), the
// same drawing its pages, the hubs, the decks and the README banners use.
export const SLIDE_ICONS = {
  'Software Factory': '<path d="M3 21h18"/><path d="M5 21v-12l5 4v-4l5 4h4a2 2 0 0 1 2 2v6"/><path d="M19 13v-6a1 1 0 0 1 1 -1h-2a1 1 0 0 1 -1 1v6"/>',
  'Developer Community': '<path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>',
  Licences: '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M9 13l6 0"/><path d="M9 17l6 0"/>',
  'Early Access': '<path d="M7 14a4 4 0 1 1 0 -8a4 4 0 0 1 0 8"/><path d="M11 10h10"/><path d="M18 10v3"/><path d="M21 10v2"/>',
  'Developer Exchanges': '<path d="M3 4l18 0"/><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10"/><path d="M12 16l0 4"/><path d="M9 20l6 0"/><path d="M8 12l3 -3l2 2l3 -3"/>',
  'Developer Tools': '<path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4"/><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5"/>',
  'Reference Tools': '<path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>',
  Testbeds:
    '<path d="M9 3l6 0"/><path d="M10 9l4 0"/><path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6"/>',
  Tutorials:
    '<path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z"/><path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z"/><path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0"/><path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5"/>',
};

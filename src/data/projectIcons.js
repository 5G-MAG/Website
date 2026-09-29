// Icon paths for the few non-project labels ProjectIcon is asked for: the
// developer portal's product-type cards (Reference Tools, Testbeds,
// Applications). A project's own icon is not here: ProjectIcon takes it
// from src/data/taxonomy.json (the project's `icon` key in iconCatalog), the
// same drawing its pages, the hubs, the decks and the README banners use.
export const SLIDE_ICONS = {
  'Reference Tools': '<path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>',
  Testbeds:
    '<path d="M9 3l6 0"/><path d="M10 9l4 0"/><path d="M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6"/>',
  Applications:
    '<path d="M4.5 16.5c-1.5 1.26 -2 5 -2 5s3.74 -.5 5 -2c.71 -.84 .7 -2.13 -.09 -2.91a2.18 2.18 0 0 0 -2.91 -.09z"/><path d="M12 15l-3 -3a22 22 0 0 1 2 -3.95a12.88 12.88 0 0 1 10 -5.93c0 2.72 -.78 7.5 -6 11a22.35 22.35 0 0 1 -4 2z"/><path d="M9 12h-4s.55 -3.03 2 -4c1.62 -1.08 5 0 5 0"/><path d="M12 15v5s3.03 -.55 4 -2c1.08 -1.62 0 -5 0 -5"/>',
};

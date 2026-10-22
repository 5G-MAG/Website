import taxonomy from './taxonomy.json';

// The standards bodies whose specifications 5G-MAG projects build on, from the taxonomy's `sdos` (the names a
// project lists in its own `sdos`): the logo file in static/assets (a body without one is shown by its name), the
// body's site, and an optional label or note naming the specification family. The registry is in alphabetical order, which is the front-page order.
export const SDOS = taxonomy.sdos;
export const SDO_ORDER = Object.keys(taxonomy.sdos);

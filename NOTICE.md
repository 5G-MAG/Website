# Third-Party Notices

This repository is licensed under the 5G-MAG Public License v1.0 (see
`LICENSE`). This NOTICE file is the attribution notice referenced by
that License (section 5.4) — it must accompany any Derivative Work
distributed from this repository, alongside a copy of the License
itself.

5G-MAG's own code and content in this repository builds on, bundles, or
references the following third-party components, each under its own,
separate license — none of these are relicensed under the 5G-MAG Public
License; they retain their original terms.

## Docusaurus

This site is built with [Docusaurus](https://docusaurus.io/), copyright
Facebook, Inc. and its affiliates, licensed under the MIT License. A
handful of files in `src/theme/` are Docusaurus's own default theme
files, customized in place ("swizzled") rather than replaced outright —
these retain Docusaurus's original copyright header as required by its
license:

- `src/theme/Navbar/Content/styles.module.css`
- `src/theme/TOC/styles.module.css`

## Fonts: Ubuntu and Ubuntu Mono

Bundled in `static/fonts/`, designed by Dalton Maag, licensed under the
Ubuntu Font Licence 1.0. The full license text ships alongside the font
files at `static/fonts/UBUNTU-FONT-LICENCE.txt`, as that license
requires.

## Icons

Icons throughout the site are [Tabler Icons](https://tabler.io/icons)
(copyright the Tabler Icons contributors, MIT License) — their SVG path
data is pasted directly into the source as inline `<path>` elements
rather than pulled in via the `@tabler/icons` npm package, but the
artwork itself is theirs, unmodified.

## Sample media

The RTP/HLS sample streams referenced on the 5G Broadcast reference-tools
page were created from a loop of *Big Buck Bunny*, (c) 2008 Blender
Foundation (www.bigbuckbunny.org), licensed under
[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

## npm dependencies

Standard JavaScript/Node dependencies (React, Docusaurus plugins, and
others declared in `package.json`) are each under their own respective
open-source licenses (mostly MIT), not reproduced here individually —
see each package's own `LICENSE` file in `node_modules/<package>/` for
its exact terms, or its entry on [npmjs.com](https://www.npmjs.com/).

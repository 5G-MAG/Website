// The "Latest updates and roadmap" block of each project page, keyed by the project's slug. The data is generated from the
// public GitHub board "5G-MAG Roadmaps" (https://github.com/orgs/5G-MAG/projects/76) by scripts/fetch-project-roadmaps.js,
// run every night by the workflow update-roadmaps.yml: edit the board, not projectRoadmaps.json. The decks and the Where We
// Stand slides (admin-graphics/slides/where_we_stand) are refreshed from the same file.
import data from './projectRoadmaps.json';

export const PROJECT_ROADMAPS = data;

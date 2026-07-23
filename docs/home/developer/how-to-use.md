---
id: developer-how-to-use
slug: /developer/how-to-use
title: Using this documentation
hide_title: true
sidebar_position: 2
description: Explains the portal's structure and subcategories (Scope, Roadmap, Repositories, Tutorials) and suggests a workflow for using them.
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"/><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"/><path d="M3 6l0 13"/><path d="M12 6l0 13"/><path d="M21 6l0 13"/></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">Software Accelerator</span>
<h1>Using this documentation</h1>
</div>
</div>

<div class="topic-lead">
How this portal is structured, and a suggested workflow for finding your way around it.
</div>

This documentation follows a hierarchical structure to help you navigate the 5G-MAG ecosystem efficiently. Reference Tools, Applications and Testbeds each have their own project list; every project follows the same set of subcategories covering specifications, related projects, repository links, usage instructions, and hands-on tutorials.

Each main topic shares a consistent set of subcategories covering specifications, related projects, repository links, usage instructions, and hands-on tutorials. Not every subcategory applies to every project: a project shows only the tabs relevant to it, so a missing tab (for example Packages) means "nothing published yet for this project", not a broken page.

Each project opens on a landing page with a short description and a row of buttons linking to the subcategories that apply to it (typically Documentation/Scope, Project Roadmap, GitHub Repos, Packages, Releases, Tutorials, and On Air). The subcategories below describe what each of these covers.

For acronyms and recurring terms used across the portal, see the [Glossary](/tech/glossary).

---

## Subcategories

### Scope

The **Scope** section outlines the high-level architecture and objectives of each project. Here, you will find:

- Links to relevant industry specifications and standards, usually under an "Implemented specifications" heading (some older pages label this "Key specifications"; both mean the same thing).
- Architectural diagrams illustrating the implementation.
- A feature matrix mapping specifications to their current implementation status.
- Guidance for identifying which technical standards to study for a deeper understanding.

### Roadmap

The **Roadmap** section connects you to our GitHub project boards. Major features are tracked via the [Reference Tools Roadmaps board](https://github.com/orgs/5G-MAG/projects/48), and developers may also use sub-project boards to monitor granular progress. The portal-wide [Roadmap](/developer/roadmap) page brings these boards together in one place.

### Repositories

The **Repositories** section provides direct links to the relevant GitHub codebases. Each repository includes its own build and installation instructions, as well as links to official releases and issue trackers.

### Packages

When available, the **Packages** section provides pre-built binaries, containers, and Docker deployments. These resources are designed to accelerate the onboarding process for new users and contributors.

### Tutorials

The **Tutorials** section offers end-to-end setup guides. These walkthroughs typically demonstrate how to integrate multiple components to create a functional system. While some tutorials focus on single components, others provide cross-references to related technical topics.

### Releases

The **Releases** section lists the latest published version of each repository in the project, with dates. It draws on the same data as the portal-wide [Releases](/developer/releases) page.

### On Air

The **On Air** section, where available, collects recorded talks, demonstrations and workshop sessions related to the project.

---

## Activity across the whole portal

Beyond a single project's own pages, the Developer Portal also tracks activity across every Reference Tools repository:

- [Releases](/developer/releases) — the latest published version of every repository, in one timeline.
- [Pull Requests](/developer/pull-requests) — open and recently-merged pull requests across all projects.
- [Community Stats](/developer/community-stats) — per-repository GitHub activity (stars, forks, views, clones).
- [Top Contributors](/developer/contributors) — a leaderboard ranked by activity across all 5G-MAG repositories.

---

## Suggested Workflow

First, decide how you want to enter the documentation: if you want to understand or run a specific tool, start from [Reference Tools](/reference-tools); if you want to see what can be built end-to-end from several tools, start from [Applications](/applications/).

Then, to get the most out of a project's documentation, we recommend the following approach:

1. **Explore the Architecture:** Start with the **Scope** subcategory to understand the high-level design of your chosen technology.
2. **Assess Status:** Visit the **Roadmap** section to see what is currently implemented and what is planned for future releases.
3. **Access the Code:** Navigate to the **Repositories** subcategory to clone or download the software.
4. **Implementation:** Follow the **Tutorials** and check how to begin your local setup and testing.

---

## Feedback & Support

We encourage all users to consult this documentation thoroughly before reaching out to maintainers. If your questions remain unanswered, we are happy to assist through our community channels:

- **[GitHub](https://github.com/5G-MAG):** For bug reports and feature requests.
- **[Slack](https://join.slack.com/t/5g-mag/shared_invite/zt-44la3q72s-Mrb13bWpHA33GiCbWJ6C3Q):** For real-time community discussion.
- **[Public Monthly Call](/events/public-call):** Join our monthly sync to stay updated.

---
title: Developer Community
sidebar_position: 0
hide_title: true
---

<style>
  .community-tiles {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin: 1.5rem 0;
  }
  .community-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1.25rem;
    border: 1px solid var(--ifm-color-emphasis-300);
    border-top: 3px solid var(--ifm-color-primary);
    border-radius: 10px;
    min-width: 160px;
    flex: 1;
    max-width: 220px;
    text-decoration: none !important;
    color: inherit !important;
    transition: box-shadow 0.2s ease, transform 0.15s ease;
    background: var(--ifm-background-surface-color);
  }
  .community-tile:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
    transform: translateY(-3px);
    text-decoration: none !important;
  }
  .community-tile svg {
    width: 40px;
    height: 40px;
    color: var(--ifm-color-primary);
    margin-bottom: 0.75rem;
    flex-shrink: 0;
  }
  .community-tile strong {
    font-size: 0.95rem;
    margin-bottom: 0.35rem;
    display: block;
  }
  .community-tile .tile-desc {
    font-size: 0.8rem;
    color: var(--ifm-color-emphasis-800);
    margin-bottom: 0.75rem;
    flex: 1;
    display: block;
  }
  .community-tile .tile-cta {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--ifm-color-primary);
    display: block;
  }
  .community-contributors {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 1rem 0;
  }
  .community-contributors img {
    border-radius: 8px;
  }
</style>

# Developer Community

5G-MAG is a cross-industry association that develops open-source software implementing 5G media and broadcast specifications. This is the developer portal: it hosts the Reference Tools, shared Testbeds and evaluation frameworks, and end-to-end Application examples. New here? Start with [Using this documentation](./how-to-use). Looking for the specifications themselves? See the [Standards section](/tech/standards/intro).

Any organization and independent developer willing to collaborate can join the community.

5G-MAG members, as sponsors of the activity, are able to:
- Define and provide input to the roadmap
- Define development priorities and identify the required features to be implemented
- Assign 5G-MAG budget supporting coordination and development activities
- Join the regular calls of the Development Working Group (WG DEV), the members' working group that steers Reference Tools development (distinct from the open [monthly public call](./public-call))

## How to get involved

<div class="community-tiles">

<a href="https://join.slack.com/t/5g-mag/shared_invite/zt-trtvsmw5-yYgcRidDgIS7x_u48sTuQA" target="_blank" rel="noopener noreferrer" class="community-tile">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6"/><path d="M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6"/><path d="M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6"/><path d="M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6"/></svg>
<strong>Slack</strong>
<span class="tile-desc">Real-time developer chat</span>
<span class="tile-cta">Join →</span>
</a>

<a href="https://groups.google.com/g/5g-mag-reference-tools" target="_blank" rel="noopener noreferrer" class="community-tile">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945"/></svg>
<strong>Google Groups</strong>
<span class="tile-desc">Mailing list and announcements</span>
<span class="tile-cta">Join →</span>
</a>

<a href="https://github.com/5G-MAG/Getting-Started" target="_blank" rel="noopener noreferrer" class="community-tile">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/></svg>
<strong>GitHub</strong>
<span class="tile-desc">Source code and issues</span>
<span class="tile-cta">Explore →</span>
</a>

</div>

## Guidelines for contributors

- [Guidelines for Contributors: Learn How to Contribute](/developer/guidelines-contributors)
- [The Software Licenses](/developer/license)

## Official contributors with a signed CLA

A Contributor License Agreement (CLA) is the document that clarifies the intellectual property terms under which you contribute code. It is signed once; see the [Software Licenses and CLA](/developer/license) page for the agreements and how to file them. The images below show the official contributors and 5G-MAG member organizations.

<div class="community-contributors">
<img src="/assets/images/Reference_Tools_Contributors.png" alt="Official contributors" style="max-width:62%;min-width:240px;flex:1" />
<img src="/assets/images/Reference_Tools_Members.png" alt="5G-MAG members" style="max-width:34%;min-width:160px;flex:0 1 auto" />
</div>

Please refer to the [Getting-Started](https://github.com/5G-MAG/Getting-Started/) repository to provide updates to this documentation.

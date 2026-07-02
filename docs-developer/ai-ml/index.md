---
hide_title: true
sidebar_class_name: project-index-link
title: AI/ML Evaluation Framework
sidebar_position: -1
---

<style>
  /* Table Styles */
  .health-table {
    width: 100%; 
    border-collapse: collapse; 
    margin-top: 20px; 
    table-layout: fixed;
  }
  .health-table th {
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid var(--ifm-color-emphasis-300);
    font-size: 0.75em;
    color: var(--ifm-color-emphasis-700);
    text-transform: uppercase;
  }
  .health-table td {
    padding: 12px;
    border-bottom: 1px solid var(--ifm-color-emphasis-200);
    vertical-align: middle;
    font-size: 0.9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dot { height: 8px; width: 8px; border-radius: 50%; display: inline-block; margin-right: 5px; }
  .dot-green { background-color: #28a745; }
  .dot-orange { background-color: #fd7e14; }
  .dot-blue { background-color: var(--ifm-color-primary); }
  .stats-sub { font-size: 0.8em; color: var(--ifm-color-emphasis-600); display: block; }

</style>


<div class="page-title-row">
<svg xmlns="http://www.w3.org/2000/svg" class="page-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
  <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
  <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
  <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
  <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
  <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" /></svg>
<h1>AI/ML Evaluation Framework</h1>
</div>
<div style="margin: 8px 0"><a class="button button--outline button--primary" href="./scope" style="margin: 2px 4px 2px 0">Scope</a> <a class="button button--outline button--primary" href="./projects" style="margin: 2px 4px 2px 0">Project Roadmap</a> <a class="button button--outline button--primary" href="./repositories" style="margin: 2px 4px 2px 0">GitHub Repos</a> <a class="button button--outline button--primary" href="./releases" style="margin: 2px 4px 2px 0">Releases</a> <a class="button button--outline button--primary" href="./tutorials" style="margin: 2px 4px 2px 0">Tutorials</a></div>


Evaluation framework for assessing AI/ML models applied to media processing in 5G network contexts. The tools provide standardised benchmarks and datasets for evaluating machine learning models for media quality enhancement, adaptive bitrate (ABR) optimisation, and traffic classification, aligned with the AI/ML work items of 3GPP working group SA4 (the group responsible for codec and media work). It is intended for researchers and engineers contributing to the standardisation of AI-native media delivery and informing 5G-MAG's 6G research direction.

The specifications below are listed as background context, not as a prerequisite reading list.

**Relevant specifications:** 3GPP [TR 26.927](https://www.3gpp.org/dynareport/26927.htm) (AI/ML for media services study item), [TR 22.874](https://www.3gpp.org/dynareport/22874.htm) (AI/ML in 5G scenarios), aligned with 3GPP SA4 AI/ML normative work items in Release 18/19.

:::note
The reference tooling is currently private and under testing. Early access can be requested at [https://www.5g-mag.com/early-access](https://www.5g-mag.com/early-access).
:::

## Project Overview

The slide deck below introduces the AI/ML Evaluation Framework: what it evaluates (media quality enhancement, adaptive bitrate optimisation, and AI traffic classification), the benchmarks and datasets it provides, and how it relates to the shared 6G Testbed used for the hands-on traffic characterisation work.

<iframe width="60%" height="560" src="../../docs/Reference_Tools_AIML_Evaluation_Framework.pdf" title="AI/ML Evaluation Framework: project overview slide deck"></iframe>

<a class="button button--outline button--primary" href="/docs/Reference_Tools_AIML_Evaluation_Framework.pdf" style="margin: 4px 0">Download the slide deck of this Project</a>

---

New here? Start with the [Scope](./scope) page, which explains the focus areas, the repositories involved, and how the framework relates to the standards work.

## Go deeper

| | |
|---|---|
| **Scope** | Focus areas, repositories, and relationship to standards: [Scope](./scope) |
| **Standards** | AI/ML in 5G media standardisation: [AI/ML on the Standards portal](/tech/standards/ai-ml) |
| **Related project** | AI traffic classification testbed: [6G Testbed and AI Traffic](../6g-testbed) |

## Community Stats
<!-- STATS-TABLE-START:AI ML -->
> **Last Synced:** -

<table class="health-table">
  <thead>
    <tr>
      <th style="width: 25%;">Repository</th>
      <th style="width: 10%;">Stars</th>
      <th style="width: 10%;">Forks</th>
      <th style="width: 15%;">Views (Total)</th>
      <th style="width: 20%;">Clones (Total)</th>
      <th style="width: 20%;">Activity</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="6"><em>Sync pending &mdash; run the update-data workflow.</em></td></tr>
  </tbody>
</table>
<!-- STATS-TABLE-END:AI ML -->

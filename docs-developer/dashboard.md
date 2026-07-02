---
title: Activity Dashboard
hide_title: true
sidebar_position: 1
---

<style>
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
    color: var(--ifm-color-emphasis-600);
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
  .btn-blue {
    background-color: var(--ifm-color-primary);
    color: var(--ifm-color-primary-contrast-foreground) !important;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9em;
    display: inline-block;
    margin-bottom: 10px;
  }
  .stats-sub { font-size: 0.8em; color: var(--ifm-color-emphasis-600); display: block; }
  .summary-container {
    display: flex;
    gap: 20px;
    margin: 20px 0;
    flex-wrap: wrap;
  }
  .summary-card {
    background: var(--ifm-background-surface-color);
    border: 1px solid var(--ifm-color-emphasis-300);
    border-top: 3px solid var(--ifm-color-primary);
    border-radius: 6px;
    padding: 15px;
    flex: 1;
    min-width: 150px;
    text-align: center;
  }
  .summary-card h4 { margin: 0; color: var(--ifm-color-emphasis-600); font-size: 0.85em; text-transform: uppercase; }
  .summary-value { display: block; font-size: 1.5em; font-weight: bold; color: var(--ifm-color-primary); margin-top: 5px; }
</style>



# Activity Dashboard

This page aggregates community-activity metrics for the 5G-MAG repositories, grouped by project. The figures are pulled from the GitHub API by an automated workflow and refreshed periodically; the "Last Synced" timestamp shows when the data was last updated. **Stars** and **Forks** are cumulative totals. **Views** and **Clones** are traffic counts that GitHub reports over a rolling window (confirm the exact window, typically the last 14 days, with the maintainers). "Sync pending" means the automation has not yet populated that table.

<!-- SUMMARY-CARDS-START -->
> **Last Synced:** -

<div class="summary-container">
  <div class="summary-card"><h4>Total Stars</h4><span class="summary-value">⭐ -</span></div>
  <div class="summary-card"><h4>Total Forks</h4><span class="summary-value">🍴 -</span></div>
  <div class="summary-card"><h4>Total Views</h4><span class="summary-value">👀 -</span></div>
  <div class="summary-card"><h4>Total Clones</h4><span class="summary-value">📥 -</span></div>
</div>
<!-- SUMMARY-CARDS-END -->

## Community Stats - 5G Broadcast: TV and Radio Hybrid Services
[Project Documentation](./5g-broadcast/)

<!-- STATS-TABLE-START:5G Broadcast TV Radio -->
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
<!-- STATS-TABLE-END:5G Broadcast TV Radio -->

---



## Community Stats - 5G Broadcast: Emergency Alerts
[Project Documentation](./emergency-alerts/)

<!-- STATS-TABLE-START:5G Broadcast Emergency Alerts -->
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
<!-- STATS-TABLE-END:5G Broadcast Emergency Alerts -->

---



## Community Stats - 5G Media Streaming
[Project Documentation](./5gms/)

<!-- STATS-TABLE-START:5G Media Streaming -->
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
<!-- STATS-TABLE-END:5G Media Streaming -->

---



## Community Stats - 5G Multicast Broadcast Services
[Project Documentation](./5g-mbs/)

<!-- STATS-TABLE-START:5G Multicast Broadcast -->
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
<!-- STATS-TABLE-END:5G Multicast Broadcast -->

---



## Community Stats - 5GC Service Consumers
[Project Documentation](./5g-core/)

<!-- STATS-TABLE-START:5G Core Service Consumers -->
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
<!-- STATS-TABLE-END:5G Core Service Consumers -->

---



## Community Stats - 6G Testbed and AI Traffic Characterization
[Project Documentation](./6g-testbed/)

<!-- STATS-TABLE-START:6G Testbed -->
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
<!-- STATS-TABLE-END:6G Testbed -->

---



## Community Stats - AI/ML in Mobile Media Services
[Project Documentation](./ai-ml/)

<!-- STATS-TABLE-START:AI ML -->
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

---



## Community Stats - Beyond 2D Video Experiences
[Project Documentation](./beyond-2d/)

<!-- STATS-TABLE-START:Beyond 2D -->
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
<!-- STATS-TABLE-END:Beyond 2D -->

---



## Community Stats - Avatar Communication with MPEG ARF
[Project Documentation](./avatar/)

<!-- STATS-TABLE-START:Conversational Avatar -->
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
<!-- STATS-TABLE-END:Conversational Avatar -->

---



## Community Stats - DVB-I over 5G Systems
[Project Documentation](./dvb-i/)

<!-- STATS-TABLE-START:DVB-I over 5G -->
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
<!-- STATS-TABLE-END:DVB-I over 5G -->

---



## Community Stats - Multimedia Content Delivery Protocols
[Project Documentation](./multimedia/)

<!-- STATS-TABLE-START:Multimedia Protocols -->
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
<!-- STATS-TABLE-END:Multimedia Protocols -->

---



## Community Stats - Network Capability Exposure through APIs
[Project Documentation](./network-apis/)

<!-- STATS-TABLE-START:Network APIs -->
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
<!-- STATS-TABLE-END:Network APIs -->

---



## Community Stats - UE Data Collection, Reporting & Event Exposure
[Project Documentation](./data-collection/)

<!-- STATS-TABLE-START:UE Data Collection -->
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
<!-- STATS-TABLE-END:UE Data Collection -->

---



## Community Stats - V3C Immersive Platform
[Project Documentation](./v3c/)

<!-- STATS-TABLE-START:V3C Immersive -->
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
<!-- STATS-TABLE-END:V3C Immersive -->

---



## Community Stats - XR Media with MPEG-I Scene Description
[Project Documentation](./xr/)

<!-- STATS-TABLE-START:XR Media -->
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
<!-- STATS-TABLE-END:XR Media -->

---



## Community Stats - Auxiliary tools common to various projects
[Project Documentation](./common-tools/)

<!-- STATS-TABLE-START:Auxiliary Tools -->
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
<!-- STATS-TABLE-END:Auxiliary Tools -->

---
title: Using libscBSF
hide_title: true
sidebar_position: 0
---

<div class="topic-banner">
<div class="topic-banner__icon-wrap">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6.657 16c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
  <path d="M12 16v5" />
  <path d="M16 16v4a1 1 0 0 0 1 1h4" />
  <path d="M8 16v4a1 1 0 0 1 -1 1h-4" /></svg>
</div>
<div class="topic-banner__text">
<span class="topic-banner__kicker">5G Core Service Consumers</span>
<h1>Using the 5GC Service Consumer libraries: libscBSF</h1>
</div>
</div>

**libscBSF** is the Binding Support Function (BSF) service consumer library. The BSF maps a device's PDU Session to the Policy Control Function (PCF) that is serving it, so an application can discover the right PCF (via the Network Repository Function, NRF) and then look up which PCF is managing the session for a given device IP address.

:::caution
This dedicated tutorial is under development.
:::

You do not need to wait for it to see libscBSF in action: the [Using libscPCF](./using-libscPCF) tutorial already exercises libscBSF, because the PCF Policy Authorization tool uses the BSF to discover the PCF for a device before requesting a QoS policy. Follow that tutorial for a working end-to-end example.

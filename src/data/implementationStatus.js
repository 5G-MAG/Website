// Which Reference Tools projects have a verified implementation status (an audit of the code on `main` against the
// specifications, see the audit-*.json files), and for which Release. The cards on the Reference Tools page show it;
// a project without an audit says "coming soon" rather than leaving a visitor to guess.
import audit5gms from './audit-5gms.json';
import auditMbsUs from './audit-5g-mbs-us.json';
import auditContentDelivery from './audit-content-delivery.json';
import auditDataCollection from './audit-data-collection.json';
import auditDvbI from './audit-dvb-i.json';

// `part` names what was audited when it is only a part of the project (5G MBS: the User Services part).
const AUDITED = {
  '5gms': { audit: audit5gms },
  '5g-mbs': { audit: auditMbsUs, part: 'User Services' },
  'content-delivery': { audit: auditContentDelivery },
  'data-collection': { audit: auditDataCollection },
  'dvb-i': { audit: auditDvbI },
};

// `docUrl` is a project's Reference Tools address, such as /reference-tools/5gms/.
export function implementationStatus(docUrl) {
  const slug = docUrl.replace(/\/$/, '').split('/').pop();
  const found = AUDITED[slug];
  if (!found) return { state: 'soon', label: 'Implementation status: coming soon' };
  const baseline = found.audit.releaseStatus?.baseline;
  const part = found.part ? `${found.part}, ` : '';
  return {
    state: 'audited',
    label: baseline ? `Implementation status: ${part}Release ${baseline}` : 'Implementation status: audited',
  };
}

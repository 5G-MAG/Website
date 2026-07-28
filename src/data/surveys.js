// Standing data for the /surveys page. To publish a new survey, add an
// entry here (status: 'open') -- no page/JSX changes needed. When a survey
// wraps up, flip its status to 'closed' instead of deleting it, so it moves
// into the page's "Past Surveys" archive rather than disappearing.
export const SURVEYS = [
  {
    id: 'cqm-media-production',
    title: 'Connectivity Quality Management (CQM) in Media Production Applications',
    body: [
      'Mobile connectivity for live production can sometimes be unreliable today due to variability in coverage and the impact of congestion. Bonded cellular has long been used to increase both reliability and redundancy through the use of multiple SIM cards simultaneously across multiple operators. Alternatively, Low Earth Orbit satellite (e.g. Starlink) can be used for broadband connectivity while non-public (private) networks on dedicated spectrum can be used for local production connectivity.',
      'Mobile Network Operators (MNOs) are currently aiming to make mobile connectivity more predictable and manageable, by means of exposing connectivity-related capabilities via APIs. This survey is collecting information to understand whether these capabilities are a fit for the workflows of media production and contribution.',
    ],
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScGuknLeqzgiFalOimrXqwFvZLYsi3xQNdy_X10iyiNkLDzPg/viewform',
    status: 'open',
  },
];

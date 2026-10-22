// The Technical Analysis pages a project's page links to under "Learn", one per question: what it is (overview), how it is
// built (architecture), what it can do (features) and how it runs (procedures). A project lists only the pages it has; a
// link to a page that does not exist is left out (ProjectPath checks the routes), and a project not listed here gets
// its overview from techOverviews.js. Keep it in step with docs/tech when a project gains a page.
export const TECH_PAGES = {
  '/tech/5g-mbs': {
    overview: '/tech/5g-mbs/overview',
    architecture: '/tech/5g-mbs/architecture/user-services',
    features: '/tech/5g-mbs/features/user-services',
    procedures: '/tech/5g-mbs/procedures/broadcast',
  },
  '/tech/5gms': {
    overview: '/tech/5gms/overview',
    architecture: '/tech/5gms/architecture',
    features: '/tech/5gms/features',
  },
  '/tech/content-delivery': {
    overview: '/tech/content-delivery/overview',
    architecture: '/tech/content-delivery/architecture',
    features: '/tech/content-delivery/features',
  },
  '/tech/data-collection': {
    overview: '/tech/data-collection/overview',
    architecture: '/tech/data-collection/architecture',
    features: '/tech/data-collection/features',
  },
  '/tech/rtc': {
    overview: '/tech/rtc/overview',
    architecture: '/tech/rtc/architecture',
    features: '/tech/rtc/features',
  },
  '/tech/ntn': {
    overview: '/tech/ntn/overview',
    procedures: '/tech/ntn/procedures/mbs-broadcast',
  },
  '/tech/xr': {
    overview: '/tech/xr/overview',
    features: '/tech/xr/features',
  },
  '/tech/network-apis': {
    overview: '/tech/network-apis/overview',
    features: '/tech/network-apis/features/application-profiles',
  },
};

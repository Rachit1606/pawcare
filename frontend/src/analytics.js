import ReactGA from 'react-ga';

const TRACKING_ID = 'G-PHHG01P2D7'; 
ReactGA.initialize(TRACKING_ID);

export const trackPageView = (page) => {
  ReactGA.pageview(page);
};

export const trackEvent = (category, action, label = '') => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

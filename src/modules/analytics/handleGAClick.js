import ReactGA from 'react-ga';

/*
  Send Google Analytic Events by capturing event propogation
  where targets have action, category, and label attrubutes.
*/
const handleGAClick = (e) => {
  // if (process.env.NODE_ENV === 'production') {
  const action = e.target.getAttribute('data-ga-action');
  const category = e.target.getAttribute('data-ga-category');
  const label = e.target.getAttribute('data-ga-label');

  // Only send events when target is has the three attributes.
  if (action && category && label) {
    const event = {
      action,
      category,
      label
    };

    // Send the event to Google Analytics
    ReactGA.event(event);
  }
  // }
};

export default handleGAClick;

import ReactGA from 'react-ga';

const handleGAClick = (e) => {
  const event = {};
  ['action', 'category', 'label'].forEach((property) => {
    event[property] = e.target.getAttribute(`data-ga-${property}`);
  });

  if (Object.keys(event).every((property) => {
    return !!property;
  })) {
    ReactGA.event(event);
  }
};

export default handleGAClick;

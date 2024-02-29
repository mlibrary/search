import { useEffect } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

function ScrollToTop ({ location, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
}

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default withRouter(ScrollToTop);

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Anchor = ({ children, href, to, utmSource = 'library-search', ...rest }) => {
  if (!children || (!to && !href)) {
    return null;
  }

  let newHref = href;

  if (href?.startsWith('http') && !href?.startsWith(window.location.origin)) {
    const currentURL = new URL(href);
    currentURL.searchParams.set('utm_source', utmSource);
    newHref = currentURL.toString();
  }

  return to ? <Link to={to} {...rest}>{children}</Link> : <a href={newHref} {...rest}>{children}</a>;
};

Anchor.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  href: PropTypes.string,
  to: PropTypes.string,
  utmSource: PropTypes.string
};

export default Anchor;

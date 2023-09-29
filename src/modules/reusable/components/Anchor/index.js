import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Anchor (props) {
  // The component cannot be empty and must have a destination
  if (!props.children || (!props.to && !props.href)) {
    return null;
  }

  // Use Link component if `to` property exists
  if (props.to) {
    return (
      <Link {...props}>
        {props.children}
      </Link>
    );
  }

  let href = props.href;

  // Set `utm_source` query parameter if the URL goes to an external website
  if (href.startsWith('http') && !href.startsWith(window.location.origin)) {
    const currentURL = new URL(props.href);
    const params = new URLSearchParams(currentURL.search);
    params.set('utm_source', 'library-search');
    const newURL = new URL(`${currentURL.origin}${currentURL.pathname}?${params}`);
    href = newURL.href;
  }

  return (
    <a {...props} href={href}>
      {props.children}
    </a>
  );
}

Anchor.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Anchor;

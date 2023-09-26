import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Anchor (props) {
  // The component cannot be empty
  if (!props.children) {
    return null;
  }

  // Use Link component if `to` property exists
  if (props.to) {
    return (
      <Link to={props.to} className={props.className}>
        {props.children}
      </Link>
    );
  }

  let href = props.href;

  // Add `utm_source` query parameter if the URL goes to an external website
  if (href.startsWith('http') && !href.startsWith(window.location.origin)) {
    href += `${href.includes('?') ? '&' : '?'}utm_source=library-search`;
  }

  return (
    <a href={href} className={props.className}>
      {props.children}
    </a>
  );
}

Anchor.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Anchor;

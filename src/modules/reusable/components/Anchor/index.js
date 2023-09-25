import React from 'react';
import PropTypes from 'prop-types';

function Anchor (props) {
  let href = props.href;

  // Add `utm_source` query parameter if the URL goes to an external site
  if (href.startsWith('http') && !href.includes(document.origin)) {
    href += '&utm_source=library-search';
  }

  return (
    <a href={href}>
      {props.children}
    </a>
  );
}

Anchor.propTypes = {
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Anchor;

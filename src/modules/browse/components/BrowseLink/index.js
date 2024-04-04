import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';

function BrowseLink ({ type = 'callnumber', value, children, ...rest }) {
  let browseLink = 'https://search.lib.umich.edu/catalog/browse';
  if (process.env.NODE_ENV === 'development') {
    browseLink = 'https://browse.workshop.search.lib.umich.edu';
  }

  return (
    <Anchor
      href={`${browseLink}/${type}?query=${value}`}
      {...rest}
    >
      {children}
    </Anchor>
  );
}

BrowseLink.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default BrowseLink;

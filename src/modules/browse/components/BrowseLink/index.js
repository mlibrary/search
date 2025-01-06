import { Anchor } from '../../../reusable';
import React from 'react';

const BrowseLink = ({ type = 'callnumber', value, children, ...rest }) => {
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
};

export default BrowseLink;

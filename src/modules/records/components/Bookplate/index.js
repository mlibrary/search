import PropTypes from 'prop-types';
import React from 'react';

const Bookplate = ({ description, imageUrl }) => {
  return (
    <div>
      <p className='bookplate-description'>This purchase made possible by the {description}</p>
      <img src={imageUrl} alt='' className='bookplate-image' />
    </div>
  );
};

Bookplate.propTypes = {
  description: PropTypes.string,
  imageUrl: PropTypes.string
};

export default Bookplate;

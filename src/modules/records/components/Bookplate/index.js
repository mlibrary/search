import React from 'react';
import PropTypes from 'prop-types';

const Bookplate = ({ imageUrl, description }) => {
  return (
    <div>
      <p className='bookplate-description'>This purchase made possible by the {description}</p>
      <img src={imageUrl} alt='' className='bookplate-image' />
    </div>
  );
};

Bookplate.propTypes = {
  imageUrl: PropTypes.string,
  description: PropTypes.string
};

export default Bookplate;

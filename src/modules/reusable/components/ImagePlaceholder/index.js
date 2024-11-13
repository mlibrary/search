import './styles.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImagePlaceholder = ({ alt = '', altPlaceholder = '', index = 0, src = '', ...rest }) => {
  const [imgState, setImgState] = useState('loading');
  const [imgSrc, setImgSrc] = useState(src);
  const [imgAlt, setImgAlt] = useState(alt);

  const handleImageLoad = () => {
    setImgState('settled');
  };

  const handleImageError = () => {
    // Choosing between 15 placeholder images based on the index's remainder
    setImgSrc(`/placeholders/placeholder-${index % 15}.svg`);
    setImgState('settled');
    setImgAlt(altPlaceholder);
  };

  return (
    <>
      <img
        src={imgSrc}
        alt={imgAlt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imgState === 'settled' ? 'block' : 'none' }}
      />

      {imgState === 'loading' && (
        <div
          className='image-placeholder placeholder margin-bottom__none'
          {...rest}
        >
          <div className='content' />
        </div>
      )}
    </>
  );
};

ImagePlaceholder.propTypes = {
  alt: PropTypes.string,
  altPlaceholder: PropTypes.string,
  index: PropTypes.number,
  src: PropTypes.string
};

export default ImagePlaceholder;

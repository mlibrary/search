import './styles.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImagePlaceholder = ({ alt, index, src, ...rest }) => {
  const [imageState, setImageState] = useState('loading');
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageLoad = () => {
    setImageState('settled');
  };

  const handleImageError = () => {
    // Choosing between 15 placeholder images based on the index's remainder
    setImgSrc(`/placeholders/placeholder-${index % 15}.svg`);
    setImageState('settled');
  };

  return (
    <>
      <img
        src={imgSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageState === 'settled' ? 'block' : 'none' }}
      />

      {imageState === 'loading' && (
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
  index: PropTypes.number,
  src: PropTypes.string
};

export default ImagePlaceholder;

import './styles.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImagePlaceholder = ({ alt, src, ...rest }) => {
  const [imageState, setImageState] = useState('loading');
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageLoad = () => {
    setImageState('settled');
  };

  const handleImageError = () => {
    setImgSrc('/favicon-180x180.png');
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
          className='image-placeholder'
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
  src: PropTypes.string
};

export default ImagePlaceholder;

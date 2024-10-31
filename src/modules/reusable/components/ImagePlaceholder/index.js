import './styles.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImagePlaceholder = ({ alt, src, ...rest }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setImageLoaded(false);
    setHasError(true);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: imageLoaded && !hasError ? 'block' : 'none' }}
      />

      {(hasError || !imageLoaded) && (
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TrimString ({ string, expandable, trimLength = 240 }) {
  const [show, setShow] = useState(false);

  const handleShowToggleClick = () => {
    setShow(!show);
  };

  if (!string) {
    return null;
  }

  return (
    <>
      {(string.length < trimLength || show) ? string : `${string.substr(0, trimLength)}...`}
      {expandable && (
        <button onClick={handleShowToggleClick} className='btn btn--secondary font-small trim-string-button'>
          {`Show ${show ? 'less' : 'more'}`}
        </button>
      )}
    </>
  );
}

TrimString.propTypes = {
  string: PropTypes.string.isRequired,
  trimLength: PropTypes.number,
  expandable: PropTypes.bool
};

export default TrimString;

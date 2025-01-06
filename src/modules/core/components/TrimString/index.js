import React, { useState } from 'react';

const TrimString = ({ expandable, string, trimLength = 240 }) => {
  const [show, setShow] = useState(false);

  const handleShowToggleClick = () => {
    setShow(!show);
  };

  if (!string) {
    return null;
  }

  const shortString = string.length < trimLength;

  return (
    <>
      {(shortString || show) ? string : `${string.substr(0, trimLength)}...`}
      {expandable && !shortString && (
        <button onClick={handleShowToggleClick} className='btn btn--secondary font-small trim-string-button'>
          {`Show ${show ? 'less' : 'more'}`}
        </button>
      )}
    </>
  );
};

export default TrimString;

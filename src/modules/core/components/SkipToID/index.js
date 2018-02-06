import React from 'react';

const SkipToID = ({ id, name }) => {

  return (
    <a href={`#${id}`} className="skip-to-id">Skip to {name}</a>
  )
}

export default SkipToID

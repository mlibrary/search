import React from 'react';
import { useSelector } from 'react-redux';

function A11yLiveMessage () {
  const a11yMessage = useSelector((state) => {
    return state.a11y.message;
  });

  return (
    <div role='status' aria-atomic='true' aria-live='polite' className='offpage'>
      <span>{a11yMessage}</span>
    </div>
  );
}

export default A11yLiveMessage;

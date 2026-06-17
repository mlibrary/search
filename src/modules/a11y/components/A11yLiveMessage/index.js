import React from 'react';
import { useSelector } from 'react-redux';

const A11yLiveMessage = () => {
  const a11y = useSelector((state) => {
    return state.a11y;
  });

  if (!a11y) {
    return null;
  }

  return (
    <div role='status' aria-atomic='true' aria-live='polite' className='zoffpage'>
      <div className='region' aria-label='Accessibility Live Message'>
        {a11y}
      </div>
    </div>
  );
};

export default A11yLiveMessage;

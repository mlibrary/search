import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TruncateText = ({ text }) => {
  const trimTextAt = 120;
  const [expanded, setExpanded] = useState(false);

  // When text doesn't need to be trimmed
  if (text.length <= trimTextAt + 60) {
    return <span>{text}</span>;
  }

  // When text is longer than the trim text at length
  return (
    <>
      <span className='padding-right__2xs'>{expanded ? text : `${text.substr(0, trimTextAt)}...`}</span>
      <button
        className='btn btn--small btn--secondary'
        aria-expanded={expanded}
        onClick={() => {
          return setExpanded(!expanded);
        }}
      >
        Show {expanded ? 'less' : 'more'}
      </button>
    </>
  );
};

TruncateText.propTypes = {
  text: PropTypes.string
};

export default TruncateText;

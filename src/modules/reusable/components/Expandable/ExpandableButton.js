import React, { useContext } from 'react';
import { ExpandableContext } from './Expandable';
import PropTypes from 'prop-types';

const ExpandableButton = ({ count, name, ...rest }) => {
  const context = useContext(ExpandableContext);

  if (context.disabled) return null;

  const handleToggleExpanded = () => {
    context.toggleExpanded();
  };

  return (
    <button
      {...rest}
      className='btn btn--small btn--secondary'
      onClick={handleToggleExpanded}
    >
      Show {context.expanded ? 'fewer' : `all ${count}`} {name}
    </button>
  );
};

ExpandableButton.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number
};

export default ExpandableButton;

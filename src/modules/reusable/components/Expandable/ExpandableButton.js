import React, { useContext } from 'react';
import { ExpandableContext } from './Expandable';

const ExpandableButton = ({ count, name, ...rest }) => {
  const context = useContext(ExpandableContext);

  if (context.disabled) {
    return null;
  }

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

export default ExpandableButton;

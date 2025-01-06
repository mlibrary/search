import React, { useContext, useEffect } from 'react';
import { ExpandableContext } from './Expandable';

const ExpandableChildren = ({ children, show = 3 }) => {
  const context = useContext(ExpandableContext);

  useEffect(() => {
    if (React.Children.count(children) <= show && !context.disabled) {
      context.disable();
    }
  }, [children, show, context]);

  return context.expanded ? children : React.Children.toArray(children).slice(0, show);
};

export default ExpandableChildren;

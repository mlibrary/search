import React, { useContext, useEffect } from 'react';
import { ExpandableContext } from './Expandable';
import PropTypes from 'prop-types';

const ExpandableChildren = ({ children, show = 3 }) => {
  const context = useContext(ExpandableContext);

  useEffect(() => {
    if (React.Children.count(children) <= show && !context.disabled) {
      context.disable();
    }
  }, [children, show, context]);

  return context.expanded ? children : React.Children.toArray(children).slice(0, show);
};

ExpandableChildren.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  show: PropTypes.number
};

export default ExpandableChildren;

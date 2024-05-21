import React, { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

export const ExpandableContext = createContext();

const Expandable = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded((prevExpanded) => {
      return !prevExpanded;
    });
  }, [setExpanded]);

  const disable = useCallback(() => {
    setDisabled(true);
  }, [setDisabled]);

  return (
    <ExpandableContext.Provider value={{ disable, disabled, expanded, toggleExpanded }}>
      {children}
    </ExpandableContext.Provider>
  );
};

Expandable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Expandable;

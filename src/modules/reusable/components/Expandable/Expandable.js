import React, { createContext, useCallback, useState } from 'react';

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

export default Expandable;

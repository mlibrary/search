import React from 'react';

const TabPanel = ({ children, id, isActive, ...rest }) => {
  return (
    <div
      role='tabpanel'
      hidden={!isActive}
      id={id}
      aria-labelledby={id.replace('panel', 'tab')}
      style={{ display: isActive ? 'block' : 'none' }}
      {...rest}
    >
      {children}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;

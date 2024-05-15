import PropTypes from 'prop-types';
import React from 'react';

function TabPanel ({ children, id, isActive, ...rest }) {
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
}

TabPanel.displayName = 'TabPanel';

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  id: PropTypes.string,
  isActive: PropTypes.bool
};

export default TabPanel;

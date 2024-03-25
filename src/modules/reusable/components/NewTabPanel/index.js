import React from 'react';
import PropTypes from 'prop-types';

function NewTabPanel ({ isActive, children, id, ...rest }) {
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

NewTabPanel.displayName = 'NewTabPanel';

NewTabPanel.propTypes = {
  isActive: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default NewTabPanel;

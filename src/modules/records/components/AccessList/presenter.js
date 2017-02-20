import React from 'react';
import { _ } from 'underscore';

const AccessList = ({ access }) => {
  return (
    <div className="access-container">
      <p className="access-line">{access.text.value} {access.source.value}</p>
    </div>
  )
}

export default AccessList;

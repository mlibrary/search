import React from 'react';
import { _ } from 'underscore';

const AccessList = ({ access }) => {
  const source = access.source ? <span className="access-source">{access.source}</span> : ''
  let text = <span className="access-text">{access.text}</span>

  if (access.link) {
    text = (
      <a className="access-text access-link underline" href={access.link}>{access.text}</a>
    )
  }

  return (
    <div className="access-container">
      <p className="access-line">{text} {source}</p>
    </div>
  )
}

export default AccessList;

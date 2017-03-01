import React from 'react';
import { _ } from 'underscore';

const AccessList = ({ access, holdings }) => {
  return (
    <div className="access-container">
      <MetadataAccess access={access} />
      <Holdings holdings={holdings} />
    </div>
  )
}

const MetadataAccess = ({access}) => {
  if (!access) {
    return null
  }

  const source = access.source ? <span className="access-source">{access.source}</span> : ''
  let text = <span>{access.text}</span>

  if (access.link) {
    text = (
      <a href={access.link} className="underline">{access.text}</a>
    )
  }

  return (
    <p className="no-margin">{text} {source}</p>
  )
}

const Holdings = ({holdings}) => {
  if (!holdings) {
    return null
  }

  return (
    <PhysicalHoldings holdings={holdings.physical} />
  )
}

const PhysicalHoldings = ({holdings}) => {
  if (!holdings || holdings.length === 0) {
    return null
  }

  return (
    <ul className="holdings-list">
      {holdings.map((holding, index) =>
        <li className="holdings-list-item" key={index}>{holding.status} {holding.callnumber} {holding.location}</li>
      )}
    </ul>
  )
}

export default AccessList;

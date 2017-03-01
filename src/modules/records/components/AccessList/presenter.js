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
  if (!holdings.electronic && !holdings.physical || holdings.physical.length === 0) {
    return null
  }

  //<HoldingSpan text={holding.text} class_name="holding-electronic-text" />

  return (
    <ul className="holdings-list">
      {_.map(holdings.electronic, (holding, index) =>
        <li className="holdings-list-item" key={index}>
          <a href={holding.href} className="holding-electronic-link underline">Available Online</a>
        </li>
      )}
      {holdings.physical.map((holding, index) =>
        <li className="holdings-list-item" key={index}>
          <HoldingSpan text={holding.status} class_name="holding-status" />
          <HoldingSpan text={holding.location} class_name="holding-location" />
          <HoldingSpan text={holding.callnumber} class_name="holding-callnumber" />
        </li>
      )}
    </ul>
  )
}

const HoldingSpan = ({text, class_name}) => {
  if (!text) {
    return null
  }

  return <span className={class_name}>{text}</span>
}

export default AccessList;

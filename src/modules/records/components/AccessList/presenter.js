import React from 'react';
import { _ } from 'underscore';

const AccessList = ({ access, holdings, loading }) => {
  return (
    <div className="access-container">
      <MetadataAccess access={access} />
      <Holdings holdings={holdings} loading={loading}/>
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
      <a href={access.link} className="underline access-link">{access.text}</a>
    )
  }

  return (
    <p className="no-margin">{text} {source}</p>
  )
}

const Holdings = ({holdings, loading}) => {
  if (loading) {
    return (
      <div className="access-placeholder-container">
        <div className="placeholder placeholder-inline"></div>
        <div className="placeholder placeholder-access placeholder-inline"></div>
      </div>
    )
  }

  if (!holdings) {
    return null
  }

  if (!holdings.electronic && (!holdings.physical || holdings.physical.length === 0)) {
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
          <HoldingLink link={holding.link} />
          <HoldingSpan text={holding.status} class_name="holding-status" />
          <HoldingSpan text={holding.location} class_name="holding-location" />
          <HoldingSpan text={holding.callnumber} class_name="holding-callnumber" />
        </li>
      )}
    </ul>
  )
}

const HoldingLink = ({ link }) => {
  if (!link) {
    return null
  }

  return <a href={link} className="underline holding-link">Request This Item</a>
}

const HoldingSpan = ({text, class_name}) => {
  if (!text) {
    return null
  }

  return <span className={class_name}>{text}</span>
}

export default AccessList;

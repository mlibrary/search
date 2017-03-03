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
      <a href={access.link} className="underline">{access.text}</a>
    )
  }

  return (
    <p className="no-margin">{text} {source}</p>
  )
}

const Holdings = ({holdings, loading}) => {
  if (loading) {
    return (
        <svg width="1.1rem" height="1.1rem" viewBox="0 0 16 22" className="loading-sync-icon">
            <g id="Reference:-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Icons" transform="translate(-159.000000, -802.000000)" fill="#6E6E6E">
                    <g id="Arrows" transform="translate(60.000000, 477.000000)">
                        <g id="sync-copy" transform="translate(99.000000, 325.000000)">
                            <path d="M8,17 C4.69,17 2,14.31 2,11 C2,9.99 2.25,9.03 2.7,8.2 L1.24,6.74 C0.46,7.97 0,9.43 0,11 C0,15.42 3.58,19 8,19 L8,22 L12,18 L8,14 L8,17 Z M8,3 L8,0 L4,4 L8,8 L8,5 C11.31,5 14,7.69 14,11 C14,12.01 13.75,12.97 13.3,13.8 L14.76,15.26 C15.54,14.03 16,12.57 16,11 C16,6.58 12.42,3 8,3 L8,3 Z" id="Shape">
                            </path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
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
          <HoldingSpan text={holding.status} class_name="holding-status" />
          <HoldingSpan text={holding.location} class_name="holding-location" />
          <HoldingSpan text={holding.callnumber} class_name="holding-callnumber" />
          <HoldingLink link={holding.link} />
        </li>
      )}
    </ul>
  )
}

const HoldingLink = ({ link }) => {
  if (!link) {
    return null
  }

  return <a href={link} className="underline">Request This Item</a>
}

const HoldingSpan = ({text, class_name}) => {
  if (!text) {
    return null
  }

  return <span className={class_name}>{text}</span>
}

export default AccessList;

import React from 'react'
import _ from 'underscore'

const AccessItem = ({ type, item }) => {
  const isFull = (type === 'full')

  return (
    <li className={`access-item ${isFull ? 'access-item-full' : ''}`}>
      {_.map(item, (field, index) => {
        if (field.isLink) {
          return (
            <a href={field.value} key={index} className={`access-detail access-link ${isFull ? 'button' : 'underline'}`}>{field.label}</a>
          )
        }

        return (
          <span key={index} className="access-detail">{field.value}</span>
        )
      })}
    </li>
  )
}

const SkeletonHoldingItem = () => (
  <li className="access-item">
    <div className="placeholder placeholder-access placeholder-inline"></div>
    <div className="placeholder placeholder-inline"></div>
  </li>
)

export {
  AccessItem,
  SkeletonHoldingItem
}

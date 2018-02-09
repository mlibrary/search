import React from 'react';

const isRecommended = (record) => {
  return record.fields.filter(item => item.uid === 'recommended').length
}

const RecommendedResource = ({ record }) => {
  if (isRecommended(record)) {
    return (
      <b className="recommended-resource-tag">Recommended</b>
    )
  }

  return null
}

export default RecommendedResource

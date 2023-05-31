import React from 'react';
import PropTypes from 'prop-types';

const isRecommended = (record) => {
  return record.fields.filter((item) => {
    return item.uid === 'highly_recommended';
  }).length;
};

const RecommendedResource = ({ record }) => {
  if (isRecommended(record)) {
    return (
      <span className='recommended-resource-tag strong'>Recommended</span>
    );
  }

  return null;
};

RecommendedResource.propTypes = {
  record: PropTypes.object
};

export default RecommendedResource;

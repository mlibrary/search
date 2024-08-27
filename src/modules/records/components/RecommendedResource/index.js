import PropTypes from 'prop-types';
import React from 'react';

const RecommendedResource = ({ record }) => {
  const isRecommended = record.fields.some((item) => {
    return item.uid === 'highly_recommended';
  });

  return isRecommended ? <span className='recommended-resource-tag strong'>Recommended</span> : null;
};

RecommendedResource.propTypes = {
  record: PropTypes.object
};

export default RecommendedResource;

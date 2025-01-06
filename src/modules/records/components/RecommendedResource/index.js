import React from 'react';

const RecommendedResource = ({ fields = [] }) => {
  const isRecommended = fields.some(({ uid }) => {
    return uid === 'highly_recommended';
  });

  return isRecommended ? <span className='recommended-resource-tag strong'>Recommended</span> : null;
};

export default RecommendedResource;

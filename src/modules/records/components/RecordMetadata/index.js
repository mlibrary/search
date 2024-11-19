import { ContextProvider, Metadata } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';

const RecordMetadata = ({ record }) => {
  const { metadata } = record;

  if (!metadata) {
    return null;
  }

  return (
    <ContextProvider
      render={(context) => {
        const data = {
          Full: metadata.full,
          Medium: metadata.medium,
          Preview: metadata.preview
        };
        return <Metadata data={data[context.viewType] || metadata.full} viewType={context.viewType} />;
      }}
    />
  );
};

RecordMetadata.propTypes = {
  record: PropTypes.object
};

export default RecordMetadata;

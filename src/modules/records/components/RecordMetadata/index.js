import { ContextProvider, Metadata } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';

const RecordMetadata = ({ kind, record }) => {
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
        return <Metadata data={data[context.viewType] || metadata.full} kind={kind} />;
      }}
    />
  );
};

RecordMetadata.propTypes = {
  kind: PropTypes.string,
  record: PropTypes.object
};

export default RecordMetadata;

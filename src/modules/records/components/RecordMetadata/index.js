import { ContextProvider, Metadata } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';

const RecordMetadata = ({ metadata = {} }) => {
  return (
    <ContextProvider
      render={({ viewType }) => {
        if (!metadata || Object.keys(metadata).length === 0) {
          return null;
        }

        const data = {
          Full: metadata.full,
          Medium: metadata.medium,
          Preview: metadata.preview
        };

        return <Metadata {...{ data: data[viewType] || metadata.full, viewType }} />;
      }}
    />
  );
};

RecordMetadata.propTypes = {
  metadata: PropTypes.object
};

export default RecordMetadata;

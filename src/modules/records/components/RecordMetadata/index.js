import React from 'react';
import PropTypes from 'prop-types';
import { Metadata, ContextProvider } from '../../../reusable';

export default function RecordMetadata ({ record, kind }) {
  const metadata = record.metadata;

  if (!metadata) return null;

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
}

RecordMetadata.propTypes = {
  record: PropTypes.object,
  kind: PropTypes.string
};

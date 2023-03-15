import React from 'react';
import PropTypes from 'prop-types';
import { Metadata, ContextProvider } from '../../../reusable';

export default function RecordMetadata ({ record, kind }) {
  const metadata = record.metadata;

  if (metadata) {
    return (
      <ContextProvider
        render={(context) => {
          return (
            <MetadataTypeContainer
              data={metadata}
              type={context.viewType}
              kind={kind}
            />
          );
        }}
      />
    );
  }

  return null;
}

RecordMetadata.propTypes = {
  record: PropTypes.object,
  kind: PropTypes.string
};

function MetadataTypeContainer ({ data, type, kind }) {
  const metadata =
    type === 'Preview'
      ? data.preview
      : type === 'Medium'
        ? data.medium
        : data.full;

  if (!data) {
    return null;
  }

  return <Metadata data={metadata} kind={kind} />;
}

MetadataTypeContainer.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
  kind: PropTypes.string
};

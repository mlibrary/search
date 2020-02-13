import React from "react";

import { Metadata, ContextProvider } from "../../../reusable";

export default function RecordMetadata({ record, kind }) {
  const metadata = record.metadata;

  if (metadata) {
    return (
      <ContextProvider
        render={context => (
          <MetadataTypeContainer
            data={metadata}
            type={context.viewType}
            kind={kind}
          />
        )}
      />
    );
  }

  return null;
}

function MetadataTypeContainer({ data, type, kind }) {
  const metadata =
    type === "Preview"
      ? data.preview
      : type === "Medium"
      ? data.medium
      : data.full;

  if (!data) {
    return null;
  }

  return <Metadata data={metadata} kind={kind} />;
}

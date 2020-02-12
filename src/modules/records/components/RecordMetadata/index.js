import React from "react";

import { Metadata, ContextProvider } from "../../../reusable";
import testingData from "./mock-data.js";
import { getField, getFieldValue } from "../../utilities";

export default function RecordMetadata({ record, kind }) {
  const data = record.metadata;

  if (data) {
    return (
      <ContextProvider
        render={data => (
          <MetadataTypeContainer data={data} type={data.viewType} kind={kind} />
        )}
      />
    );
  }

  return (
    <>
      <p>
        [In development] No real metadata available (yet). Below is fake data.
      </p>
      <Metadata data={testingData} kind={kind} />
    </>
  );
}

function MetadataTypeContainer({ data, type, kind }) {
  switch (type) {
    case "Preview":
      return <Metadata data={data["preview"]} kind={kind} />;
    case "Medium":
      return <Metadata data={data["medium"]} kind={kind} />;
    default:
      return <Metadata data={data["full"]} kind={kind} />;
  }
}

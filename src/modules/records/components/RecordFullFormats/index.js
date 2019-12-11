import React from "react";

import { getRecordFormats } from "../../utilities";

const RecordFullFormats = ({ fields, datastoreUid }) => {
  const formats = getRecordFormats({
    fields,
    datastoreUid
  });

  return (
    <div className="full-record-header">
      {formats.map((value, index) => {
        return (
          <span className="full-record-format" key={index}>
            {value}
          </span>
        );
      })}
    </div>
  );
};

export default RecordFullFormats;

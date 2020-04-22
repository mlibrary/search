import React from "react";
import { getField, getFieldValue } from "../../utilities";

function createMarkup(markup_string) {
  return { __html: markup_string };
}

const RecordDescription = ({ record }) => {
  const abstract = getField(record.fields, "abstract");
  const desc = getField(record.fields, "description");
  const descField = abstract ? abstract : desc;
  const description = getFieldValue(descField)[0];

  if (!description) {
    return null;
  }

  return (
    <p
      className="full-record__description"
      dangerouslySetInnerHTML={createMarkup(description)}
    />
  );
};

export default RecordDescription;

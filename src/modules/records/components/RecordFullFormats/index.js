/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";

import { Icon } from "@umich-lib/core";
import { getRecordFormats } from "../../utilities";
import { SPACING } from "../../../reusable/umich-lib-core-temp";

export default function RecordFullFormats({ icons, fields, datastoreUid }) {
  const formats = getRecordFormats({
    fields,
    datastoreUid,
  });

  return (
    <div className="full-record-header">
      {formats.map((value, index) => {
        return (
          <span className="full-record-format" key={index}>
            <RecordFormatIcon icons={icons} value={value} />
            {value}
          </span>
        );
      })}
    </div>
  );
}

function RecordFormatIcon({ value, icons }) {
  if (!icons) {
    return null;
  }

  const icon = icons.find((i) => i.text === value);

  if (icon) {
    return (
      <Icon
        icon={icon.icon}
        css={{
          marginRight: SPACING["2XS"],
        }}
      />
    );
  }

  return null;
}

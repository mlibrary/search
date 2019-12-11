import React from "react";

import { Metadata } from "../../../reusable";
import testingData from "./mock-data.js";

export default function RecordMetadata({ kind }) {
  return <Metadata data={testingData} kind={kind} />;
}

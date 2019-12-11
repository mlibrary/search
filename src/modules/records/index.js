import RecordList from "./components/RecordList";
import Pagination from "./components/Pagination";
import RecordFull from "./components/RecordFull";
import RecordFullFormats from "./components/RecordFullFormats";
import Record from "./components/Record";
import RecordPlaceholder from "./components/RecordPlaceholder";
import FullRecordPlaceholder from "./components/FullRecordPlaceholder";
import ResultsSummary from "./components/ResultsSummary";
import BentoboxList from "./components/BentoboxList";
import RecordFieldValue from "./components/RecordFieldValue";
import ViewMARC from "./components/ViewMARC";
import Bookplate from "./components/Bookplate";
import RecommendedResource from "./components/RecommendedResource";
import RecordDescription from "./components/RecordDescription";
import Zotero from "./components/Zotero";
import RecordMetadata from "./components/RecordMetadata";
import recordsReducer from "./reducer";
import {
  addRecords,
  clearRecords,
  setRecord,
  clearRecord,
  loadingRecords,
  addHoldings,
  loadingHoldings,
  setRecordHoldings,
  setRecordGetThis
} from "./actions";

export {
  RecordList,
  RecordFull,
  Pagination,
  ResultsSummary,
  recordsReducer,
  addRecords,
  Record,
  RecordFullFormats,
  RecordPlaceholder,
  FullRecordPlaceholder,
  clearRecords,
  setRecord,
  clearRecord,
  loadingRecords,
  BentoboxList,
  addHoldings,
  loadingHoldings,
  setRecordHoldings,
  setRecordGetThis,
  RecordFieldValue,
  ViewMARC,
  Bookplate,
  RecommendedResource,
  RecordDescription,
  Zotero,
  RecordMetadata
};

import BentoboxList from './components/BentoboxList';
import Bookplate from './components/Bookplate';
import FullRecordPlaceholder from './components/FullRecordPlaceholder';
import KeywordSwitch from './components/KeywordSwitch';
import Pagination from './components/Pagination';
import Record from './components/Record';
import RecordDescription from './components/RecordDescription';
import RecordFull from './components/RecordFull';
import RecordFullFormats from './components/RecordFullFormats';
import RecordList from './components/RecordList';
import RecordMetadata from './components/RecordMetadata';
import RecommendedResource from './components/RecommendedResource';
import Results from './components/Results';
import ViewMARC from './components/ViewMARC';
import Zotero from './components/Zotero';
import recordsReducer from './reducer';
import {
  addHoldings,
  addRecords,
  clearRecord,
  clearRecords,
  loadingHoldings,
  loadingRecords,
  setRecord,
  setRecordGetThis,
  setRecordHoldings
} from './actions';

export {
  addHoldings,
  addRecords,
  BentoboxList,
  Bookplate,
  clearRecord,
  clearRecords,
  FullRecordPlaceholder,
  KeywordSwitch,
  loadingHoldings,
  loadingRecords,
  Pagination,
  Record,
  RecordDescription,
  RecordFull,
  RecordFullFormats,
  RecordList,
  RecordMetadata,
  recordsReducer,
  RecommendedResource,
  Results,
  setRecord,
  setRecordGetThis,
  setRecordHoldings,
  ViewMARC,
  Zotero
};

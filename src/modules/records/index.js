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
import BentoboxList from './components/BentoboxList';
import Bookplate from './components/Bookplate';
import FullRecordPlaceholder from './components/FullRecordPlaceholder';
import ILLRequestMessage from './components/ILLRequestMessage';
import KeywordSwitch from './components/KeywordSwitch';
import MARCTable from './components/MARCTable';
import Metadata from './components/Metadata';
import Pagination from './components/Pagination';
import RecommendedResource from './components/RecommendedResource';
import Record from './components/Record';
import RecordDescription from './components/RecordDescription';
import RecordFull from './components/RecordFull';
import RecordFullFormats from './components/RecordFullFormats';
import RecordList from './components/RecordList';
import recordsReducer from './reducer';
import Results from './components/Results';
import ViewMARC from './components/ViewMARC';
import Zotero from './components/Zotero';

export {
  addHoldings,
  addRecords,
  BentoboxList,
  Bookplate,
  clearRecord,
  clearRecords,
  FullRecordPlaceholder,
  ILLRequestMessage,
  KeywordSwitch,
  loadingHoldings,
  loadingRecords,
  MARCTable,
  Metadata,
  Pagination,
  RecommendedResource,
  Record,
  RecordDescription,
  RecordFull,
  RecordFullFormats,
  RecordList,
  recordsReducer,
  Results,
  setRecord,
  setRecordGetThis,
  setRecordHoldings,
  ViewMARC,
  Zotero
};

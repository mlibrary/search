import { addList } from './actions';
import config from '../../config';
import Prejudice from 'prejudice';
import { Pride } from 'pride';
import store from '../../store';

const prejudice = new Prejudice({
  actionBaseUrl: config.spectrum,
  datastores: config.datastores.list,
  recordEngine: Pride
});

const addRecord = (record) => {
  prejudice.addRecord(record);
};

const addRecordsToList = () => {
  const records = prejudice.listRecords();
  const groupedRecords = records.reduce((group, record) => {
    const { datastore } = record;
    group[datastore] ||= [];
    group[datastore].push(record);
    return group;
  }, {});

  store.dispatch(addList(groupedRecords));
};

const clearRecords = (datastoreUid) => {
  prejudice.clearRecords(datastoreUid);
};

const createVariableStorageDriverInstance = () => {
  const inst = new Prejudice({
    actionBaseUrl: config.spectrum[process.env.NODE_ENV] || config.spectrum.development,
    datastores: config.datastores.list,
    recordEngine: Pride,
    recordStorage: Prejudice.VariableStorageDriver
  });

  return inst;
};

const initialize = () => {
  addRecordsToList();
  Pride.PreferenceEngine.registerEngine(prejudice);
};

const observer = () => {
  addRecordsToList();
};

const removeRecord = (record) => {
  prejudice.removeRecord(record);
};

prejudice.addObserver(observer);

export default {
  addRecord,
  clearRecords,
  createVariableStorageDriverInstance,
  initialize,
  instance: prejudice,
  removeRecord
};

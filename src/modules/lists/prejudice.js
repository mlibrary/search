import Prejudice from 'prejudice';
import { Pride } from 'pride';
import config from '../../config';
import store from '../../store';
import { addList } from './actions';

const prejudice = new Prejudice({
  recordEngine: Pride,
  datastores: config.datastores.list,
  actionBaseUrl: config.spectrum
});

const addRecord = (record) => {
  prejudice.addRecord(record);
};

const addRecordsToList = () => {
  const records = prejudice.listRecords();
  const groupedRecords = records.reduce((group, record) => {
    const { datastore } = record;
    group[datastore] = group[datastore] || [];
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
    recordEngine: Pride,
    datastores: config.datastores.list,
    recordStorage: Prejudice.VariableStorageDriver,
    actionBaseUrl: config.spectrum[process.env.NODE_ENV] || config.spectrum.development
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

import Prejudice from 'prejudice'
import { Pride } from 'pride'
import config from '../../config'
import store from './../../store'
import _ from 'underscore'
import {
  addList
} from './actions'

const prejudice = new Prejudice({
  recordEngine: Pride,
  datastores: config.datastores.list,
  actionBaseUrl: config.spectrum[process.env.NODE_ENV] || config.spectrum.development
})

const addRecord = (record) => {
  prejudice.addRecord(record)
}

const removeRecord = (record) => {
  prejudice.removeRecord(record)
}

const listRecords = () => {
  return prejudice.listRecords()
}

const clearRecords = (datastoreUid) => {
  prejudice.clearRecords(datastoreUid)
}

const addRecordsToList = (records) => {
  store.dispatch(addList(_.groupBy(listRecords(), 'datastore')))
}

const observer = (records) => {
  addRecordsToList(records)
}

const initialize = () => {
  addRecordsToList(listRecords())
  Pride.PreferenceEngine.registerEngine(prejudice);
}

const createVariableStorageDriverInstance = () => {
  const inst = new Prejudice({
    recordEngine: Pride,
    datastores: config.datastores.list,
    recordStorage: Prejudice.VariableStorageDriver,
    actionBaseUrl: config.spectrum[process.env.NODE_ENV] || config.spectrum.development
  })

  return inst
}

prejudice.addObserver(observer)

export default {
  initialize,
  addRecord,
  removeRecord,
  listRecords,
  clearRecords,
  createVariableStorageDriverInstance,
  instance: prejudice
}

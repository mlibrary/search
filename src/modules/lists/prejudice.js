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

const clearRecords = () => {
  prejudice.clearRecords()
}

const observer = (records) => {
  console.log('observer', records)

  store.dispatch(addList(records))
}

prejudice.addObserver(observer)

//clearRecords()

export default {
  addRecord,
  removeRecord,
  listRecords,
  clearRecords
}

import Prejudice from 'prejudice'
import { Pride } from 'pride'
import config from '../../config'

const prejudice = new Prejudice({
  recordEngine: Pride,
  datastores: config.datastores.list,
  actionBaseUrl: config.spectrum[process.env.NODE_ENV] || config.spectrum.development
})

prejudice.registerRecordEngine(Pride);
prejudice.registerDatastore('mirlyn', 'https://search-staging.www.lib.umich.edu/catalog/record');

const addRecord = (record) => {
  prejudice.addRecord(record)
}

const removeRecord = (record) => {
  prejudice.addRecord(record)
}

const listRecords = () => {
  return prejudice.listRecords()
}

const clearRecords = () => {
  prejudice.clearRecords()
}

export default {
  addRecord,
  removeRecord,
  listRecords,
  clearRecords
}

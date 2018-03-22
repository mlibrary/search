import Prejudice from 'prejudice'
import { Pride } from 'pride'

const prejudice = new Prejudice()

const addRecord = ({ datastoreUid, recordUid }) => {
  prejudice.addRecord({ datastoreUid, recordUid })
}

const removeRecord = ({ datastoreUid, recordUid }) => {
  prejudice.removeRecord({ datastoreUid, recordUid })
}

const listRecords = (datastoreUid, recordUid) => {
  return prejudice.listRecords()
}

const clearRecords = ({ datastoreUid }) => {
  prejudice.clearRecords()
}

export default {
  addRecord,
  removeRecord,
  listRecords,
  clearRecords
}

import Prejudice from 'prejudice'
import { Pride } from 'pride'

const prejudice = new Prejudice()

export const addRecord = ({ datastoreUid, recordUid }) => {
  prejudice.addRecord(Pride.requestRecord(datastoreUid, recordUid))
}

export const removeRecord = (datastoreUid, recordUid) => {
  prejudice.removeRecord(Pride.requestRecord(datastoreUid, recordUid))
}

export const listRecords = (datastoreUid, recordUid) => {
  return prejudice.listRecords()
}

export default {
  addRecord,
  removeRecord,
  listRecords
}

import { Pride } from 'pride'

function requestRecordCSL({ datastoreUid, recordUid, callback }) {
  Pride.requestRecord(datastoreUid, recordUid).renderCSL(data => callback(data))
}

export {
  requestRecordCSL
}
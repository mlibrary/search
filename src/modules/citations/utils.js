import { Pride } from 'pride'

function requestRecordCSL ({ datastoreUid, recordUid }) {
  console.log('requestRecordCSL...')

  console.log('args', datastoreUid, recordUid )

  function callback(data) {
    console.log('requestRecordCSL cb', data)
  }

  const record = Pride.requestRecord(datastoreUid, recordUid, callback)

  record.renderCSL((data) => {
    console.log('renderCSL', data)
  })
}

export {
  requestRecordCSL
}
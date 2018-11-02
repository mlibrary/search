import {
  prejudice
} from '../lists'

/*
  intent is one of:
  - favorite
  - tag
  - unfavorite
  - untag

  value is tag value.
*/
const favorite = ({
  intent,
  datastore,
  record,
  value,
  callback
}) => {
  prejudice.createVariableStorageDriverInstance().addRecord(
    record
  ).act(
    intent,
    datastore,
    value,
    callback
  )
}

export default favorite

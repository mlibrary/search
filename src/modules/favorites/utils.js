import Prejudice from 'prejudice'
import { Pride } from 'pride'
import config from '../../config'
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

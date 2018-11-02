import {
  prejudice
} from '../lists'
import {
  favorite,
  unfavorite,
  tagFavorite,
  untagFavorite
} from './actions'
import store from '../../store'

/*
  intent is one of:
  - favorite
  - tag
  - unfavorite
  - untag

  value is tag value.
*/
const favoriteToPrejudice = ({
  intent,
  datastore,
  record,
  value,
  callback
}) => {
  // Save to state to be optimisitic UI. Aka only assume the favorite worked.
  if (intent === 'favorite') {
    store.dispatch(favorite({
      datastoreUid: datastore,
      recordUid: record.uid
    }))
  } else if (intent === 'unfavorite') {
    store.dispatch(unfavorite({
      datastoreUid: datastore,
      recordUid: record.uid
    }))
  } else if (intent === 'tag') {
    store.dispatch(tagFavorite({
      datastoreUid: datastore,
      recordUid: record.uid,
      tag: value
    }))
  } else if (intent === 'untag') {
    store.dispatch(untagFavorite({
      datastoreUid: datastore,
      recordUid: record.uid,
      tag: value
    }))
  }

  /*
  // This favorites the record to the Favorites application.
  prejudice.createVariableStorageDriverInstance().addRecord(
    record
  ).act(
    intent,
    datastore,
    value,
    callback
  )
  */
}

export default favoriteToPrejudice

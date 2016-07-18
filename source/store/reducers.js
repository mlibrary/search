import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE } from './actions.js'

export const datastore = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return {
          uid: action.payload.uid,
          name: action.payload.name,
          short_desc: action.payload.short_desc,
          active: false
        }
    case CHANGE_ACTIVE_DATASTORE:
      return Object.assign({}, state, {
        active: true
      })
    default:
      return state
  }
}

export const datastores = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return [
        ...state,
        datastore(undefined, action)
      ]
    case CHANGE_ACTIVE_DATASTORE:
      return state.map(ds => {
        if (ds.uid !== action.uid) {
          return ds
        }

        return datastore(ds, action)
      })
    default:
      return state
  }
}

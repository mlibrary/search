import { ADD_DATASTORE, SET_ACTIVE } from './actions.js'

export const datastore = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return {
        uid: action.payload.uid,
        name: action.payload.name,
        short_desc: action.payload.short_desc,
        active: false
      }
    case SET_ACTIVE:
      return Object.assign({}, state, {
        active: action.isActive
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
    case SET_ACTIVE:
      return state.map(ds => {
        if (ds.uid !== action.payload) {
          return datastore(ds, false)
        }

        return ds
      })
    default:
      return state
  }
}

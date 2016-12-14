import {
  ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE,
  SUBMIT_SEARCH, ADD_RECORD, CLEAR_RECORDS,
  REQUEST_HOLDINGS, RECIEVE_HOLDINGS,
  LOADED, LOADING, ADD_FACET, CLEAR_FACETS,
  TOGGLE_FACET_ITEM
} from '.././actions/actions.js'
import { combineReducers } from 'redux'
import { _ } from 'underscore'
import { routerReducer } from 'react-router-redux'

const datastoreReducer = (state, action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return {
        uid: action.payload.uid,
        name: action.payload.name
      }
    default:
      return state
  }
}

const datastoresReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return [
        ...state,
        datastoreReducer(undefined, action)
      ]
    default:
      return state
  }
}

const activeDatastoreReducer = (state = "", action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_DATASTORE:
      return action.payload
    default:
      return state
  }
}

const searchReducer = (state = "", action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return action.payload
    default:
      return state
  }
}

const recordReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        data: action.payload
      }
    default:
      return state
  }
}

const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_RECORD:
      return [
        ...state,
        recordReducer(undefined, action)
      ]
    case CLEAR_RECORDS:
      return []
    default:
      return state
  }
}

const holdingsReducer = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_HOLDINGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIEVE_HOLDINGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.holdings
      })
    default:
      return state
  }
}

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case LOADED:
      return false
    case LOADING:
      return true
    default:
      return state
  }
}

const facetItemReducer = (state, action) => {
  switch (action.type) {
    case ADD_FACET:
      return {
        name: action.payload.item.name,
        value: action.payload.item.value,
        count: action.payload.item.count,
        selected: false
      }
    case TOGGLE_FACET_ITEM:
      if (state.value == action.payload.item.value) {
        return Object.assign({}, state, {
          selected: !state.selected
        })
      }

      return state
    default:
      return state
  }
}

const facetReducer = (state, action) => {
  switch (action.type) {
    case ADD_FACET:
      return {
        uid: action.payload.uid,
        metadata: action.payload.metadata,
        items: []
      }
    case TOGGLE_FACET_ITEM:
      if (state.uid == action.payload.facet.uid) {
        return Object.assign({}, state, {
          items: state.items.map(facetItem =>
            facetItemReducer(facetItem, action)
          )
        })
      }

      return state
    default:
      return state
  }
}

const facetsReducer = (state=[], action) => {
  switch (action.type) {
    case ADD_FACET:
      if (action.payload) {
        var facet = _.findWhere(state, { uid: action.payload.uid })
        var facets = state

        // TODO this isn't pure... rewrite
        // if this facet doesn't already exists, create a namespace for it
        if (!facet) {
          facets = [
            ...state,
            facetReducer(undefined, action)
          ]
        }

        var facet = _.findWhere(facets, { uid: action.payload.uid })
        facet.items.push(facetItemReducer(undefined, action))

        return facets
      } else {
        return state
      }
    case TOGGLE_FACET_ITEM:
      return state.map(facet =>
        facetReducer(facet, action)
      )
    case CLEAR_FACETS:
      return []
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  datastores: datastoresReducer,
  active_datastore: activeDatastoreReducer,
  search: searchReducer,
  records: recordsReducer,
  routing: routerReducer,
  holdings: holdingsReducer,
  facets: facetsReducer
})

import {
  ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE,
  SUBMIT_SEARCH, ADD_RECORD, CLEAR_RECORDS,
  REQUEST_HOLDINGS, RECIEVE_HOLDINGS,
  LOADED, LOADING, ADD_FACET, CLEAR_FACETS,
  TOGGLE_FACET_ITEM,
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

const searchReducer = (state = {search_query: ""}, action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return Object.assign({}, state, {
        search_query: action.payload.search_query
      })
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
        count: action.payload.item.count
      }
    default:
      return state
  }
}

const facetReducer = (state={ items: [] }, action) => {
  switch (action.type) {
    case ADD_FACET:
      return {
        uid: action.payload.uid,
        metadata: action.payload.metadata,
        items: [
          ...state,
          facetItemReducer(state, action)
        ]
      }
    default:
      return state
  }
}

const facetsReducer = (state={facets: [], active_facets: []}, action) => {
  switch (action.type) {
    case ADD_FACET:
      const does_facet_exist_already = _.findWhere(state.facets, { uid: action.payload.uid })

      if (!does_facet_exist_already) {
        return Object.assign({}, state, {
          facets: [
            ...state.facets,
            facetReducer(state, action)
          ]
        })
      }

      var state_copy = Object.assign({}, state);
      const facet_index = _.findIndex(state_copy.facets, {uid: action.payload.uid})
      state_copy.facets[facet_index].items.push(facetItemReducer(state, action)) //TODO remove mutation

      return state_copy;

    case TOGGLE_FACET_ITEM:
      const uid = action.payload.facet.uid
      const value = action.payload.item.value

      return Object.assign({}, state, {
        active_facets: Object.assign({}, state.active_facets, {
          [uid]: value
        })
      })

    case CLEAR_FACETS:
      return Object.assign({}, state, {
        facets: []
      })
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

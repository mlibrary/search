export const ADD_DATASTORE = 'ADD_DATASTORE'
export const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const ADD_RECORD = 'ADD_RECORD'
export const CLEAR_RECORDS = 'CLEAR_RECORDS'

export const REQUEST_HOLDINGS = 'REQUEST_HOLDINGS'
export const RECIEVE_HOLDINGS = 'RECIEVE_HOLDINGS'

export const LOADING = 'LOADING'
export const LOADED = 'LOADED'

export const ADD_FACET = 'ADD_FACET'
export const CLEAR_FACETS = 'CLEAR_FACETS'
export const TOGGLE_FACET_ITEM = 'TOGGLE_FACET_ITEM'
export const CLEAR_ACTIVE_FACETS = 'CLEAR_ACTIVE_FACETS'

export const addRecord = (payload) => {
  return { type: ADD_RECORD, payload }
}

export const addDatastore = (payload) => {
  return { type: ADD_DATASTORE, payload}
}

export const changeActiveDatastore = (payload) => {
  return { type: CHANGE_ACTIVE_DATASTORE, payload }
}

export const submitSearch = (payload) => {
  return { type: SUBMIT_SEARCH, payload }
}

export const clearRecords = (payload) => {
  return { type: CLEAR_RECORDS, payload }
}

export const fetchHoldings = (mirlyn_ids) => {
  return {}
}

export const requestHoldings = (mirlyn_ids) => {
  return {
    type: REQUEST_HOLDINGS,
    mirlyn_ids
  }
}

export const recieveHoldings = (json) => {
  return {
    type: RECIEVE_HOLDINGS,
    receivedAt: Date.now()
  }
}

export const loading = (payload) => {
  return { type: LOADING, payload }
}

export const loaded = (payload) => {
  return { type: LOADED, payload }
}

export const addFacet = (payload) => {
  return { type: ADD_FACET, payload }
}

export const clearFacets = (payload) => {
  return { type: CLEAR_FACETS, payload }
}

export const toggleFacetItem = (payload) => {
  return { type: TOGGLE_FACET_ITEM, payload }
}

export const clearActiveFacets = (payload) => {
  return { type: CLEAR_ACTIVE_FACETS, payload }
}

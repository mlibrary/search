import { holding_data } from './holding_data' //temp dummy data, later delete this

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
  /*

  Example with first results page for "climate change"

  http://mirlyn-aleph.lib.umich.edu/cgi-bin/getHoldings.pl?id=001294948,001292450,001537069,001842016,000032049,001680047,001105037,001814491,001098489,001505056
  */

  return holding_data
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
    holdings: json.data,
    receivedAt: Date.now()
  }
}

export const loading = (payload) => {
  return { type: LOADING, payload }
}

export const loaded = (payload) => {
  return { type: LOADED, payload }
}

export const addFacet = (facet) => {
  return { type: ADD_FACET, facet }
}

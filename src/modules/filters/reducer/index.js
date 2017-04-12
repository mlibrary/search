import { _ } from 'underscore';

import {
  ADD_FILTER,
  CLEAR_FILTERS,
  ADD_ACTIVE_FILTER,
  REMOVE_ACTIVE_FILTER,
  CLEAR_ACTIVE_FILTERS,
  CLEAR_ALL_FILTERS,
} from '../actions';

const initialState = {
  active: {},
  groups: {}
};

const filtersReducer = function filterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FILTER:
      const uid = action.payload.metadata.uid
      const { name, short_desc } = action.payload.metadata.metadata

      if (!state.groups[uid]) {
        return {
          ...state,
          groups: {
            ...state.groups,
            [uid]: {
              ...state.groups[uid],
              uid: uid,
              name: name,
              short_desc: short_desc,
              filters: {
                [action.payload.name]: {
                  value: action.payload.value,
                  name: action.payload.name,
                  count: action.payload.count,
                }
              }
            }
          }
        }
      }
    else {
      return {
        ...state,
        groups: {
          ...state.groups,
          [uid]: {
            ...state.groups[uid],
            filters: {
              ...state.groups[uid].filters,
              [action.payload.name]: {
                value: action.payload.value,
                name: action.payload.name,
                count: action.payload.count,
              }
            }
          }
        }
      }
    }
    case CLEAR_FILTERS:
      return Object.assign({}, state, {
        groups: {}
      })
    case ADD_ACTIVE_FILTER:
      /*
      // payload fields:
      datastoreUid,
      filterUid
      filterName
      filterItemValue

      // Example of data structure
      active: {
        'mirlyn': {
          'format': {
            uid: 'format',
            name: 'Format'
            filters: ['book', 'ebook']
          },
          // ...
        },
        // ...
      }
      */
      let {
        datastoreUid,
        filterUid,
        filterName,
        filterItemValue
      } = action.payload

      const filterExists = ((
        state.active[datastoreUid] &&
        state.active[datastoreUid][filterUid]
      ) ? true : false)

      if (filterExists) {
        // append new filter item value to filters array
        return {
          ...state,
          active: {
            ...state.active,
            [datastoreUid]: {
              ...state.active[datastoreUid],
              [filterUid]: {
                ...state.active[datastoreUid][filterUid],
                filters: _.uniq(state.active[datastoreUid][filterUid].filters.concat(filterItemValue))
              }
            }
          }
        }
      } else {
        // Create and add the new filter
        return {
          ...state,
          active: {
            ...state.active,
            [datastoreUid]: {
              ...state.active[datastoreUid],
              [filterUid]: {
                uid: filterUid,
                name: filterName,
                filters: [].concat(filterItemValue)
              }
            }
          }
        }
      }
    case REMOVE_ACTIVE_FILTER:
      const removeEntireFilter = ((
        state.active[action.payload.datastoreUid] &&
        state.active[action.payload.datastoreUid][action.payload.filterUid] &&
        state.active[action.payload.datastoreUid][action.payload.filterUid].filters.length === 1
      ) ? true : false)

      if (removeEntireFilter) {

        // remove the entire filter group
        return {
          ...state,
          active: {
            ...state.active,
            [action.payload.datastoreUid]: _.omit(state.active[action.payload.datastoreUid], action.payload.filterUid)
          }
        }
      }

      // remove just the one filter item from the filter group
      return {
        ...state,
        active: {
          ...state.active,
          [action.payload.datastoreUid]: {
            ...state.active[action.payload.datastoreUid],
            [action.payload.filterUid]: {
              ...state.active[action.payload.datastoreUid][action.payload.filterUid],
              filters: _.without(state.active[action.payload.datastoreUid][action.payload.filterUid].filters, action.payload.filterItemValue)
            }
          }
        }
      }
    case CLEAR_ACTIVE_FILTERS:
      return {
        ...state,
        active: _.omit(state.active, action.payload.datastoreUid)
      }
    case CLEAR_ALL_FILTERS:
      return initialState;
    default:
      return state;
  }
};

export default filtersReducer;

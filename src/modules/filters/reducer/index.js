import { _ } from 'underscore';

import {
  ADD_FILTER, SET_ACTIVE_FILTERS,
  CLEAR_FILTERS, CLEAR_ACTIVE_FILTERS,
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
    case SET_ACTIVE_FILTERS:
      return Object.assign({}, state, {
        active: action.payload,
      });
    case CLEAR_FILTERS:
      return Object.assign({}, state, {
        groups: {},
      });
    case CLEAR_ACTIVE_FILTERS:
      return Object.assign({}, state, {
        active: {},
      });
    default:
      return state;
  }
};


/*

[
  {
    uid: 'format'
    name: 'Format',
    short_desc: 'Media format.',
    filters: [
      {
        name: 'Book',
        value: 'Book',
        count: 973088,
      }
    ],
  },
  {
    uid: 'filter-uid-2',
    filters: [
      {
        name: 'Book',
        value: 'Book',
        count: 973088,
      }
    ],
  }
]

*/

export default filtersReducer;

import { _ } from 'underscore';

import {
  ADD_FILTER,
  CLEAR_FILTERS,
  SET_ACTIVE_FILTERS,
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
    case SET_ACTIVE_FILTERS:
      /*
        payload:
        - datastoreUid
        - filters
      */

      const { datastoreUid, filters } = action.payload

      return {
        ...state,
        active: {
          ...state.active,
          [datastoreUid]: filters
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

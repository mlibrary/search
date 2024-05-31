import {
  ADD_FILTERS,
  CLEAR_ACTIVE_FILTERS,
  CLEAR_FILTERS,
  RESET_FILTERS,
  SET_ACTIVE_FILTERS,
  SET_FILTER_GROUP_ORDER
} from '../actions';

const initialState = {
  active: {},
  groups: {},
  order: null
};

const filtersReducer = (state = initialState, action) => {
  if (action.type === ADD_FILTERS) {
    return {
      ...state,
      groups: {
        ...state.groups,
        [action.payload.uid]: action.payload
      }
    };
  }

  if (action.type === CLEAR_ACTIVE_FILTERS) {
    const { [action.payload.datastoreUid]: omitted, ...remainingActive } = state.active;

    if (omitted) {
      //
    }

    return {
      ...state,
      active: remainingActive
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      groups: {}
    };
  }

  if (action.type === RESET_FILTERS) {
    return initialState;
  }

  if (action.type === SET_ACTIVE_FILTERS) {
    const { datastoreUid, filters } = action.payload;
    return {
      ...state,
      active: {
        ...state.active,
        [datastoreUid]: Object.fromEntries(Object.entries(filters).map(
          ([filterUid, filterValue]) => {
            return [filterUid, [...filterValue]];
          }
        ))
      }
    };
  }

  if (action.type === SET_FILTER_GROUP_ORDER) {
    return {
      ...state,
      order: action.payload.order
    };
  }

  return state;
};

export default filtersReducer;

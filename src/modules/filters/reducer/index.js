import {
  ADD_FILTER, TOGGLE_ACTIVE_FILTER,
  CLEAR_FILTERS, CLEAR_ACTIVE_FILTERS,
} from '../actions';

const initialState = {
  filters: {},
  active: {}
};

const filtersReducer = function filterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FILTER:
      return Object.assign({}, state, {
        active: {},
      });
    case TOGGLE_ACTIVE_FILTER:
      break;
    case CLEAR_FILTERS:
      return initialState;
    case CLEAR_ACTIVE_FILTERS:
      return Object.assign({}, state, {
        active: {},
      });
    default:
      return state;
  }
};

export default filtersReducer;

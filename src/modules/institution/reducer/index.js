import * as actions from '../actions/';

const initialState = {
  default: null,
};

const institutionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DEFAULT_INSTITUTION:
      return {
        ...state,
        default: action.payload
      };
    default:
      return state;
  }
};

export default institutionReducer;

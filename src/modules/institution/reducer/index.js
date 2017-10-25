import * as actions from '../actions/';

const initialState = {
  active: null,
  defaultInstitution: null,
  options: [
    'All Libraries',
    'U-M Ann Arbor Libraries',
    'Flint Thompson Library',
    'Bentley Historical Library',
    'William L. Clements Library',
  ],
};

const institutionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DEFAULT_INSTITUTION:
      return {
        ...state,
        defaultInstitution: action.payload
      };
    case actions.SET_ACTIVE_INSTITUTION:
      return {
        ...state,
        active: action.payload
      };
    default:
      return state;
  }
};

export default institutionReducer;

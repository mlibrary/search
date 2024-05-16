import * as actions from '../actions/';

const initialState = {
  affiliationOptions: {
    aa: 'Ann Arbor',
    flint: 'Flint'
  },
  defaultAffiliation: 'aa'
};

const affiliationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DEFAULT_AFFILIATION:
      return {
        ...state,
        defaultAffiliation: action.payload
      };
    case actions.SET_ACTIVE_AFFILIATION:
      return {
        ...state,
        active: action.payload
      };
    default:
      return state;
  }
};

export default affiliationReducer;

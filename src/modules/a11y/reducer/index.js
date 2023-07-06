import * as actions from '../actions';

const initialState = {
  message: ''
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_A11Y_MESSAGE:
      return {
        message: action.payload
      };
    default:
      return state;
  }
};

export default listsReducer;

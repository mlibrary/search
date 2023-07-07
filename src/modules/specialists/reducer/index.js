import * as actions from '../actions';

const initialState = [];

const specialistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_SPECIALISTS:
      return action.payload;
    default:
      return state;
  }
};

export default specialistsReducer;

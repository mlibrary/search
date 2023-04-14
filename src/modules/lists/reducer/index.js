import * as actions from '../actions';

const listsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default listsReducer;

import * as actions from '../actions';

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_PROFILE:
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;

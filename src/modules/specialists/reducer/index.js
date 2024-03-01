import { ADD_SPECIALISTS } from '../actions';

const specialistsReducer = (state = [], action) => {
  return action.type === ADD_SPECIALISTS ? action.payload : state;
};

export default specialistsReducer;

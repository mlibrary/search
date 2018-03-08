import * as actions from '../actions';

const listsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_TO_LIST:
      if (!state[action.payload.datastoreUid]) {
        return {
          ...state,
          [action.payload.datastoreUid]: [].concat(action.payload.item)
        }
      } else {
        return {
          ...state,
          [action.payload.datastoreUid]: state[action.payload.datastoreUid].concat(action.payload.item)
        }
      }
    case actions.REMOVE_FROM_LIST:
      return {
        ...state,
        [action.payload.datastoreUid]: state[action.payload.datastoreUid].filter(item => item.id !== action.payload.item.id)
      }
    default:
      return state
  }
}

export default listsReducer

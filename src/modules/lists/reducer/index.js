import * as actions from '../actions';

const listsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_TO_LIST:
      if (!state[action.payload.datastoreUid]) {
        return {
          ...state,
          [action.payload.datastoreUid]: [action.payload.item]
        }
      } else {
        return {
          ...state,
          [action.payload.datastoreUid]: [action.payload.item].concat(state[action.payload.datastoreUid])
        }
      }
    case actions.REMOVE_FROM_LIST:
      return {
        ...state,
        [action.payload.datastoreUid]: state[action.payload.datastoreUid].filter(item => item.uid !== action.payload.item.uid)
      }
    case actions.REMOVE_ALL_FROM_LIST:
      return {
        ...state,
        [action.payload.datastoreUid]: undefined
      }
    default:
      return state
  }
}

export default listsReducer
import * as actions from '../actions';

const listsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_TO_LIST:
      return {
        ...state,
        [action.datastoreUid]: [
          ...[action.payload.datastoreUid],
          action.payload.item
        ]
      }
    default:
      return state
  }
}

export default listsReducer

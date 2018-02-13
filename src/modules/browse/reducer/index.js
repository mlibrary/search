import * as actions from '../actions/'

const initialState = {}

const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_BROWSE_FILTER:
      return {
        ...state,
        [action.payload.datastoreUid]: {
          ...state[action.payload.datastoreUid],
          [action.payload.filter.uid]: action.payload.filter
        }
      }
    default:
      return state
  }
}

export default browseReducer

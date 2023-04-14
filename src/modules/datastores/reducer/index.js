import * as actions from '../actions/';

const datastoreReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_DATASTORE:
      return {
        uid: action.payload.uid,
        name: action.payload.name,
        slug: action.payload.slug,
        isMultisearch: action.payload.isMultisearch
      };
    default:
      return state;
  }
};

const initialState = {
  active: null,
  datastores: []
};

const datastoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_DATASTORE:
      return Object.assign({}, state, {
        datastores: [
          ...state.datastores,
          datastoreReducer(undefined, action)
        ]
      });
    case actions.CHANGE_ACTIVE_DATASTORE:
      return Object.assign({}, state, {
        active: action.payload
      });
    default:
      return state;
  }
};

export default datastoresReducer;

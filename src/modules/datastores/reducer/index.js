import * as actions from '../actions/';

const datastoreReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_DATASTORE:
      return {
        uid: action.payload.uid,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

const initilState = {
  active: undefined,
  datastores: [],
};

const datastoresReducer = (state = initilState, action) => {
  switch (action.type) {
    case actions.ADD_DATASTORE:
      return Object.assign({}, state, {
        datastores: [
          ...state.datastores,
          datastoreReducer(undefined, action),
        ],
      });
    case actions.CHANGE_ACTIVE_DATASTORE:
      return Object.assign({}, state, {
        active: action.payload,
      });
    default:
      return state;
  }
};

export default datastoresReducer;

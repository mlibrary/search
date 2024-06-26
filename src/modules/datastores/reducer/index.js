import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE } from '../actions/';

const datastoresReducer = (
  state = {
    active: null,
    datastores: []
  },
  action
) => {
  const { payload, type } = action;

  if (type === ADD_DATASTORE) {
    return {
      ...state,
      datastores: [
        ...state.datastores,
        { ...payload }
      ]
    };
  }

  if (type === CHANGE_ACTIVE_DATASTORE) {
    return {
      ...state,
      active: payload
    };
  }

  return state;
};

export default datastoresReducer;

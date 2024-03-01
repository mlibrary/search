import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE } from '../actions/';

const datastoresReducer = (
  state = {
    active: null,
    datastores: []
  },
  action
) => {
  const { type, payload } = action;

  if (type === ADD_DATASTORE) {
    return {
      ...state,
      datastores: [
        ...state.datastores,
        {
          uid: payload.uid,
          name: payload.name,
          slug: payload.slug,
          isMultisearch: payload.isMultisearch
        }
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

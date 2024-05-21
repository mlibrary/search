export const ADD_DATASTORE = 'datastores/ADD_DATASTORE';
export const CHANGE_ACTIVE_DATASTORE = 'datastores/CHANGE_ACTIVE_DATASTORE';

export const addDatastore = (payload) => {
  return { payload, type: ADD_DATASTORE };
};

export const changeActiveDatastore = (payload) => {
  return { payload, type: CHANGE_ACTIVE_DATASTORE };
};

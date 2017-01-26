export const ADD_DATASTORE = 'datastores/ADD_DATASTORE';
export const change_ACTIVE_DATASTORE = 'datastores/CHANGE_ACTIVE_DATASTORE';

export const addDatastore = function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload };
};

export const changeActiveDatastore = function changeActiveDatastore(payload) {
  return { type: change_ACTIVE_DATASTORE, payload };
};

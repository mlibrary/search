export const ADD_ADVANCED_FIELD = 'advanced/ADD_ADVANCED_FIELD';
export const REMOVE_ADVANCED_FIELD = 'advanced/REMOVE_ADVANCED_FIELD';
export const SET_ADVANCED_FIELD = 'advanced/SET_ADVANCED_FIELD';
export const ADD_ADVANCED_FILTER = 'advanced/ADD_ADVANCED_FILTER';
export const SET_ADVANCED_FILTER = 'advanced/SET_ADVANCED_FILTER';

export const addAdvancedField = (payload) => {
  return { type: ADD_ADVANCED_FIELD, payload };
};

export const removeAdvancedField = (payload) => {
  return { type: REMOVE_ADVANCED_FIELD, payload };
};

export const setAdvancedField = (payload) => {
  return { type: SET_ADVANCED_FIELD, payload };
};

export const addAdvancedFilter = (payload) => {
  return { type: ADD_ADVANCED_FILTER, payload };
};

export const setAdvancedFilter = (payload) => {
  return { type: SET_ADVANCED_FILTER, payload };
};

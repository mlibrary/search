export const ADD_ADVANCED_BOOLEAN_TYPES = 'advanced/ADD_ADVANCED_BOOLEAN_TYPES';
export const ADD_ADVANCED_FIELD = 'advanced/ADD_ADVANCED_FIELD';
export const ADD_ADVANCED_FILTER_GROUPS = 'advanced/ADD_ADVANCED_FILTER_GROUPS';
export const ADD_FIELDED_SEARCH = 'advanced/ADD_FIELDED_SEARCH';
export const REMOVE_FIELDED_SEARCH = 'advanced/REMOVE_FIELDED_SEARCH';
export const SET_ADVANCED_FILTER = 'advanced/SET_ADVANCED_FILTER';
export const SET_FIELDED_SEARCH = 'advanced/SET_FIELDED_SEARCH';

export const addAdvancedBooleanTypes = (payload) => {
  return { payload, type: ADD_ADVANCED_BOOLEAN_TYPES };
};

export const addAdvancedField = (payload) => {
  return { payload, type: ADD_ADVANCED_FIELD };
};

export const addAdvancedFilterGroups = (payload) => {
  return { payload, type: ADD_ADVANCED_FILTER_GROUPS };
};

export const addFieldedSearch = (payload) => {
  return { payload, type: ADD_FIELDED_SEARCH };
};

export const removeFieldedSearch = (payload) => {
  return { payload, type: REMOVE_FIELDED_SEARCH };
};

export const setAdvancedFilter = (payload) => {
  return { payload, type: SET_ADVANCED_FILTER };
};

export const setFieldedSearch = (payload) => {
  return { payload, type: SET_FIELDED_SEARCH };
};

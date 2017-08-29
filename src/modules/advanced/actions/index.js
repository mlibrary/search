export const ADD_ADVANCED_FIELD = 'advanced/ADD_ADVANCED_FIELD';

export const ADD_ADVANCED_BOOLEAN_TYPES = 'advanced/ADD_ADVANCED_BOOLEAN_TYPES';

export const ADD_FIELDED_SEARCH = 'advanced/ADD_FIELDED_SEARCH';
export const REMOVE_FIELDED_SEARCH = 'advanced/REMOVE_FIELDED_SEARCH';
export const SET_FIELDED_SEARCH = 'advanced/SET_FIELDED_SEARCH';

export const ADD_ADVANCED_FILTER = 'advanced/ADD_ADVANCED_FILTER';
export const SET_ADVANCED_FILTER = 'advanced/SET_ADVANCED_FILTER';


// Adding Fields to use with a fielded search
export const addAdvancedField = (payload) => {
  return { type: ADD_ADVANCED_FIELD, payload };
};


// Boolean types
export const addAdvancedBooleanTypes = (payload) => {
  return { type: ADD_ADVANCED_BOOLEAN_TYPES, payload };
};


// Fielded searching
export const addFieldedSearch = (payload) => {
  return { type: ADD_FIELDED_SEARCH, payload };
};

export const removeFieldedSearch = (payload) => {
  return { type: REMOVE_FIELDED_SEARCH, payload };
};

export const setFieldedSearch = (payload) => {
  return { type: SET_FIELDED_SEARCH, payload };
};


// Filters
export const addAdvancedFilter = (payload) => {
  return { type: ADD_ADVANCED_FILTER, payload };
};

export const setAdvancedFilter = (payload) => {
  return { type: SET_ADVANCED_FILTER, payload };
};

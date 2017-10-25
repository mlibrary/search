export const SET_DEFAULT_INSTITUTION = 'institution/SET_DEFAULT_INSTITUTION';
export const SET_ACTIVE_INSTITUTION = 'institution/SET_ACTIVE_INSTITUTION';

export const setDefaultInstitution = (payload) => {
  return { type: SET_DEFAULT_INSTITUTION, payload };
};

export const setActiveInstitution = (payload) => {
  return { type: SET_ACTIVE_INSTITUTION, payload };
};

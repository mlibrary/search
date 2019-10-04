export const SET_DEFAULT_AFFILIATION = 'AFFILIATION/SET_DEFAULT_AFFILIATION';
export const SET_ACTIVE_AFFILIATION = 'AFFILIATION/SET_ACTIVE_AFFILIATION';

export const setDefaultAffiliation = (payload) => {
  return { type: SET_DEFAULT_AFFILIATION, payload };
};
const ADD_SPECIALISTS = 'specialists/ADD_SPECIALISTS';

const addSpecialists = (payload) => {
  return { payload, type: ADD_SPECIALISTS };
};

export { ADD_SPECIALISTS, addSpecialists };

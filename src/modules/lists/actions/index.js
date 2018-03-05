export const ADD_TO_LIST = 'lists/ADD_TO_LIST';
export const REMOVE_FROM_LIST = 'lists/REMOVE_FROM_LIST';

export function addToList(payload) {
  return { type: ADD_TO_LIST, payload };
}

export function removeFromList(payload) {
  return { type: REMOVE_FROM_LIST, payload };
}

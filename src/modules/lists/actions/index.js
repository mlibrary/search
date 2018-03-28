export const ADD_LIST = 'lists/ADD_LIST';

export function addList(payload) {
  return { type: ADD_LIST, payload };
}

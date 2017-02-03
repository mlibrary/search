import { _ } from 'underscore';

const getField = function getField(fields, key) {
  return _.findWhere(fields, { uid: key });
};

const getFieldValue = (field) => {
  let value;

  if (field !== undefined && typeof field === 'object') {
    if ('value' in field) {
      value = field.value;
    }
  }

  return value;
};

export {
  getField,
  getFieldValue,
}

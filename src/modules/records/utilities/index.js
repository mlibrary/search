import { findWhere } from '../../reusable/underscore';

const getField = function getField (fields, key) {
  return findWhere(fields, { uid: key });
};

const getFieldValue = (field) => {
  if (field && typeof field === 'object' && 'value' in field) {
    return Array.isArray(field.value) ? field.value : [field.value];
  }

  return [];
};

export {
  getField,
  getFieldValue
};

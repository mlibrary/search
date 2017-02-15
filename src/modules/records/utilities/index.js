import { _ } from 'underscore';

import { config } from '../../../pride-interface';

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

const filterDisplayFields = ({ fields, type, datastore }) => {
  const fields_config = _.findWhere(config.fields, { datastore: datastore })

  return _.filter(fields, (field) => _.contains(fields_config[type], field.uid));
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
}

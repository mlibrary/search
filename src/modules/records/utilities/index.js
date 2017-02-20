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
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  return _.filter(fields, (field) => _.contains(fieldsConfig[type], field.uid));
}

const filterAccessFields = ({ fields, type, datastore }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastore })
  const accessObj = {
    source: _.findWhere(fields, { uid: accessConfig.access.source }),
    text: _.findWhere(fields, { uid: accessConfig.access.text })
  }

  return accessObj
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
  filterAccessFields,
}

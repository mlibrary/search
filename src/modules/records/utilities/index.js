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

  if (!fieldsConfig) {
    return fields
  }

  return _.filter(fields, (field) => _.contains(fieldsConfig[type], field.uid));
}

const filterAccessFields = ({ fields, type, datastore }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastore })

  if (!accessConfig || !accessConfig.access || accessConfig.access.from_holdings) {
    return undefined;
  };

  let text = ''

  if (accessConfig.access.text_default) {
    text = accessConfig.access.text_default;
  } else {
    text = _.findWhere(fields, { uid: accessConfig.access.text })

    if (text) {
      text = text.value;
    }
  }

  let source = _.findWhere(fields, { uid: accessConfig.access.source });
  if (source && source.value) {
    source = source.value
  }

  let link = _.findWhere(fields, { uid: accessConfig.access.link });
  if (link && link.value) {
    link = link.value
  }

  const accessObj = {
    text: text,
    link: link,
    source: source,
  }

  return accessObj
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
  filterAccessFields,
}

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

  if (!accessConfig || !accessConfig.access || accessConfig.access.fromHoldings) {
    return undefined;
  };
  const accessField = _.findWhere(fields, { uid: accessConfig.access.link })

  return _.reduce([].concat(accessField.value), (memo, url) => {
    return memo.concat({
      link: url,
      linkText: accessConfig.access.defaultAccessText,
    })
  }, [])
}

const getHoldings = ({ datastore, holdings }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastore })

  console.log('holdings', holdings)
}

const displayLoadingFeedback = (datastoreUid) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  if (!accessConfig.access || !accessConfig.access.displayLoadingFeedback) {
    return false;
  }

  return accessConfig.access.displayLoadingFeedback;
}

const isFullRecordType = ({ datastoreUid }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  return accessConfig.hasOwnProperty('full')
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
  filterAccessFields,
  displayLoadingFeedback,
  isFullRecordType,
  getHoldings,
}

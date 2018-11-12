import { _ } from 'underscore';

import config from '../../../config';

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

  if (value) {
    return [].concat(value);
  }

  return [];
};

const filterDisplayFields = ({ fields, type, datastore }) => {
  // Find config for this datastore view type.
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  // No display field(s) config for this datastore view type.
  if (!fieldsConfig) {
    return []
  }

  // Look up and order fields as configured.
  // Will return an array of fields
  return _.reduce(fieldsConfig[type], (previous, fieldUid) => {
    const field = _.findWhere(fields, { uid: fieldUid })

    if (field) { // does field exist from Spectrum (back end, solr)
      return previous.concat(field)
    } else if (fieldsConfig.defaultFields) { // check if field exists as default
      const defaultField = _.findWhere(fieldsConfig.defaultFields, { uid: fieldUid })

      if (defaultField) {
        return previous.concat(defaultField)
      }
    }

    return previous
  }, [])
}

const getFullRecordDisplayFields = ({ fields, datastore }) => {
  // Find config for this datastore view type.
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  if (fieldsConfig['full']) {
    return ['standard', 'additional'].reduce((previous, type) => {
      let fieldListOfType = []

      if (fieldsConfig['full'][type]) {
        fieldListOfType = fieldsConfig['full'][type].reduce((fieldList, fieldUid) => {
          const field = _.findWhere(fields, { uid: fieldUid })

          if (field) { // does field exist from Spectrum (back end, solr)
            return fieldList.concat(field)
          } else if (fieldsConfig.defaultFields) { // check if field exists as default
            const defaultField = _.findWhere(fieldsConfig.defaultFields, { uid: fieldUid })

            if (defaultField) {
              return fieldList.concat(defaultField)
            }
          }

          return fieldList
        }, [])
      }

      return {
        ...previous,
        [type]: fieldListOfType
      }
    }, {
      standard: [],
      additional: []
    })
  }

  return {
    standard: [],
    additional: []
  }
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

const getShowAllText = ({ holdingUid, datastoreUid }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  if (accessConfig.holdings) {
    const holdingsConfig = _.findWhere(accessConfig.holdings, { uid: holdingUid })
    return holdingsConfig.showAllName || holdingsConfig.heading
  }

  return undefined
}

const getRecordFormats = ({ fields, datastoreUid }) => {
  const format = getField(fields, 'format')

  if (format) {
    return getFieldValue(format)
  } else {
    const fieldsConfig = _.findWhere(config.fields, { datastore: datastoreUid })

    if (fieldsConfig.defaultFields) {
      const defaultFormat = getField(fieldsConfig.defaultFields, 'format')

      if (defaultFormat) {
        return getFieldValue(defaultFormat)
      }
    }
  }

  return []
}

const hasRecordFullView = ({ datastoreUid }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  return accessConfig.full ? true : false
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
  displayLoadingFeedback,
  isFullRecordType,
  getShowAllText,
  getFullRecordDisplayFields,
  getRecordFormats,
  hasRecordFullView
}

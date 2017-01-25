import { _ } from 'underscore';

import { config } from '../../../config';

export const getField = function getField(fields, key) {
  return _.findWhere(fields, { uid: key });
};

export const getFieldValue = (field) => {
  let value;

  if (field !== undefined && typeof field === 'object') {
    if ('value' in field) {
      value = field.value;
    }
  }

  return value;
};

export const getMediumDisplayFields = function getMediumDisplayFields(record, datastoreUid) {
  try {
    const fieldsConfig = _.findWhere(config.fields, { datastore: datastoreUid });

    // If this datastore has no configuration,
    // just return all record fields.
    if (!fieldsConfig) {
      return record.fields;
    }

    /*
    const displayFields = _.filter(record.fields, (field) => {
      const fieldFiltered = _.filter(fieldsConfig.medium, (medium) => {
        return medium === field.uid;
      });

      return fieldFiltered.length > 0;
    });
    */

    return record.fields;
  } catch (e) {
    throw e;
  }
};

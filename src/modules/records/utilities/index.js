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
  // Find config for this datastore view type.
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  // No display field(s) config for this datastore view type.
  if (!fieldsConfig) {
    return []
  }

  // Look up and order fields as configured.
  const displayFields = _.reduce(fieldsConfig[type], (previous, fieldUid) => {
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

  return displayFields
}

const filterAccessFields = ({ fields, type, datastore, holdings }) => {
  const accessConfig = _.findWhere(config.fields, { datastore: datastore })
  if (!accessConfig || !accessConfig.access || accessConfig.access.fromHoldings) {
    return undefined;
  };

  const accessField = _.findWhere(fields, { uid: accessConfig.access.link })
  if (accessField) {
    return _.reduce([].concat(accessField.value), (memo, url) => {
      return memo.concat({
        link: url,
        linkText: accessConfig.access.defaultAccessText,
        status: status || undefined,
      })
    }, [])
  }

  return undefined
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

const getHoldings = ({ holdings, datastoreUid }) => {
  if (!holdings) {
    return []
  }

  const datastoreConfig = _.findWhere(config.fields, { datastore: datastoreUid })
  if (!datastoreConfig) {
    return []
  }

  const holdingsConfig = datastoreConfig.holdings;

  return holdingsConfig.reduce((previous, holdingConfig) => {
    if (!holdings[holdingConfig.uid]) {
      return previous
    }

    return previous.concat({
      uid: holdingConfig.uid,
      name: holdingConfig.heading,
      holdings: _.map(holdings[holdingConfig.uid], (holding) => {
        return {
          label: holdingConfig.label,
          link: holding[holdingConfig.link],
          linkText: holdingConfig.defaultAccessText,
          status: holding[holdingConfig.status],
          location: holding[holdingConfig.location],
          source: holding[holdingConfig.source],
          callnumber: holding[holdingConfig.callnumber]
        }
      })
    })
  }, [])

  /*
  Returns an object with this example shape.

  [
    {
      uid: 'hathitrust',
      name: 'HathiTrust',
      holdings: [
        {
          link: '',
          linkText: '',
          status: '',
        }
      ]
    }
  ]
  */
}

export {
  getField,
  getFieldValue,
  filterDisplayFields,
  filterAccessFields,
  displayLoadingFeedback,
  isFullRecordType,
  getHoldings
}

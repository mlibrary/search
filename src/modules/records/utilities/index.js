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

  // Lookup to see if access fields have a configuration that access
  // is from the metadata (Solr), not a secondary request from holdings.
  const accessConfig = _.findWhere(config.fields, { datastore: datastore })
  if (!accessConfig || !accessConfig.access || accessConfig.access.fromHoldings) {
    return [];
  };

  // TODO: this is temporay to handle current structure
  // and root link property means a simple single access
  if (accessConfig.access.link) {
    const linkField = _.findWhere(fields, { uid: accessConfig.access.link })

    return [
      [
        {
          isLink: true,
          value: linkField.value,
          label: accessConfig.access.defaultAccessText
        }
      ]
    ]
  }

  // Lookup the field on the record that has the access metadata
  const accessField = _.findWhere(fields, { uid: accessConfig.access.uid })

  // If it exists, proceed, otherwise return empty array (no access options).
  if (accessField && accessField.value) {

    // Iterate over each access metadata object found in the field's value
    return _.reduce(accessField.value, (previous, accessItems) => {

      // Each access item will be an array of objects with the following shape.
      /*
        // For example:
        [
          {
            name: 'Go To Database',
            value: 'http...',
            isLink: true,
          },
          {
            name: 'Coverage',
            value: '2010- ...',
          }
        ]
      */

      // Matchup the fields raw values to the configuration
      const forDisplayAccessItem = _.reduce(accessConfig.access.fields, (memo, configField) => {
        const accessItem = _.findWhere(accessItems, { uid: configField.uid });

        if (accessItem) {
          const label = configField.label || accessItem.name
          const value = accessItem.value
          const isLink = configField.isLink || false

          // Probably unnecessary, but just to make sure check to see if
          // these required fields exists on the metadata
          if (label && value) {
            memo = memo.concat({
              label: label,
              value: value,
              isLink: isLink,
            })
          }
        }

        // Return display access item
        return memo
      }, [])

      previous.push(forDisplayAccessItem)

      return previous
    }, [])
  }

  return []
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
  if (!holdingsConfig) {
    return []
  }

  return holdingsConfig.reduce((previous, holdingConfig) => {
    if (!holdings[holdingConfig.uid]) {
      return previous
    }

    return previous.concat({
      uid: holdingConfig.uid,
      name: holdingConfig.heading,
      holdings: _.map(holdings[holdingConfig.uid], (holding) => {
        let holdingObj = {
          label: holdingConfig.label,
          link: holding[holdingConfig.link],
          linkText: holdingConfig.defaultAccessText,
          status: holding[holdingConfig.status],
          location: holding[holdingConfig.location],
          source: holding[holdingConfig.source],
          callnumber: holding[holdingConfig.callnumber],
          map: holding[holdingConfig.map],
          coverage: holding[holdingConfig.coverage],
          description: holding[holdingConfig.description],
        }

        //rewrite config check
        _.each(config.holdingRewrites, rule => {
          const isMatch = _.isMatch(holdingObj, { [rule.match.uid]: rule.match.value })

          if (isMatch) {
            _.each(rule.replace, replace => {
              holdingObj[replace.uid] = replace.value
            })
          }
        })

        return holdingObj
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

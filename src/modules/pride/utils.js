import { Pride } from 'pride'
import { _ } from 'underscore';
import deepcopy from 'deepcopy'
import qs from 'qs'
import { Validator } from 'jsonschema';

import store from '../../store'
import config from '../../config';

import {
  setRecord,
  setRecordHoldings
} from '../records';

const isSlugADatastore = (slug) => {
  const slugDs = _.findWhere(config.datastores.list, {slug: slug})
  const uidDs = _.findWhere(config.datastores.list, {uid: slug});

  return slugDs || uidDs ? true : false
}

/**
 * getDatastore() takes a datastore unique id {uid}
 * and an array of {datastores} objects, then returns
 * matching datastore Object or undefined if not found.
 */
const getDatastore = ({ uid, datastores }) => {
  return datastores.filter((ds) => {
    return ds.uid === uid
  })[0]
}

const getDatastoreName = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid: uid })

  if (ds && ds.name) {
    return ds.name
  }

  return undefined;
}

const getDatastoreSlug = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid: uid })

  if (ds && ds.slug) {
    return ds.slug
  }

  if (ds) {
    return ds.uid
  }

  return undefined;
}

const getDatastoreUidBySlug = (slugParam) => {
  const slugDs = _.findWhere(config.datastores.list, {slug: slugParam})
  const uidDs = _.findWhere(config.datastores.list, {uid: slugParam});
  const ds = slugDs || uidDs;

  if (!ds) {
    return false;
  }

  return ds.uid;
}

const getMultiSearchRecords = (activeDatastore, allRecords) => {
  const configDs = _.findWhere(config.datastores.list, { uid: activeDatastore })

  if (!configDs) {
    console.log('Config error: getMultiSearchRecords')
    return undefined;
  }

  const multiSearchRecords = _.pick(allRecords, configDs.datastores);
  const bentoBoxes = _.reduce(configDs.datastores, (memo, ds) => {
    let records = _.values(multiSearchRecords[ds]).splice(0, 3);

    memo.push({
      uid: ds,
      name: getDatastoreName(ds),
      slug: getDatastoreSlug(ds),
      records: records,
    })

    return memo;
  }, [])

  return bentoBoxes
}

const getDatastoreSlugByUid = (uid) => {
  const ds = _.findWhere(config.datastores.list, {uid: uid})

  return ds.slug || ds.uid;
}

const isValidURLSearchQuery = ({ urlState }) => {
  const v = new Validator()
  const schema = {
    "type": "object",
    "properties": {
      "filter": {
        "type": "object",
        "patternProperties": {
          "^([A-Za-z0-9_])+$": {
            "type": ["string", "array"],
          }
        }
      },
      "query": {
        "type": "string"
      },
      "page": {
        "type": "string"
      },
      "sort": {
        "type": "string"
      }
    }
  }
  const validated = v.validate(urlState, schema)

  return validated.errors.length === 0
}

/**
 * getStateFromURL() takes a location {Object}, then returns
 * matching datastore Object or undefined if no state exists
 * in the URL (from the location {Object}).
 */
const getStateFromURL = ({ location }) => {
  const urlStateString = deepcopy(location).search

  if (urlStateString.length) {
    const parsed = deepcopy(qs.parse(urlStateString.substring(1), { allowDots: true }))
    const isValid = isValidURLSearchQuery({ urlState: parsed })

    if (!isValid) {
      return undefined
    } else {
      if (parsed.filter) {
        const filterUids = Object.keys(parsed.filter)
        const filterValuesAreArrays = Object.assign(parsed, {
          filter: filterUids.reduce((obj, filterUid) => {
            return {
              ...obj,
              [filterUid]: [].concat(parsed.filter[filterUid])
            }
          }, {})
        })

        return filterValuesAreArrays
      }
    }

    return parsed
  }

  return {}
}

const datastoreRecordsHaveHoldings = (datastore) => {
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  if (fieldsConfig && fieldsConfig.holdings) {
    return true
  }

  return false
}

const createHolding = ({ config, holding }) => {
  const fields = config.fields.reduce((prev, field) => {
    const configuredField = Object.keys(field).reduce((memo, fieldKey) => {

      // Checks to see if a field value should be set to a uid
      // off the holding from the backend.
      if (field[fieldKey].uid) {
        return {
          ...memo,
          [fieldKey]: holding[field[fieldKey].uid]
        }
      } else {
        return {
          ...memo,
          [fieldKey]: field[fieldKey]
        }
      }
    }, {})

    return prev.concat(configuredField)
  }, [])

  return {
    fields: fields
  }
}


// Used to transform backend holdings data to a
// shape better for React and based on configuration.
const transformHoldings = (datastoreUid, holdings) => {
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastoreUid })

  // Ensure there is a config for this datastore and its holdings
  if (fieldsConfig && fieldsConfig.holdings) {
    const holdingGroupUids = Object.keys(fieldsConfig.holdings)
    const holdingsConfigured = holdings.reduce((prev, holding) => {
      const holdingGroupUid = holding.type

      // Do we care about these types of holdings, are they configured?
      if (holdingGroupUids.includes(holdingGroupUid)) {
        const newHolding = createHolding({
          config: fieldsConfig.holdings[holdingGroupUid],
          holding
        })

        if (!prev[holdingGroupUid]) {
          return {
            ...prev,
            [holdingGroupUid]: {
              heading: fieldsConfig.holdings[holdingGroupUid].heading,
              showAllName: fieldsConfig.holdings[holdingGroupUid].showAllName,
              holdings: [].concat(newHolding)
            }
          }

        // Add onto an existing list of holdings.
        } else {
          return {
            ...prev,
            [holdingGroupUid]: {
              ...prev[holdingGroupUid],
              holdings: prev[holdingGroupUid].holdings.concat(newHolding)
            }
          }
        }
      }

      return prev
    }, {})

    return holdingsConfigured
  } else {
    return undefined
  }
}

const requestRecord = ({
  datastoreUid,
  recordUid,
}) => {
  const callback = (record) => {
    store.dispatch(setRecord(record));
  }

  // We only want to send holdings requests for
  // record types that have holdings (e.g. the catalog)
  if (datastoreRecordsHaveHoldings(datastoreUid)) {
    Pride.requestRecord(datastoreUid, recordUid, callback).getHoldings((holdings) => {
      store.dispatch(setRecordHoldings(transformHoldings(datastoreUid, holdings)))
    })
  } else {
    Pride.requestRecord(datastoreUid, recordUid, callback)
  }
}

const stringifySearchQueryForURL = ({
  query,
  filter,
  page,
  sort
}) => {
  const SearchQueryString = qs.stringify({
    query: query === '' ? undefined : query,
    filter,
    page: page && page > 1 ? page : undefined,
    sort,
  }, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format : 'RFC1738'
  })

  return SearchQueryString
}

const parseField = ({
  defaultFieldName,
  stringToParse,
}) => {
  if (!stringToParse) {
    return false
  }

  return Pride.FieldTree.parseField(defaultFieldName, stringToParse)
}

const getFormatIconName = ({ format }) => {
  const icons = config.formatIcons

  const found = icons.filter(f => {
    return f.formats.includes(format)
  })

  if (found.length === 0) {
    return undefined
  }

  return found[0].icon
}

const isFieldASearchLink = ({
  fieldUid,
  datastoreUid
}) => {
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastoreUid })
  if (fieldsConfig && fieldsConfig.searches) {
    const searchField = _.findWhere(fieldsConfig.searches, { uid: fieldUid })

    if (searchField) {
      return searchField
    }
  }

  return undefined
}

export {
  isSlugADatastore,
  getMultiSearchRecords,
  getDatastoreName,
  getDatastoreSlug,
  getDatastoreUidBySlug,
  getDatastore,
  getDatastoreSlugByUid,
  getStateFromURL,
  requestRecord,
  isValidURLSearchQuery,
  stringifySearchQueryForURL,
  parseField,
  getFormatIconName,
  isFieldASearchLink,
  transformHoldings
}

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

  if (fieldsConfig.holdings) {
    return true
  }

  return false
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
      store.dispatch(setRecordHoldings(holdings))
    })
  } else {
    Pride.requestRecord(datastoreUid, recordUid, callback)
  }
}

const stringifySearchQueryForURL = ({
  query,
  filter,
  page
}) => {
  const SearchQueryString = qs.stringify({
    query: query === '' ? undefined : query,
    filter,
    page,
  }, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format : 'RFC1738'
  })

  return SearchQueryString
}

const isDatastoreAdvanced = (datastoreUid) => {
  return config.advanced.includes(datastoreUid)
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
  isDatastoreAdvanced,
  parseField
}

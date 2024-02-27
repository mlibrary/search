import { Pride } from 'pride';
import _ from 'underscore';
import qs from 'qs';
import { Validator } from 'jsonschema';

import store from '../../store';
import config from '../../config';

import { setRecord, setRecordHoldings, setRecordGetThis } from '../records';

import { getField, getFieldValue } from '../records/utilities';

const isSlugADatastore = (slug) => {
  const slugDs = _.findWhere(config.datastores.list, { slug });
  const uidDs = _.findWhere(config.datastores.list, { uid: slug });

  return !!(slugDs || uidDs);
};

/**
 * getDatastore() takes a datastore unique id {uid}
 * and an array of {datastores} objects, then returns
 * matching datastore Object or undefined if not found.
 */
const getDatastore = ({ uid, datastores }) => {
  return datastores.filter((ds) => {
    return ds.uid === uid;
  })[0];
};

const getDatastoreName = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid });

  if (ds && ds.name) {
    return ds.name;
  }

  return undefined;
};

const getDatastoreSlug = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid });

  if (ds && ds.slug) {
    return ds.slug;
  }

  if (ds) {
    return ds.uid;
  }

  return undefined;
};

const getDatastoreUidBySlug = (slugParam) => {
  const slugDs = _.findWhere(config.datastores.list, { slug: slugParam });
  const uidDs = _.findWhere(config.datastores.list, { uid: slugParam });
  const ds = slugDs || uidDs;

  if (!ds) {
    return false;
  }

  return ds.uid;
};

const getMultiSearchRecords = (activeDatastore, allRecords) => {
  const configDs = _.findWhere(config.datastores.list, {
    uid: activeDatastore
  });

  if (!configDs) {
    console.log('Config error: getMultiSearchRecords');
    return undefined;
  }

  const multiSearchRecords = _.pick(allRecords, configDs.datastores);
  const bentoBoxes = _.reduce(
    configDs.datastores,
    (memo, ds) => {
      const records = _.values(multiSearchRecords[ds]).splice(0, 3);

      memo.push({
        uid: ds,
        name: getDatastoreName(ds),
        slug: getDatastoreSlug(ds),
        records
      });

      return memo;
    },
    []
  );

  return bentoBoxes;
};

const getDatastoreSlugByUid = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid });

  return ds.slug || ds.uid;
};

const isValidURLSearchQuery = ({ urlState }) => {
  const v = new Validator();
  const schema = {
    type: 'object',
    properties: {
      filter: {
        type: 'object',
        patternProperties: {
          '^([A-Za-z0-9_])+$': {
            type: ['string', 'array']
          }
        }
      },
      query: {
        type: 'string'
      },
      page: {
        type: 'string'
      },
      sort: {
        type: 'string'
      }
    }
  };
  const validated = v.validate(urlState, schema);

  return validated.errors.length === 0;
};

/**
 * getStateFromURL() takes a location {Object}, then returns
 * matching datastore Object or undefined if no state exists
 * in the URL (from the location {Object}).
 */
const getStateFromURL = ({ location }) => {
  const urlStateString = _.clone(location).search;

  if (urlStateString.length) {
    const parsed = _.clone(
      qs.parse(urlStateString.substring(1), { allowDots: true })
    );
    const isValid = isValidURLSearchQuery({ urlState: parsed });

    if (!isValid) {
      return undefined;
    } else {
      if (parsed.filter) {
        // Do not filter for "All collections" if queried (LIBSEARCH-796)
        if (parsed.filter.collection === 'All collections') {
          delete parsed.filter.collection;
        }
        const filterUids = Object.keys(parsed.filter);
        const filterValuesAreArrays = Object.assign(parsed, {
          filter: filterUids.reduce((obj, filterUid) => {
            return {
              ...obj,
              [filterUid]: [].concat(parsed.filter[filterUid])
            };
          }, {})
        });

        return filterValuesAreArrays;
      }
    }

    return parsed;
  }

  return {};
};

const fetchRecordFromState = ({ datastoreUid, recordUid }) => {
  const state = store.getState();

  return _.findWhere(state.records.records[datastoreUid], { uid: recordUid });
};

// Code originally Pride.requestRecord
const prideRequestRecord = (source, id, func = () => { /** */ }) => {
  const record = new Pride.Core.Record({
    complete: false,
    source: `${config.spectrum}/${source}/record/${id}`, // `${Pride.AllDatastores.get(source)?.get('url') ?? ''}/record/${id}`
    names: [undefined]
  });
  record.renderFull(func);
  return record;
};

const requestRecord = ({ datastoreUid, recordUid }) => {
  // Requesting a record ordered options:
  // 1. Is the record in the results? Use that.
  // 2. If not, then ask Pride to fetch the record.
  const recordFromState = fetchRecordFromState({ datastoreUid, recordUid });

  if (recordFromState) {
    store.dispatch(setRecord(recordFromState));
  } else {
    const callback = (record) => {
      const resourceAccess = getFieldValue(
        getField(record.fields, 'resource_access')
      );

      store.dispatch(
        setRecord({
          uid: recordUid,
          resourceAccess,
          ...record
        })
      );
    };
    const record = prideRequestRecord(datastoreUid, recordUid, callback);

    // We only want to send holdings requests for
    // record types that have holdings (e.g. the catalog)
    if (datastoreUid === 'mirlyn') {
      record.getHoldings((data) => {
        store.dispatch(setRecordHoldings(data));
      });
    }
  }
};

const requestGetThis = ({ datastoreUid, recordUid, barcode }) => {
  const callback = (data) => {
    store.dispatch(setRecordGetThis(data));
  };

  const record = prideRequestRecord(datastoreUid, recordUid);

  record.getGetThis(barcode, callback);
};

const stringifySearchQueryForURL = ({ query, filter, library, page, sort }) => {
  const SearchQueryString = qs.stringify(
    {
      query: query === '' ? undefined : query,
      filter,
      library,
      page: page && page > 1 ? page : undefined,
      sort
    },
    {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format: 'RFC1738'
    }
  );

  return SearchQueryString;
};

const parseField = ({ defaultFieldName, stringToParse }) => {
  if (!stringToParse) {
    return false;
  }

  return Pride.FieldTree.parseField(defaultFieldName, stringToParse);
};

const isFieldASearchLink = ({ fieldUid, datastoreUid }) => {
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastoreUid });
  if (fieldsConfig && fieldsConfig.searches) {
    const searchField = _.findWhere(fieldsConfig.searches, { uid: fieldUid });

    if (searchField) {
      return searchField;
    }
  }

  return undefined;
};

export {
  isSlugADatastore,
  getMultiSearchRecords,
  getDatastoreName,
  getDatastoreSlug,
  getDatastoreUidBySlug,
  getDatastore,
  getDatastoreSlugByUid,
  getStateFromURL,
  prideRequestRecord,
  requestRecord,
  isValidURLSearchQuery,
  stringifySearchQueryForURL,
  parseField,
  isFieldASearchLink,
  requestGetThis
};

import { getField, getFieldValue } from '../records/utilities';
import { setRecord, setRecordGetThis, setRecordHoldings } from '../records';
import config from '../../config';
import { findWhere } from '../reusable/underscore';
import { getSearchStateFromURL } from '../search';
import { Pride } from 'pride';
import store from '../../store';

const getDatastoreByUid = (uid) => {
  return config.datastores.list.find((datastore) => {
    return datastore.uid === uid;
  });
};

const getDatastoreUidBySlug = (slugParam) => {
  const slugDs = config.datastores.list.find((datastore) => {
    return datastore.slug === slugParam;
  });

  const uidDs = slugDs || getDatastoreByUid(slugParam);

  return uidDs?.uid;
};

const getMultiSearchRecords = (activeDatastore, allRecords) => {
  const configDs = getDatastoreByUid(activeDatastore);

  if (!configDs) {
    return null;
  }

  const { datastores } = configDs;

  // Pick records corresponding to configDs.datastores using Object.keys
  const multiSearchRecords = datastores.reduce((selectedRecords, datastore) => {
    if (allRecords[datastore]) {
      selectedRecords[datastore] = allRecords[datastore];
    }
    return selectedRecords;
  }, {});

  const bentoBoxes = datastores.reduce(
    (memo, datastore) => {
      const { name, slug, uid } = getDatastoreByUid(datastore);
      const records = (multiSearchRecords[datastore] && Object.values(multiSearchRecords[datastore]).splice(0, 3)) || [];
      memo.push({ name, records, slug, uid });

      return memo;
    }, []
  );

  return bentoBoxes;
};

const getDatastoreSlugByUid = (uid) => {
  const datastore = getDatastoreByUid(uid);

  return datastore?.slug || datastore?.uid;
};
const isValidURLSearchQuery = ({ urlState }) => {
  // Ensure urlState is an object but not null
  if (typeof urlState !== 'object' || urlState === null) {
    return false;
  }

  // Short-circuit to invalidate if non-string truthy values are found
  if ((urlState.query && typeof urlState.query !== 'string')
    || (urlState.page && typeof urlState.page !== 'string')
    || (urlState.sort && typeof urlState.sort !== 'string')) {
    return false;
  }

  // Check 'filter' property if it exists
  if (Object.hasOwn(urlState, 'filter')) {
    const { filter } = urlState;
    if (typeof filter !== 'object' || filter === null) {
      return false;
    }

    for (const [prop, value] of Object.entries(filter)) {
      if (!/^[A-Za-z0-9_]+$/u.test(prop)) {
        return false;
      }
      const isStringOrArray = typeof value === 'string' || (Array.isArray(value) && value.every((item) => {
        return typeof item === 'string';
      }));
      if (!isStringOrArray) {
        return false;
      }
    }
  }

  return true;
};

/**
 * GetStateFromURL() takes a location {Object}, then returns
 * matching datastore Object or undefined if no state exists
 * in the URL (from the location {Object}).
 */
const getStateFromURL = ({ location }) => {
  const urlStateString = location.search;

  if (!urlStateString.length) {
    return {};
  }

  const parsed = { ...getSearchStateFromURL(urlStateString) };
  const isValid = isValidURLSearchQuery({ urlState: parsed });

  if (!isValid) {
    return null;
  }

  if (parsed.filter) {
    if (parsed.filter.collection === 'All collections') {
      delete parsed.filter.collection;
    }

    return {
      ...parsed,
      filter: Object.entries(parsed.filter).reduce((obj, [filterUid, value]) => {
        // Ensure each value is an array
        obj[filterUid] = [].concat(value);
        return obj;
      }, {})
    };
  }

  return parsed;
};

const requestRecord = ({ datastoreUid, recordUid }) => {
  /*
   * Requesting a record ordered options:
   * 1. Is the record in the results? Use that.
   * 2. If not, then ask Pride to fetch the record.
   */
  const recordFromState = findWhere(store.getState().records.records[datastoreUid], { uid: recordUid });

  if (recordFromState) {
    store.dispatch(setRecord(recordFromState));
  } else {
    const callback = (record) => {
      const resourceAccess = getFieldValue(
        getField(record.fields, 'resource_access')
      );

      store.dispatch(
        setRecord({
          resourceAccess,
          uid: recordUid,
          ...record
        })
      );
    };
    const record = Pride.requestRecord(datastoreUid, recordUid, callback);

    /*
     * We only want to send holdings requests for
     * record types that have holdings (e.g. the catalog)
     */
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

  const record = Pride.requestRecord(datastoreUid, recordUid);

  record.getGetThis(barcode, callback);
};

// Code originally Pride.FieldTree.parseField
const prideParseField = (fieldName, content) => {
  if (!content) {
    return {};
  }

  try {
    return Pride.Parser.parse(content, { defaultFieldName: fieldName });
  } catch {
    return new (Pride.Core.nodeFactory('raw'))(content);
  }
};

export {
  getDatastoreByUid,
  getDatastoreSlugByUid,
  getDatastoreUidBySlug,
  getMultiSearchRecords,
  getStateFromURL,
  isValidURLSearchQuery,
  prideParseField,
  requestRecord,
  requestGetThis
};

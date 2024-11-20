import { findWhere } from '../../reusable/underscore';
import { getDatastoreByUid } from '../../pride';

const getField = function getField (fields, key) {
  return findWhere(fields, { uid: key });
};

const getFieldValue = (field) => {
  if (field && typeof field === 'object' && 'value' in field) {
    return Array.isArray(field.value) ? field.value : [field.value];
  }

  return [];
};

const getMultiSearchRecords = (activeDatastore, allRecords) => {
  const configDatastore = getDatastoreByUid(activeDatastore);

  if (!configDatastore) {
    return null;
  }

  const { datastores } = configDatastore;

  const datastoreRecords = datastores.reduce((acc, datastore) => {
    if (allRecords[datastore]) {
      acc[datastore] = allRecords[datastore];
    }
    return acc;
  }, {});

  const multiSearchRecords = datastores.map((datastore) => {
    const { name, slug, uid } = getDatastoreByUid(datastore);
    const records = datastoreRecords[datastore] ? Object.values(datastoreRecords[datastore]).slice(0, 3) : [];

    return { name, records, slug, uid };
  });

  return multiSearchRecords;
};

export {
  getField,
  getFieldValue,
  getMultiSearchRecords
};

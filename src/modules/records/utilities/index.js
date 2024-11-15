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

export {
  getField,
  getFieldValue,
  getMultiSearchRecords
};

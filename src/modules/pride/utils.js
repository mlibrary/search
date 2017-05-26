import { _ } from 'underscore';

import config from '../../config';

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

export {
  isSlugADatastore,
  getMultiSearchRecords,
  getDatastoreName,
  getDatastoreSlug,
  getDatastoreUidBySlug,
  getDatastore,
  getDatastoreSlugByUid
}

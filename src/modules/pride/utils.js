import { _ } from 'underscore';

import config from '../../config';

const isSlugADatastore = (slug) => {
  const slugDs = _.findWhere(config.datastores.list, {slug: slug})
  const uidDs = _.findWhere(config.datastores.list, {uid: slug});

  return slugDs || uidDs ? true : false
}

export {
  isSlugADatastore
}

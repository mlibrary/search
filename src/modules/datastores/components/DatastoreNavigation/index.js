import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import React from 'react';
import { stringifySearch } from '../../../search';

const DatastoreNavigation = ({ activeFilters, activeInstitution, currentDatastore, datastores, page, query, sort }) => {
  return (
    <nav className='datastore-nav' aria-label='Datastores'>
      <ol className='list__unstyled'>
        {datastores.map((datastore) => {
          const { isMultisearch, name, slug, uid } = datastore;
          const queryString = stringifySearch({
            filter: activeFilters[uid],
            library: uid === 'mirlyn' ? activeInstitution : null,
            page: page[uid] === 1 ? null : page[uid],
            query,
            sort: sort[uid]
          });
          return (
            <li key={uid}>
              <Anchor
                to={`/${slug}${queryString ? `?${queryString}` : ''}`}
                aria-current={currentDatastore === uid && 'page'}
              >
                {isMultisearch && <Icon icon='multi_result' size='1.5em' />}
                {name}
              </Anchor>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DatastoreNavigation;

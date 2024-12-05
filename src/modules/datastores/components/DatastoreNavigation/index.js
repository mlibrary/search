import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { stringifySearch } from '../../../search';

const DatastoreNavigation = ({ activeFilters, activeInstitution, currentDatastore, datastores, page, query, sort }) => {
  return (
    <nav className='datastore-nav' aria-label='Datastores'>
      <ol>
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

DatastoreNavigation.propTypes = {
  activeFilters: PropTypes.object,
  activeInstitution: PropTypes.string,
  currentDatastore: PropTypes.string,
  datastores: PropTypes.array,
  page: PropTypes.object,
  query: PropTypes.string,
  sort: PropTypes.object
};

export default DatastoreNavigation;

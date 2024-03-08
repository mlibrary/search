import React from 'react';
import './styles.css';
import { stringifySearchQueryForURL } from '../../../pride';
import { Anchor, Icon } from '../../../reusable';
import PropTypes from 'prop-types';

function DatastoreNavigation ({ activeFilters, datastores, institution, search }) {
  return (
    <nav className='datastore-nav' aria-label='Datastores'>
      <ol>
        {datastores.datastores.map((datastore) => {
          const queryString = stringifySearchQueryForURL({
            query: search.query,
            filter: activeFilters[datastore.uid],
            page: search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid],
            sort: search.sort[datastore.uid],
            library: datastore.uid === 'mirlyn' ? institution.active : undefined
          });
          return (
            <li key={datastore.uid}>
              <Anchor
                to={`/${datastore.slug}${queryString ? `?${queryString}` : ''}`}
                aria-current={datastores.active === datastore.uid && 'page'}
              >
                {datastore.isMultisearch && <Icon icon='multi_result' />}
                {datastore.name}
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
  datastores: PropTypes.object,
  institution: PropTypes.object,
  search: PropTypes.object
};

export default DatastoreNavigation;

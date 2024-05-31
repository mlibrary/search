import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';
import { stringifySearch } from '../../../search';

const DatastoreNavigation = ({ activeFilters, datastores, institution, search }) => {
  return (
    <nav className='datastore-nav' aria-label='Datastores'>
      <ol>
        {datastores.datastores.map((datastore) => {
          const queryString = stringifySearch({
            filter: activeFilters[datastore.uid],
            library: datastore.uid === 'mirlyn' ? institution.active : null,
            page: search.page[datastore.uid] === 1 ? null : search.page[datastore.uid],
            query: search.query,
            sort: search.sort[datastore.uid]
          });
          return (
            <li key={datastore.uid}>
              <Anchor
                to={`/${datastore.slug}${queryString ? `?${queryString}` : ''}`}
                aria-current={datastores.active === datastore.uid && 'page'}
              >
                {datastore.isMultisearch && <Icon icon='multi_result' size='1.5em' />}
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

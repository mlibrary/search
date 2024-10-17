import './styles.css';
import { Anchor, Breadcrumb, H1 } from '../../../reusable';
import AdvancedSearchForm from '../AdvancedSearchForm';
import React from 'react';
import { stringifySearch } from '../../../search';
import { useSelector } from 'react-redux';

const AdvancedSearchContainer = () => {
  const { active: activeDatastoreUid, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const { page, query, sort } = useSelector((state) => {
    return state.search;
  });
  const { active: activeFilters } = useSelector((state) => {
    return state.filters;
  });
  const { active: library } = useSelector((state) => {
    return state.institution;
  });
  const activeDatastore = datastores.find((datastore) => {
    return datastore.uid === activeDatastoreUid;
  });
  const queryString = ({ datastoreUid, nav }) => {
    const stringSearch = stringifySearch({
      filter: activeFilters[datastoreUid],
      library: datastoreUid === 'mirlyn' ? library : null,
      page: nav || page[datastoreUid] === 1 ? null : page[datastoreUid],
      query,
      sort: sort[datastoreUid]
    });
    return stringSearch ? `?${stringSearch}` : '';
  };

  return (
    <div className='container container-narrow margin-top__m'>
      <Breadcrumb
        items={[
          { text: `${activeDatastore.name}`, to: `/${activeDatastore.slug}${queryString({ datastoreUid: activeDatastoreUid })}` },
          { text: 'Advanced Search' }
        ]}
      />

      <H1 className='heading-xlarge'>Advanced Search</H1>
      <p className='font-lede'>Select a search category below for associated advanced search options.</p>

      <nav className='advanced-search-nav' aria-label='Advanced Search Datastores'>
        <ol className='flex__responsive list__unstyled'>
          {datastores.map((datastore) => {
            return (
              <li key={datastore.uid}>
                <Anchor
                  to={`/${datastore.slug}/advanced${queryString({ datastoreUid: datastore.uid, nav: true })}`}
                  aria-current={activeDatastoreUid === datastore.uid && 'page'}
                  className='underline__hover'
                >
                  {datastore.name}
                </Anchor>
              </li>
            );
          })}
        </ol>
      </nav>

      <AdvancedSearchForm datastore={activeDatastore} />
    </div>
  );
};

export default AdvancedSearchContainer;

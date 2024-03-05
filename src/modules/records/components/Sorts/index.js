import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { findWhere } from '../../../reusable/underscore';
import config from '../../../../config';
import { stringifySearchQueryForURL } from '../../../pride';

const getSorts = ({ sorts, configuredSorts }) => {
  if (!configuredSorts) {
    return [];
  }

  return configuredSorts.sorts
    .map((uid) => {
      return findWhere(sorts, { uid });
    })
    .filter((foundSort) => {
      return foundSort !== undefined;
    })
    .map((foundSort) => {
      return {
        uid: foundSort.uid,
        name: foundSort.metadata.name
      };
    });
};

const Sorts = () => {
  const history = useHistory();
  const { datastoreSlug } = useParams();
  const {
    activeFilters,
    datastoreUid,
    institution,
    query,
    sort,
    sorts
  } = useSelector((state) => {
    const datastoreUid = state.datastores.active;
    const data = state.search.data;
    const sorts = data[datastoreUid] ? data[datastoreUid].sorts : [];

    return {
      activeFilters: state.filters.active[datastoreUid],
      datastoreUid,
      institution: state.institution,
      query: state.search.query,
      sort: state.search.sort[datastoreUid],
      sorts: getSorts({
        sorts,
        configuredSorts: config.sorts[datastoreUid]
      })
    };
  });

  const handleOnChange = (event) => {
    window.dataLayer.push({
      event: 'sortBySelection',
      sortByElement: event.target.options[event.target.selectedIndex]
    });

    const queryString = stringifySearchQueryForURL({
      query,
      filter: activeFilters,
      library: datastoreUid === 'mirlyn' ? institution.active : undefined,
      sort: event.target.value
    });

    history.push(`/${datastoreSlug}?${queryString}`);
  };

  if (sorts?.length > 0) {
    return (
      <div>
        <label className='sorts-label sorts-label-text' htmlFor='sort-by' style={{ display: 'inline-block' }}>
          Sort by
        </label>
        <select className='dropdown sorts-select' value={sort} onChange={handleOnChange} autoComplete='off' id='sort-by'>
          {sorts.map((item) => {
            return (
              <option key={item.uid} value={item.uid}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  return null;
};

export default Sorts;

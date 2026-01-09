import { addFieldedSearch, AdvancedSearchSubmit } from '../../../advanced';
import { Alert, Icon } from '../../../reusable';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FieldInput from '../FieldInput';
import FiltersContainer from '../FiltersContainer';
import { stringifySearch } from '../../../search';
import { useNavigate } from 'react-router-dom';

const AdvancedSearchForm = ({ datastore }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const { name, slug, uid: datastoreUid } = datastore;

  const { activeFilters: currentActiveFilters = {}, fieldedSearches, fields } = useSelector((state) => {
    return state.advanced[datastoreUid];
  });
  const { booleanTypes } = useSelector((state) => {
    return state.advanced;
  });
  const institution = useSelector((state) => {
    return state.institution;
  });
  const activeFilters = Object.entries(currentActiveFilters).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const handleAddAnotherFieldedSearch = useCallback((event) => {
    event.preventDefault();
    dispatch(addFieldedSearch({
      datastoreUid,
      field: fields[0].uid
    }));
  }, [dispatch, datastoreUid, fields]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    /*
     * Build the query
     * example: '(evolution) AND title:(parrots) AND author:(charles)'
     */
    const query = fieldedSearches
      .reduce((memo, fieldedSearch) => {
        const { field, query: queryValue } = fieldedSearch;
        if (queryValue.length) {
          if (memo.length > 0) {
            memo.push(booleanTypes[fieldedSearch.booleanType]);
          }
          let input = `(${queryValue})`;
          if (field !== 'keyword') {
            input = `${field}:${input}`;
          }
          memo.push(input);
        }

        return memo;
      }, [])
      .join(' ');

    if (query.length > 0 || (Object.keys(activeFilters).length > 0)) {
      const search = {
        filter: { ...activeFilters },
        query
      };

      if (datastoreUid === 'mirlyn') {
        if (search.filter.institution) {
          const { institution: [firstInstitution] } = search.filter;
          search.library = firstInstitution;
          delete search.filter.institution;
        } else {
          search.library = institution.active ?? institution.defaultInstitution;
        }
      }

      navigate(`/${slug}?${stringifySearch(search)}`);
    } else {
      setErrors([
        'A search term or option is required to submit an advanced search.'
      ]);
      window.scrollTo(0, 0);
    }
  }, [navigate, institution, booleanTypes, fieldedSearches, activeFilters, datastore]);

  return (
    <form className='y-spacing container__rounded page margin-top__none' onSubmit={handleSubmit}>
      <h2>{name} Search</h2>
      {errors.map((error, index) => {
        return (
          <Alert type='error' key={index}>
            <div className='x-spacing h4'>
              <Icon icon='error' size={20} />
              <span>{error}</span>
            </div>
          </Alert>
        );
      })}

      <h3 className='offscreen'>Fielded search options</h3>

      {fieldedSearches.map((fieldedSearch, index) => {
        return <FieldInput key={index} {...{ booleanTypes, datastoreUid, fieldedSearch, fieldedSearchIndex: index, fields }} />;
      })}

      <button
        className='btn btn--small btn--secondary margin-x__auto flex'
        onClick={handleAddAnotherFieldedSearch}
        type='button'
      >
        Add another field
      </button>

      <AdvancedSearchSubmit />

      <FiltersContainer {...{ datastoreUid }} />
    </form>
  );
};

export default AdvancedSearchForm;

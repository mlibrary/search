import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch
} from '../../../advanced';
import { Alert, Icon } from '../../../reusable';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FieldInput from '../FieldInput';
import FiltersContainer from '../FiltersContainer';
import PropTypes from 'prop-types';
import { stringifySearch } from '../../../search';
import { useNavigate } from 'react-router-dom';

const AdvancedSearchForm = ({ datastore }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const fields = useSelector((state) => {
    return state.advanced[datastore.uid].fields;
  });
  const booleanTypes = useSelector((state) => {
    return state.advanced.booleanTypes;
  });
  const fieldedSearches = useSelector((state) => {
    return state.advanced[datastore.uid].fieldedSearches;
  });
  const institution = useSelector((state) => {
    return state.institution;
  });
  const activeFilters = useSelector((state) => {
    const currentFilters = state.advanced[datastore.uid].activeFilters || {};
    Object.keys(currentFilters).forEach((filter) => {
      if (!currentFilters[filter]) {
        delete currentFilters[filter];
      }
    });
    return currentFilters;
  });

  // Functions wrapped with useCallback to prevent unnecessary re-creation
  const changeFieldedSearch = useCallback(({ booleanType, fieldedSearchIndex, query, selectedFieldUid }) => {
    dispatch(setFieldedSearch({
      booleanType,
      datastoreUid: datastore.uid,
      fieldedSearchIndex,
      query,
      selectedFieldUid
    }));
  }, [dispatch, datastore.uid]);

  const handleAddAnotherFieldedSearch = useCallback((event) => {
    event.preventDefault();
    dispatch(addFieldedSearch({
      datastoreUid: datastore.uid,
      field: fields[0].uid
    }));
  }, [dispatch, datastore.uid, fields]);

  const handleRemoveFieldedSearch = useCallback(({ removeIndex }) => {
    dispatch(removeFieldedSearch({
      datastoreUid: datastore.uid,
      removeIndex
    }));
  }, [dispatch, datastore.uid]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    /*
     * Build the query
     * example: 'title:parrots AND author:charles'
     */
    const query = fieldedSearches
      .reduce((memo, fieldedSearch) => {
        if (fieldedSearch.query.length) {
          if (memo.length > 0) {
            memo.push(booleanTypes[fieldedSearch.booleanType]);
          }
          const input = fieldedSearch.field === 'keyword' ? fieldedSearch.query : `${fieldedSearch.field}:(${fieldedSearch.query})`;
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

      if (datastore.uid === 'mirlyn') {
        if (search.filter.institution) {
          const { institution: [firstInstitution] } = search.filter;
          search.library = firstInstitution;
          delete search.filter.institution;
        } else {
          search.library = institution.active ?? institution.defaultInstitution;
        }
      }

      navigate(`/${datastore.slug}?${stringifySearch(search)}`);
    } else {
      setErrors([
        'A search term or option is required to submit an advanced search.'
      ]);
      window.scrollTo(0, 0);
    }
  }, [navigate, institution, booleanTypes, fieldedSearches, activeFilters, datastore]);

  return (
    <form className='y-spacing' onSubmit={handleSubmit}>
      <h2 style={{ fontSize: '1.87rem' }}>{datastore.name} Search</h2>
      {errors.map((error, index) => {
        return (
          <Alert type='error' key={index}>
            <div
              className='x-spacing'
              style={{ fontSize: '1rem' }}
            >
              <Icon icon='error' size={20} />
              <span>{error}</span>
            </div>
          </Alert>
        );
      })}

      <h3 className='offscreen'>Fielded search options</h3>

      {fieldedSearches.map((fs, index) => {
        return (
          <FieldInput
            key={index}
            fieldedSearchIndex={index}
            fieldedSearch={fs}
            fields={fields}
            changeFieldedSearch={changeFieldedSearch}
            handleRemoveFieldedSearch={() => {
              return handleRemoveFieldedSearch({ removeIndex: index });
            }}
            activeDatastore={datastore}
          />
        );
      })}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <button
          className='btn btn--small btn--secondary'
          onClick={handleAddAnotherFieldedSearch}
          type='button'
        >
          Add another field
        </button>
      </div>

      <button
        className='btn btn--primary margin-top__m'
        type='submit'
      >
        <Icon icon='search' size={24} /> Advanced Search
      </button>

      <FiltersContainer datastore={datastore} />
    </form>
  );
};

AdvancedSearchForm.propTypes = {
  datastore: PropTypes.object.isRequired
};

export default AdvancedSearchForm;

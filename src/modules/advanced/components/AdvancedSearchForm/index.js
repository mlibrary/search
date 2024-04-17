import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Alert } from '../../../reusable';
import FieldInput from '../FieldInput';
import FiltersContainer from '../FiltersContainer';
import { stringifySearch } from '../../../search';
import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch
} from '../../../advanced';
import PropTypes from 'prop-types';

function AdvancedSearchForm (props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const { datastore } = props;
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
      if (!currentFilters[filter]) delete currentFilters[filter];
    });
    return currentFilters;
  });

  // Functions wrapped with useCallback to prevent unnecessary re-creation
  const changeFieldedSearch = useCallback(({ fieldedSearchIndex, selectedFieldUid, query, booleanType }) => {
    dispatch(setFieldedSearch({
      datastoreUid: datastore.uid,
      fieldedSearchIndex,
      selectedFieldUid,
      query,
      booleanType
    }));
  }, [dispatch, datastore.uid]);

  const handleAddAnotherFieldedSearch = useCallback((e) => {
    e.preventDefault();
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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Build the query
    // example: 'title:parrots AND author:charles'
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

    let hasActiveFilters = false;

    if (activeFilters && Object.keys(activeFilters).length > 0) {
      hasActiveFilters = true;
    }

    let filter = activeFilters;

    // TODO: Build the filters
    // Submit search if query or filters are active
    if (query.length > 0 || hasActiveFilters) {
      let library;

      if (datastore.uid === 'mirlyn') {
        library = institution.active
          ? institution.active
          : institution.defaultInstitution;
        if (filter.institution) {
          library = filter.institution[0]; // inst overrides library
          filter = { ...filter, institution: undefined }; // remove inst from filter obj
        }
      }
      const queryString = stringifySearch({
        query,
        filter,
        library
      });

      navigate(`/${datastore.slug}?${queryString}`);
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
      {errors.map((error, i) => {
        return (
          <Alert type='error' key={i}>
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

      {fieldedSearches.map((fs, i) => {
        return (
          <FieldInput
            key={i}
            fieldedSearchIndex={i}
            fieldedSearch={fs}
            fields={fields}
            changeFieldedSearch={changeFieldedSearch}
            handleRemoveFieldedSearch={() => {
              return handleRemoveFieldedSearch({ removeIndex: i });
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
        className='btn btn--primary'
        style={{ marginTop: '1rem' }}
        type='submit'
      >
        <Icon icon='search' size={24} /> Advanced Search
      </button>

      <FiltersContainer datastore={datastore} />
    </form>
  );
}

AdvancedSearchForm.propTypes = {
  datastore: PropTypes.object.isRequired
};

export default AdvancedSearchForm;

/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Alert } from '../../../reusable';
import { withRouter } from 'react-router-dom';
import FieldInput from '../FieldInput';
import FiltersContainer from '../FiltersContainer';
import { stringifySearchQueryForURL } from '../../../pride';
import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch
} from '../../../advanced';
import _ from 'underscore';
import PropTypes from 'prop-types';

class AdvancedSearchForm extends React.Component {
  state = {
    errors: []
  };

  changeFieldedSearch = ({
    fieldedSearchIndex,
    selectedFieldUid,
    query,
    booleanType
  }) => {
    return this.props.setFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      fieldedSearchIndex,
      selectedFieldUid,
      query,
      booleanType
    });
  };

  handleAddAnotherFieldedSearch = (e) => {
    e.preventDefault();
    this.props.addFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      field: this.props.fields[0].uid
    });
  };

  handleRemoveFieldedSearch ({ removeIndex }) {
    this.props.removeFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      removeIndex
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      fieldedSearches,
      booleanTypes,
      institution,
      datastore,
      activeFilters
    } = this.props;

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
      const { history } = this.props;
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
      const queryString = stringifySearchQueryForURL({
        query,
        filter,
        library
      });

      const url = `/${datastore.slug}?${queryString}`;
      history.push(url);
    } else {
      this.setState({
        errors: [
          'A search term or option is required to submit an advanced search.'
        ]
      });
      window.scrollTo(0, 0);
    }
  };

  renderErrors = () => {
    const { errors } = this.state;

    if (errors) {
      return (
        <>
          {errors.map((error, i) => {
            return (
              <Alert type='error' key={i}>
                <div
                  className='x-spacing'
                  style={{
                    fontSize: '1rem'
                  }}
                >
                  <Icon icon='error' size={20} />
                  <span>{error}</span>
                </div>
              </Alert>
            );
          })}
        </>
      );
    }

    return null;
  };

  render () {
    const { datastore, fields, fieldedSearches } = this.props;

    return (
      <form className='y-spacing' onSubmit={this.handleSubmit}>
        <h2 css={{ fontSize: '1.87rem' }}>{datastore.name} Search</h2>
        {this.renderErrors()}

        <h3 className='offscreen'>Fielded search options</h3>

        {fieldedSearches.map((fs, i) => {
          return (
            <FieldInput
              key={i}
              fieldedSearchIndex={i}
              fieldedSearch={fs}
              fields={fields}
              changeFieldedSearch={this.changeFieldedSearch}
              handleRemoveFieldedSearch={() => {
                return this.handleRemoveFieldedSearch({ removeIndex: i });
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
            onClick={this.handleAddAnotherFieldedSearch}
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
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      addFieldedSearch,
      removeFieldedSearch,
      setFieldedSearch
    },
    dispatch
  );
}

function mapStateToProps (state, props) {
  const { datastore } = props;

  return {
    booleanTypes: state.advanced.booleanTypes,
    fieldedSearches: state.advanced[datastore.uid].fieldedSearches,
    fields: state.advanced[datastore.uid].fields,
    institution: state.institution,
    activeFilters: _.omit(
      state.advanced[datastore.uid].activeFilters,
      _.isEmpty
    )
  };
}

AdvancedSearchForm.propTypes = {
  setFieldedSearch: PropTypes.func,
  addFieldedSearch: PropTypes.func,
  removeFieldedSearch: PropTypes.func,
  fieldedSearches: PropTypes.array,
  booleanTypes: PropTypes.array,
  institution: PropTypes.object,
  datastore: PropTypes.object,
  activeFilters: PropTypes.object,
  history: PropTypes.object,
  fields: PropTypes.array
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchForm)
);

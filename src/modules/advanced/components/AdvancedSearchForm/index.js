/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button, Alert } from '../../../reusable';
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
import { SPACING } from '../../../reusable/umich-lib-core-temp';
import { getActiveFilters } from '../../../filters/utilities';
import ActiveFilterItem from '../../../filters/components/ActiveFilterItem';
import ClearActiveFiltersLink from '../../../filters/components/ClearActiveFiltersLink';

class AdvancedSearchForm extends React.Component {
  state = {
    errors: []
  };

  handleFieldedSearchChange = ({
    fieldedSearchIndex,
    selectedFieldUid,
    query,
    booleanType
  }) => {
    this.props.setFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      fieldedSearchIndex,
      selectedFieldUid,
      query,
      booleanType
    });
  };

  handleAddAnotherFieldedSearch = () => {
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
              handleFieldedSearchChange={this.handleFieldedSearchChange}
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
          <Button
            kind='secondary'
            small
            onClick={this.handleAddAnotherFieldedSearch}
          >
            Add another field
          </Button>
        </div>

        <Button style={{ marginTop: '1rem' }} type='submit'>
          <Icon icon='search' size={24} /> Advanced Search
        </Button>

        <ActiveFilters />

        <FiltersContainer datastore={datastore} />
      </form>
    );
  }
}

function ActiveFilters () {
  const items = getActiveFilters();

  if (!items) {
    return null;
  }

  return (
    <section
      aria-label='active-filters'
    >
      <h2
        id='active-filters'
        css={{
          fontSize: '1rem',
          marginTop: '0',
          marginBottom: SPACING.XS
        }}
      >
        Active filters ({items.length}) {items.length > 1 && <ClearActiveFiltersLink />}
      </h2>

      <ul
        css={{
          margin: 0,
          listStyle: 'none'
        }}
      >
        {items.map((item, i) => {
          return (
            <li
              key={i + item.group + item.value}
              css={{
                marginBottom: SPACING.XS,
                ':last-of-type': {
                  marginBottom: 0
                }
              }}
            >
              <ActiveFilterItem {...item} />
            </li>
          );
        })}
      </ul>
    </section>
  );
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchForm)
);

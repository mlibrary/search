import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Icon, Alert, Heading } from "@umich-lib/core";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import FieldInput from "../FieldInput";
import FiltersContainer from "../FiltersContainer";
import { stringifySearchQueryForURL } from "../../../pride";
import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch,
} from "../../../advanced";
import { _ } from "underscore";

class AdvancedSearchForm extends React.Component {
  state = {
    errors: [],
  };

  handleFieldedSearchChange = ({
    fieldedSearchIndex,
    selectedFieldUid,
    query,
    booleanType,
  }) => {
    this.props.setFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      fieldedSearchIndex,
      selectedFieldUid,
      query,
      booleanType,
    });
  };

  handleAddAnotherFieldedSearch = () => {
    this.props.addFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      field: this.props.fields[0].uid,
    });
  };

  handleRemoveFieldedSearch({ removeIndex }) {
    this.props.removeFieldedSearch({
      datastoreUid: this.props.datastore.uid,
      removeIndex,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      fieldedSearches,
      booleanTypes,
      institution,
      datastore,
      activeFilters,
    } = this.props;

    ReactGA.event({
      action: "Click",
      category: "Search Button",
      label: `Advanced Search ${datastore.name}`,
    });

    // Build the query
    // example: 'title:parrots AND author:charles'
    const query = fieldedSearches
      .reduce((memo, fieldedSearch) => {
        if (fieldedSearch.query.length) {
          if (memo.length > 0) {
            memo.push(booleanTypes[fieldedSearch.booleanType]);
          }

          // Listed hard-coded fields should have a parentheses
          // TODO: remove after query parser update
          if (
            fieldedSearch.field === "all_fields" ||
            fieldedSearch.field === "author" ||
            fieldedSearch.field === "title" ||
            fieldedSearch.field === "subject" ||
            (fieldedSearch.field === "series" && datastore.uid === "mirlyn")
          ) {
            memo.push(`${fieldedSearch.field}:(${fieldedSearch.query})`);
          } else {
            memo.push(`${fieldedSearch.field}:${fieldedSearch.query}`);
          }
        }

        return memo;
      }, [])
      .join(" ");

    let hasActiveFilters = false;

    if (activeFilters && Object.keys(activeFilters).length > 0) {
      hasActiveFilters = true;
    }

    let filter = activeFilters;

    // TODO: Build the filters
    // Submit search if query or filters are active
    if (query.length > 0 || hasActiveFilters) {
      const { history } = this.props;
      let library = undefined;

      if (datastore.uid === "mirlyn") {
        library = institution.active
          ? institution.active
          : institution.defaultInstitution;
        if (filter["institution"]) {
          library = filter["institution"][0]; // inst overrides library
          filter = { ...filter, institution: undefined }; // remove inst from filter obj
        }
      }
      const queryString = stringifySearchQueryForURL({
        query,
        filter,
        library,
      });

      const url = `/${datastore.slug}?${queryString}`;
      history.push(url);
    } else {
      this.setState({
        errors: [
          "A search term or option is required to submit an advanced search.",
        ],
      });
      window.scrollTo(0, 0);
    }
  };

  renderErrors = () => {
    const { errors } = this.state;

    if (errors) {
      return (
        <React.Fragment>
          {errors.map((error, i) => (
            <Alert intent="error" key={i}>
              <div
                className="x-spacing"
                style={{
                  fontSize: "1rem",
                }}
              >
                <Icon icon="error" size={20} />
                <span>{error}</span>
              </div>
            </Alert>
          ))}
        </React.Fragment>
      );
    }

    return null;
  };

  render() {
    const { datastore, fields, fieldedSearches } = this.props;

    return (
      <form className="y-spacing" onSubmit={this.handleSubmit}>
        {this.renderErrors()}

        <Heading className="offscreen">Fielded search options</Heading>

        {fieldedSearches.map((fs, i) => (
          <FieldInput
            key={i}
            fieldedSearchIndex={i}
            fieldedSearch={fs}
            fields={fields}
            handleFieldedSearchChange={this.handleFieldedSearchChange}
            handleRemoveFieldedSearch={() =>
              this.handleRemoveFieldedSearch({ removeIndex: i })
            }
          />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            kind="secondary"
            small
            onClick={this.handleAddAnotherFieldedSearch}
          >
            Add another field
          </Button>
        </div>

        <Button style={{ marginTop: "1rem" }} type="submit">
          <Icon icon="search" size={24} /> Advanced Search
        </Button>

        <FiltersContainer datastore={datastore} />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addFieldedSearch,
      removeFieldedSearch,
      setFieldedSearch,
    },
    dispatch
  );
}

function mapStateToProps(state, props) {
  const { datastore } = props;

  return {
    booleanTypes: state.advanced.booleanTypes,
    fieldedSearches: state.advanced[datastore.uid].fieldedSearches,
    fields: state.advanced[datastore.uid].fields,
    institution: state.institution,
    activeFilters: _.omit(
      state.advanced[datastore.uid].activeFilters,
      _.isEmpty
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchForm)
);

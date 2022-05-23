/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { withRouter, Link } from "react-router-dom";
import { Breadcrumb } from "../../../reusable";
import {
  COLORS,
  MEDIA_QUERIES,
  SPACING,
} from "../../../reusable/umich-lib-core-temp";

import { TrimString } from "../../../core";
import { getField, getFieldValue } from "../../utilities";
import {
  ViewMARC,
  RecordFullFormats,
  FullRecordPlaceholder,
  RecommendedResource,
  RecordDescription,
  Zotero,
  RecordMetadata,
} from "../../../records";
import { requestRecord } from "../../../pride";
import { setDocumentTitle } from "../../../a11y";
import {
  ActionsList,
  prejudice,
  AddToListButton,
  isInList,
  GoToList,
} from "../../../lists";
import { NoMatch } from "../../../pages";
import ResourceAccess from "../../../resource-acccess";

let prejudiceInstance = prejudice.createVariableStorageDriverInstance();

class FullRecordBreadcrumbs extends React.Component {
  render() {
    const { datastore } = this.props;
    return (
      <Breadcrumb
        items={[
          {
            text: `${datastore.name}`,
            to: `/${datastore.slug}${document.location.search}`,
          },
          { text: "Record" },
        ]}
        renderAnchor={(item) => <Link to={item.to}>{item.text}</Link>}
      />
    );
  }
}

class FullRecord extends React.Component {
  state = {
    activeAction: "",
  };

  setActiveAction = (activeAction) => {
    this.setState({ activeAction });
  };

  componentDidMount() {
    const { recordUid } = this.props.match.params;
    const { datastoreUid } = this.props;

    requestRecord({ recordUid, datastoreUid });
    prejudiceInstance = prejudice.createVariableStorageDriverInstance();
    prejudiceInstance.clearRecords();
    prejudiceInstance.addRecord({ recordUid, datastoreUid });
  }

  componentDidUpdate() {
    const { record, datastoreUid, datastores, history, datastore } = this.props;
    const { recordUid } = this.props.match.params;

    // If the record isn't in state
    if (record && record.uid !== recordUid) {
        if (datastoreUid === 'mirlyn' && recordUid.length === 9) {
            // treat as an aleph id
            history.push(`/catalog/record/${record.uid}`)
        } else if (datastoreUid === 'onlinejournals' && recordUid.length === 9) {
            // treat as an aleph id
            history.push(`/onlinejournals/record/${record.uid}`)
        } else if (_.contains(record.alt_ids, recordUid)) {
            history.push(`/${datastore.slug}/record/${record.uid}`)
        } else {
            requestRecord({recordUid, datastoreUid});
        }
    }

    if (record) {
      const activeDatastore = _.findWhere(datastores.datastores, {
        uid: datastores.active,
      });
      // Set page title

      setDocumentTitle([
        [].concat(record.names).join().slice(0, 120),
        "Record",
        activeDatastore.name,
      ]);
    }
  }

  renderActions = () => {
    const { datastore, record } = this.props;

    return (
      <div className="full-record__actions-container">
        <h2 className="lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none">
          Actions{" "}
          <span className="text-small lists-actions__heading-tag">
            Select what to do with this record.
          </span>
        </h2>
        <ActionsList
          setActive={this.setActiveAction}
          active={this.state.activeAction}
          prejudice={prejudiceInstance}
          datastore={datastore}
          record={record}
        />
      </div>
    );
  };

  render() {
    const { record, datastoreUid, list, datastore } = this.props;
    const { recordUid } = this.props.match.params;

    if (!record) {
      return (
        <div className="container container-narrow y-spacing">
          <FullRecordBreadcrumbs datastore={datastore} />
          <FullRecordPlaceholder />
        </div>
      );
    }

    if (record.status === 404) {
      return <NoMatch />;
    }

    // Check if the record in state matches the record ID in the URL
    // If they don't match, then the new record is still being fetched.
    const recordUidValue = getFieldValue(getField(record.fields, "id"))[0];
    if (recordUidValue !== recordUid) {
      return (
        <div className="container container-narrow">
          <GoToList list={list} datastore={datastore} />
          <FullRecordPlaceholder />
        </div>
      );
    }
    // For adding a blue border when added to list.
    const inList = isInList(list, record.uid);
    const recordClassName = inList
      ? "full-record-container record--highlight"
      : "full-record-container";

    return (
      <div className="container container-narrow full-record-page-container y-spacing">
        <FullRecordBreadcrumbs datastore={datastore} />
        <GoToList list={list} datastore={datastore} />
        <div className={recordClassName}>
          <RecordFullFormats formats={record.formats} />
          <div className="record-container">
            <div className="full-record-title-and-actions-container">
              <h1 className="full-record-title">
                {[].concat(record.names).map((title, index) => {
                  if(index > 0) {
                    return (
                      <span className="vernacular vernacular-record-title" key={index}>
                        <TrimString string={title} expandable={true} />
                      </span>
                    )
                  }
                  return (
                    <TrimString string={title} expandable={true} key={index} />
                  )
                })}
                <RecommendedResource record={record} />
              </h1>
              <AddToListButton item={record} />
            </div>
            <RecordDescription record={record} />
            <Zotero record={record} />
            <h2 className="full-record__record-info">Record info:</h2>
            <RecordMetadata record={record} />
            <HarmfulLanguage datastore={datastore.slug} />
          </div>

          <section aria-labelledby="available-at">
            <div
              className="record-container"
              css={{ paddingBottom: "0.25rem" }}
            >
              <h2 className="full-record__record-info" id="available-at">
                Available at:
              </h2>
            </div>

            <div
              css={{
                borderBottom: `solid 1px ${COLORS.neutral[100]}`,
                '[data-accordion-component="AccordionItemPanel"]': {
                  padding: `0 ${SPACING["M"]}`,
                },
                [MEDIA_QUERIES.LARGESCREEN]: {
                  '[data-accordion-component="AccordionItemButton"]': {
                    paddingLeft: "3rem",
                  },
                  '[data-accordion-component="AccordionItemPanel"]': {
                    paddingLeft: "3rem",
                  },
                },
              }}
            >
              <ResourceAccess record={record} />
            </div>
          </section>
        </div>
        {this.renderActions()}
        {datastoreUid === "mirlyn" && <ViewMARC record={record} />}
      </div>
    );
  }
}

function HarmfulLanguage ({datastore}) {
  // Check if in correct datastore
  if (!['catalog', 'onlinejournals'].includes(datastore)) return (null);
  return (
    <p>The University of Michigan Library aims to describe library materials in a
      way that respects the people and communities who create, use, and are
      represented in our collections. Report harmful or offensive language in catalog
      records, finding aids, or elsewhere in our collections anonymously through
      our <a href="https://docs.google.com/forms/d/e/1FAIpQLSfSJ7y-zqmbNQ6ssAhSmwB7vF-NyZR9nVwBICFI8dY5aP1-TA/viewform">metadata feedback form</a>.
      More information at <a href="https://www.lib.umich.edu/about-us/policies/remediation-harmful-language-library-metadata">Remediation of Harmful Language.</a></p>
  );
}

function mapStateToProps(state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active,
    }),
    record: state.records.record,
    datastoreUid: state.datastores.active,
    datastores: state.datastores,
    institution: state.institution,
    list: state.lists[state.datastores.active],
  };
}

export default withRouter(connect(mapStateToProps)(FullRecord));

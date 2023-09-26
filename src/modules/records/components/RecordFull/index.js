/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumb } from '../../../reusable';
import { COLORS, SEARCH_COLORS } from '../../../reusable/umich-lib-core-temp';
import { TrimString } from '../../../core';
import { getField, getFieldValue } from '../../utilities';
import {
  ViewMARC,
  RecordFullFormats,
  FullRecordPlaceholder,
  RecommendedResource,
  RecordDescription,
  Zotero,
  RecordMetadata
} from '../../../records';
import { requestRecord } from '../../../pride';
import { setDocumentTitle } from '../../../a11y';
import {
  ActionsList,
  prejudice,
  AddToListButton,
  isInList,
  GoToList
} from '../../../lists';
import { NoMatch } from '../../../pages';
import ResourceAccess from '../../../resource-acccess';

let prejudiceInstance = prejudice.createVariableStorageDriverInstance();

class FullRecordBreadcrumbs extends React.Component {
  render () {
    const { datastore } = this.props;
    return (
      <Breadcrumb
        items={[
          {
            text: `${datastore.name}`,
            to: `/${datastore.slug}${document.location.search}`
          },
          { text: 'Record' }
        ]}
      />
    );
  }
}

FullRecordBreadcrumbs.propTypes = {
  datastore: PropTypes.object
};

class FullRecord extends React.Component {
  state = {
    activeAction: ''
  };

  setActiveAction = (activeAction) => {
    this.setState({ activeAction });
  };

  componentDidMount () {
    const { recordUid } = this.props.match.params;
    const { datastoreUid } = this.props;

    requestRecord({ recordUid, datastoreUid });
    prejudiceInstance = prejudice.createVariableStorageDriverInstance();
    prejudiceInstance.clearRecords();
    prejudiceInstance.addRecord({ recordUid, datastoreUid });
  }

  componentDidUpdate () {
    const { record, datastoreUid, datastores, history, datastore } = this.props;
    const { recordUid } = this.props.match.params;

    // If the record isn't in state
    if (record && record.uid !== recordUid) {
      if (datastoreUid === 'mirlyn' && recordUid.length === 9) {
        // treat as an aleph id
        history.push(`/catalog/record/${record.uid}`);
      } else if (datastoreUid === 'onlinejournals' && recordUid.length === 9) {
        // treat as an aleph id
        history.push(`/onlinejournals/record/${record.uid}`);
      } else if (_.contains(record.alt_ids, recordUid)) {
        history.push(`/${datastore.slug}/record/${record.uid}`);
      } else {
        requestRecord({ recordUid, datastoreUid });
      }
    }

    if (record) {
      const activeDatastore = _.findWhere(datastores.datastores, {
        uid: datastores.active
      });
      // Set page title

      setDocumentTitle([
        [].concat(record.names).join().slice(0, 120),
        'Record',
        activeDatastore.name
      ]);
    }
  }

  renderActions = () => {
    const { datastore, record } = this.props;

    return (
      <div className='full-record__actions-container'>
        <h2 className='lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none'>
          Actions{' '}
          <span className='text-small lists-actions__heading-tag'>
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

  render () {
    const { record, datastoreUid, list, datastore } = this.props;
    const { recordUid } = this.props.match.params;

    if (!record) {
      return (
        <div className='container container-narrow y-spacing'>
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
    const recordUidValue = getFieldValue(getField(record.fields, 'id'))[0];
    if (recordUidValue !== recordUid) {
      return (
        <div className='container container-narrow'>
          <GoToList list={list} datastore={datastore} />
          <FullRecordPlaceholder />
        </div>
      );
    }

    return (
      <div className='container container-narrow full-record-page-container y-spacing'>
        <FullRecordBreadcrumbs datastore={datastore} />
        <GoToList list={list} datastore={datastore} />
        <div className={`full-record-container ${isInList(list, record.uid) ? 'record--highlight' : ''}`}>
          <RecordFullFormats formats={record.formats} />
          <div className='record-container'>
            <div className='full-record-title-and-actions-container'>
              <h1 className='full-record-title' id='maincontent' tabIndex='-1'>
                {[].concat(record.names).map((title, index) => {
                  if (index > 0) {
                    return (
                      <span className='vernacular vernacular-record-title' key={index}>
                        <TrimString string={title} expandable />
                      </span>
                    );
                  }
                  return (
                    <TrimString string={title} expandable key={index} />
                  );
                })}
                <RecommendedResource record={record} />
              </h1>
              <AddToListButton item={record} />
            </div>
            <RecordDescription record={record} />
            <Zotero record={record} />
            <h2 className='full-record__record-info'>Record info:</h2>
            <RecordMetadata record={record} />
            <HarmfulLanguage datastore={datastore.slug} />
          </div>

          <section aria-labelledby='available-at'>
            <div
              className='record-container'
              css={{ paddingBottom: '0.25rem' }}
            >
              <h2 className='full-record__record-info' id='available-at'>
                Available at:
              </h2>
            </div>

            <div
              css={{
                borderBottom: `solid 1px ${COLORS.neutral[100]}`
              }}
            >
              <ResourceAccess record={record} />
            </div>
          </section>
        </div>
        {this.renderActions()}
        <LastIndexed datastore={datastore.slug} record={record} />
        {datastoreUid === 'mirlyn' && <ViewMARC record={record} />}
      </div>
    );
  }
}

FullRecord.propTypes = {
  record: PropTypes.object,
  recordUid: PropTypes.string,
  datastores: PropTypes.object,
  datastore: PropTypes.object,
  datastoreUid: PropTypes.string,
  history: PropTypes.object,
  list: PropTypes.array,
  match: PropTypes.object
};

function HarmfulLanguage ({ datastore }) {
  // Check if in correct datastore
  if (!['catalog', 'onlinejournals'].includes(datastore)) return (null);
  return (
    <p>The University of Michigan Library aims to describe library materials in a
      way that respects the people and communities who create, use, and are
      represented in our collections. Report harmful or offensive language in catalog
      records, finding aids, or elsewhere in our collections anonymously through
      our <a href='https://docs.google.com/forms/d/e/1FAIpQLSfSJ7y-zqmbNQ6ssAhSmwB7vF-NyZR9nVwBICFI8dY5aP1-TA/viewform'>metadata feedback form</a>.
      More information at <a href='https://www.lib.umich.edu/about-us/policies/remediation-harmful-language-library-metadata'>Remediation of Harmful Language.</a>
    </p>
  );
}

HarmfulLanguage.propTypes = {
  datastore: PropTypes.string
};

function LastIndexed ({ datastore, record }) {
  if (!['catalog', 'onlinejournals'].includes(datastore)) return (null);
  const indexingDate = record
    .fields
    .filter((field) => {
      return field.uid === 'indexing_date';
    })[0];
  if (!indexingDate) return null;
  return (
    <p style={{ color: SEARCH_COLORS.grey[500], marginTop: 0, order: 3 }}>
      <span style={{ fontWeight: 600 }}>{indexingDate.name}:</span> {indexingDate.value}
    </p>
  );
}

LastIndexed.propTypes = {
  datastore: PropTypes.string,
  record: PropTypes.object
};

function mapStateToProps (state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active
    }),
    record: state.records.record,
    datastoreUid: state.datastores.active,
    datastores: state.datastores,
    institution: state.institution,
    list: state.lists[state.datastores.active]
  };
}

export default withRouter(connect(mapStateToProps)(FullRecord));

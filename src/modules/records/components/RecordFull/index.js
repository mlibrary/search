import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  withRouter,
  Link
} from 'react-router-dom'
import { Breadcrumb } from '../../../reusable'

import {
  ShowAllChildren,
  TrimString,
} from '../../../core'
import ShowAdditionalFieldList from '../ShowAdditionalFieldList';
import {
  filterAccessFields,
  getField,
  getFieldValue,
  getFullRecordDisplayFields,
} from '../../utilities';
import {
  AccessItem,
} from '../AccessList'
import {
  ViewMARC,
  Holdings,
  RecordFullFormats,
  FullRecordPlaceholder,
  RecommendedResource,
  RecordDescription
} from '../../../records'
import {
  requestRecord
} from '../../../pride';
import {
  setDocumentTitle
} from '../../../a11y'
import {
  ActionsList,
  prejudice,
  AddToListButton,
  isInList,
  GoToList
} from '../../../lists'
import {
  NoMatch
} from '../../../pages'

let prejudiceInstance = prejudice.createVariableStorageDriverInstance()


class FullRecordBreadcrumbs extends React.Component {
  render() {
    const { datastore } = this.props
    return (
      <div className="u-margin-top-1">
        <Breadcrumb
          items={[
            { text: `${datastore.name}`, to: `/${datastore.slug}${document.location.search}` },
            { text: 'Record' }
          ]}
          renderAnchor={(item) => (<Link to={item.to}>{item.text}</Link>)}
        />
      </div>
    )
  }
}

class FullRecord extends React.Component {
  state = {
    activeAction: ''
  }

  setActiveAction = (activeAction) => {
    this.setState({ activeAction })
  }

  componentWillMount() {
    const { recordUid } = this.props.match.params
    const { datastoreUid } = this.props

    requestRecord({ recordUid, datastoreUid })
    prejudiceInstance = prejudice.createVariableStorageDriverInstance()
    prejudiceInstance.clearRecords()
    prejudiceInstance.addRecord({ recordUid, datastoreUid })
  }

  componentDidUpdate() {
    const {
      record,
      datastoreUid,
      datastores
    } = this.props;
    const { recordUid } = this.props.match.params

    // If the record isn't in state
    if (record && record.uid !== recordUid) {
      requestRecord({ recordUid, datastoreUid })
    }

    if (record) {
      const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })
      // Set page title

      setDocumentTitle([[].concat(record.names).join().slice(0, 120), 'Record', activeDatastore.name])
    }
  }

  renderActions = () => {
    const { recordUid } = this.props.match.params
    const { datastoreUid, datastore } = this.props

    return (
      <div className="full-record__actions-container">
        <h2 className="lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none">Actions <span className="text-small lists-actions__heading-tag">Select what to do with this record.</span></h2>
        <ActionsList
          setActive={this.setActiveAction}
          active={this.state.activeAction}
          record={{ recordUid, datastoreUid }}
          prejudice={prejudiceInstance}
          datastore={datastore}
        />
      </div>
    )
  }

  render() {
    const { record, institution, datastoreUid, list, datastore } = this.props;
    const { recordUid } = this.props.match.params

    if (!record) {
      return (
        <div className="container container-narrow">
          <FullRecordBreadcrumbs datastore={datastore} />
          <FullRecordPlaceholder />
        </div>
      )
    }

    if (record.status === 404) {
      return <NoMatch />
    }

    // Check if the record in state matches the record ID in the URL
    // If they don't match, then the new record is still being fetched.
    const recordUidValue = getFieldValue(getField(record.fields, 'id'))[0]
    if (recordUidValue !== recordUid) {
      return (
        <div className="container container-narrow">
          <FullRecordPlaceholder />
        </div>
      )
    }
    const access = filterAccessFields({
      fields: record.fields,
      type: 'access',
      datastore: datastoreUid,
    });
    const holdings = record.holdings
    const displayFields = getFullRecordDisplayFields({
      fields: record.fields,
      datastore: datastoreUid
    });

    // For adding a blue border when added to list.
    const inList = isInList(list, record.uid)
    const recordClassName = inList ? 'full-record-container record--highlight' : 'full-record-container'

    const ShowAllName = datastoreUid === "journals" ? "online journals" : null


    return (
      <div className="container container-narrow full-record-page-container y-spacing">
        <FullRecordBreadcrumbs datastore={datastore} />
        <GoToList list={list} datastore={datastore} />
        <div className={recordClassName}>
          <RecordFullFormats
            fields={record.fields}
            datastoreUid={datastoreUid}
          />
          <div className="record-container">
            <div className="full-record-title-and-actions-container">
              <h1 className="full-record-title">
                {[].concat(record.names).map((title, index) => (
                  <span key={index}>
                    <TrimString string={title} expandable={true} />
                  </span>
                ))}
                <RecommendedResource record={record} />
              </h1>

              <AddToListButton item={record} />
            </div>

            <RecordDescription record={record} />

            {access.length > 0 && (
              <div className="full-record__access-container">
                <h2 className="full-record__access-heading">Access</h2>
                <ShowAllChildren
                  length={access.length}
                  show={1}
                  listClass={'access-list'}
                  name={ShowAllName}
                >
                  {access.map((item, key) => (
                    <AccessItem key={key} type='full' item={item} />
                  ))}
                </ShowAllChildren>
              </div>
            )}

            <h2 className="full-record__record-info">Record Info</h2>
            <ShowAdditionalFieldList
              fields={displayFields}
              datastoreUid={datastoreUid}
              institution={institution}
            />
          </div>
          {holdings && (<Holdings holdings={holdings} />)}
        </div>
        {this.renderActions()}
        {datastoreUid === 'mirlyn' && <ViewMARC record={record} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    record: state.records.record,
    datastoreUid: state.datastores.active,
    datastores: state.datastores,
    institution: state.institution,
    list: state.lists[state.datastores.active],
  }
}

export default withRouter(connect(mapStateToProps)(FullRecord))

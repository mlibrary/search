import React from 'react'
import { connect } from 'react-redux'

import FieldList from '../RecordFieldList';
import {
  filterAccessFields,
  filterDisplayFields,
  getHoldings,
  getField,
  getFieldValue,
} from '../../utilities';
import HoldingStatus from '../HoldingStatus'
import {
  AccessList,
  AccessItem
} from '../AccessList'
import {
  getDatastoreUidBySlug,
  requestPrideRecord
} from '../../../../pride-interface';

class FullRecord extends React.Component {
  componentWillMount() {
    const recordUid = this.props.params.record
    const datastoreUid = getDatastoreUidBySlug(this.props.params.datastore)

    requestPrideRecord(datastoreUid, recordUid);
  }

  render() {
    const { record, activeDatastoreUid } = this.props;

    if (!record) {
      return <SkeletonFullRecord />
    }

    const access = filterAccessFields({
      fields: record.fields,
      type: 'access',
      datastore: activeDatastoreUid,
    });

    const holdings = getHoldings({
      holdings: record.holdings,
      datastoreUid: activeDatastoreUid
    })

    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: 'full',
      datastore: activeDatastoreUid
    });

    const format = () => (
      <div className="full-record-header">
        <p>{getFieldValue(getField(record.fields, 'format'))}</p>
      </div>
    )

    return (
      <div className="container container-narrow">
        <div className="full-record-container">

          <div className="record-container">
            <h1 className="full-record-title">{record.names[0]}</h1>

            {access && (
              <AccessList>
                {access.map((item, key) => (
                  <AccessItem key={key} type='full' {...item} />
                ))}
              </AccessList>
            )}

            <FieldList fields={displayFields} />

            {holdings && (<Holdings holdings={holdings} />)}
          </div>
        </div>
      </div>
    )
  }
}

const SkeletonFullRecord = () => (
  <div className="container container-narrow">
    <div className="full-record-container">
      <div className="record-container placeholder-container">
        <div className="placeholder placeholder-title"></div>
        <div className="placeholder placeholder-line"></div>
        <div className="placeholder placeholder-line placeholder-line-alt"></div>
        <div className="placeholder placeholder-line"></div>
        <div className="placeholder placeholder-line placeholder-line-alt"></div>
        <div className="placeholder placeholder-line"></div>
        <div className="placeholder placeholder-line"></div>
      </div>
    </div>
  </div>
)

const Holdings = ({ holdings }) => {
  return (
    <div className="full-holdings-container">
      {holdings.map((holdingsGroup, index) => (
      <div key={index} className="full-holdings-group-container">
        <h3 className="full-holding-group-heading">{holdingsGroup.name}</h3>
        <HoldingsGroup group={holdingsGroup} />
      </div>
      ))}
    </div>
  )
}

const HoldingsGroup = ({ group }) => {
  return (
    <div>
      {group.holdings.map((holding, index) => (
        <dl key={index} className='full-holding-item'>
          {holding.status && (
            <div className="full-holding-item-detail">
              <dt>
                Status
              </dt>
              <dd>
                <HoldingStatus status={holding.status} />
              </dd>
            </div>
          )}
          {holding.location && (
            <div className="full-holding-item-detail">
              <dt>
                Location
              </dt>
              <dd>
                {holding.location} {holding.map && (
                  <a className="underline" href={holding.map}>Map</a>
                )}
                {holding.info_link}
                <div>{holding.callnumber}</div>
              </dd>
            </div>
          )}
          {holding.source && (
            <div className="full-holding-item-detail">
              <dt>
                Source
              </dt>
              <dd>
                {holding.source}
              </dd>
            </div>
          )}
          {holding.coverage && holding.coverage.length > 0 && (
            <div className="full-holding-item-detail">
              <dt>
                Coverage
              </dt>
              <dd>
                {holding.coverage.map(value => (
                  <span>{value}</span>
                ))}
              </dd>
            </div>
          )}
          {holding.link && (
            <div className="full-holding-item-detail">
              <dt>
                Actions
              </dt>
              <dd>
                <a href={holding.link} className="underline">{holding.linkText}</a>
              </dd>
            </div>
          )}
        </dl>
      ))}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    activeDatastoreUid: state.datastores.active,
  }
}

export default connect(mapStateToProps)(FullRecord)

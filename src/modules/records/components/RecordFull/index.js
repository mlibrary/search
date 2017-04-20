import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'

import {
  ShowAllList,
  Icon
} from '../../../core'
import FieldList from '../RecordFieldList';
import {
  filterAccessFields,
  filterDisplayFields,
  getHoldings,
  getField,
  getFieldValue,
  getShowAllText
} from '../../utilities';
import HoldingStatus from '../HoldingStatus'
import {
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
    const { record, datastoreUid } = this.props;

    if (!record) {
      return <SkeletonFullRecord />
    }

    const access = filterAccessFields({
      fields: record.fields,
      type: 'access',
      datastore: datastoreUid,
    });

    const holdings = getHoldings({
      holdings: record.holdings,
      datastoreUid: datastoreUid
    })

    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: 'full',
      datastore: datastoreUid
    });

    return (
      <div className="container container-narrow">
        <div className="full-record-container">
          <Format fields={record.fields} />
          <div className="record-container">
            <h1 className="full-record-title">
              {[].concat(record.names).map((title, index) => (
                <div key={index}>{title}</div>
              ))}
            </h1>
            <FieldList fields={displayFields} />

            {access.length > 0 && (
              <ShowAllList
                length={access.length}
                show={1}
                listClass={'full-holding-list'}>
                {access.map((item, key) => (
                  <AccessItem key={key} type='full' item={item} />
                ))}
              </ShowAllList>
            )}
            {holdings && (<Holdings holdings={holdings} datastoreUid={datastoreUid} />)}
          </div>
        </div>
      </div>
    )
  }
}

const SkeletonFullRecord = () => (
  <div className="container container-narrow">
    <div className="full-record-container">
      <div className="full-record-header">
      </div>
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

const Format = ({ fields }) => {
  const formatFieldValue = getFieldValue(getField(fields, 'format'))

  return (
    <div className="full-record-header">
      {formatFieldValue.map((value, index) => (
        <span className="full-record-format" key={index}><Icon name={value.toLowerCase()} />{value}</span>
      ))}
    </div>
  )
}

const Holdings = ({ holdings, datastoreUid }) => {
  return (
    <div className="full-holdings-container">
      {holdings.map((holdingsGroup, index) => (
      <div key={index} className="full-holdings-group-container">
        <h3 className="full-holding-group-heading">{holdingsGroup.name}</h3>
        <HoldingsGroup group={holdingsGroup} datastoreUid={datastoreUid} />
      </div>
      ))}
    </div>
  )
}

const HoldingsGroup = ({ group, datastoreUid }) => {
  const length = group.holdings.length
  const showAllText = getShowAllText({
    holdingUid: group.uid,
    datastoreUid
  }) || ''

  switch (group.uid) {
    case 'hathitrust':
    case 'online':
      return (
        <ShowAllList
          length={length}
          show={1}
          name={showAllText ? showAllText : ''}
          listClass={'full-holding-list'}>
            {group.holdings.map((holding, index) => (
              <li key={index} className='full-holding-list-item'>
                <OnlineHolding holding={holding} />
              </li>
            ))}
        </ShowAllList>
      )
    default:
      return (
        <ShowAllList
          length={length}
          show={1}
          name={showAllText ? showAllText : ''}
          listClass={'full-holding-list'}>
            {group.holdings.map((holding, index) => (
              <li key={index} className='full-holding-list-item'>
                <PhysicalHolding holding={holding} />
              </li>
            ))}
        </ShowAllList>
      )
  }
}

const PhysicalHolding = ({ holding }) => (
  <dl className='full-holding-item'>
    {holding.status && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Status
        </dt>
        <dd>
          <HoldingStatus status={holding.status} />
        </dd>
      </div>
    )}
    {holding.coverage && holding.coverage.length > 0 && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Coverage
        </dt>
        <dd>
          {holding.coverage.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </dd>
      </div>
    )}
    {holding.location && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Location
        </dt>
        <dd>
          {holding.map ? (
            <a className="underline" href={holding.map}>{holding.location}</a>
          ) : ( <span>{holding.location}</span> )}
          <div>{holding.callnumber}</div>
        </dd>
      </div>
    )}
    {holding.source && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Source
        </dt>
        <dd>
          {holding.source}
        </dd>
      </div>
    )}
    {holding.link && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Actions
        </dt>
        <dd>
          <a href={holding.link} className="underline">{holding.linkText}</a>
        </dd>
      </div>
    )}
  </dl>
)

const OnlineHolding = ({ holding }) => (
  <dl className="full-holding-item">
    {holding.link && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          {holding.linkStyle === 'link' && (
            'Actions'
          )}
        </dt>
        <dd>
          {holding.linkStyle === 'link' ? (
            <a href={holding.link} className="underline">{holding.linkText}</a>
          ) : (
            <a href={holding.link} className="button">{holding.linkText}</a>
          )}
        </dd>
      </div>
    )}
    {holding.description && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Description
        </dt>
        <dd>
          {holding.description}
        </dd>
      </div>
    )}
    {holding.status && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Status
        </dt>
        <dd>
          <HoldingStatus status={holding.status} />
        </dd>
      </div>
    )}
    {holding.location && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
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
        <dt className="full-holding-item-detail-label font-small">
          Source
        </dt>
        <dd>
          {holding.source}
        </dd>
      </div>
    )}
    {holding.coverage && holding.coverage.length > 0 && (
      <div className="full-holding-item-detail">
        <dt className="full-holding-item-detail-label font-small">
          Coverage
        </dt>
        <dd>
          {holding.coverage.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </dd>
      </div>
    )}
  </dl>
)

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
  }
}

export default connect(mapStateToProps)(FullRecord)

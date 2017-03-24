import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'

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

    const format = (
      <div className="full-record-header">
        <p>Format: {getFieldValue(getField(record.fields, 'format'))}</p>
      </div>
    )

    return (
      <div className="container container-narrow">
        <div className="full-record-container">
          <div className="record-container">
            <h1 className="full-record-title">{record.names[0]}</h1>
            <FieldList fields={displayFields} />

            {access && (
              <AccessList>
                {access.map((item, key) => (
                  <AccessItem key={key} type='full' {...item} />
                ))}
              </AccessList>
            )}
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

class HoldingsGroup extends React.Component {
  state = {
    showAllGroups: []
  }

  handleShowMoreClick(groupUid) {
    if (_.contains(this.state.showAllGroups, groupUid)) {
      const newState = _.without(this.state.showAllGroups, groupUid)
      this.setState({
        showAllGroups: newState
      })
    } else {
      this.setState({
        showAllGroups: this.state.showAllGroups.concat(groupUid)
      })
    }
  }

  render() {
    const { group } = this.props;
    let holdingGroup = null;
    const showAll = _.contains(this.state.showAllGroups, group.uid)
    const displayShowMore = (!showAll && (group.holdings.length > 1))

    switch (group.uid) {
      case 'hathitrust':
      case 'online':
        holdingGroup = (
          <div>
            <ul className={`full-holding-list show-all-able-list ${showAll ? 'show-all' : ''}`}>
              {group.holdings.map((holding, index) => (
                <li key={index} className='full-holding-list-item'>
                  <OnlineHolding holding={holding} />
                </li>
              ))}
            </ul>
            {displayShowMore && (
              <button
                className={`button button-light ${showAll ? 'hide' : ''}`}
                onClick={() => this.handleShowMoreClick(group.uid)}
              >Show { group.holdings.length - 1 } more</button>
            )}
            {showAll && (
              <button className="button button-light" onClick={() => this.handleShowMoreClick(group.uid)}>Show fewer</button>
            )}
          </div>
        )
        break;
      default:
        holdingGroup = (
          <div>
            <ul className={`full-holding-list show-all-able-list ${showAll ? 'show-all' : ''}`}>
              {group.holdings.map((holding, index) => (
                <li key={index} className='full-holding-list-item'>
                  <PhysicalHolding holding={holding} />
                </li>
              ))}
            </ul>
            {displayShowMore && (
              <button
                className={`button button-light ${showAll ? 'hide' : ''}`}
                onClick={() => this.handleShowMoreClick(group.uid)}
              >Show { group.holdings.length - 1 } more</button>
            )}
            {showAll && (
              <button className="button button-light" onClick={() => this.handleShowMoreClick(group.uid)}>Show fewer</button>
            )}
          </div>
        )
        break;
    }

    return holdingGroup
  }
}

const PhysicalHolding = ({ holding }) => (
  <dl className='full-holding-item'>
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
          {holding.map ? (
            <a className="underline" href={holding.map}>{holding.location}</a>
          ) : ( <span>{holding.location}</span> )}
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
          {holding.coverage.map((value, index) => (
            <span key={index}>{value}</span>
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
)

const OnlineHolding = ({ holding }) => (
  <dl className="full-holding-item">
    {holding.link && (
      <div className="full-holding-item-detail">
        <dt>

        </dt>
        <dd>
          <a href={holding.link} className="button">{holding.linkText}</a>
        </dd>
      </div>
    )}
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
          {holding.coverage.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </dd>
      </div>
    )}
    {holding.description && (
      <div className="full-holding-item-detail">
        <dt>
          Description
        </dt>
        <dd>
          {holding.description}
        </dd>
      </div>
    )}
  </dl>
)

function mapStateToProps(state) {
  return {
    record: state.records.record,
    activeDatastoreUid: state.datastores.active,
  }
}

export default connect(mapStateToProps)(FullRecord)

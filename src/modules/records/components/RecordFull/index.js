import React from 'react'
import { connect } from 'react-redux'

import FieldList from '../RecordFieldList';
import {
  filterAccessFields,
  filterDisplayFields,
  getHoldings
} from '../../utilities';

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

            <div className="record-field-list-as-table ">
              <FieldList fields={displayFields} />
            </div>

            {holdings && (
              <div className="holdings-container">
                {holdings.map((holdingsGroup, index) => (
                  <div>
                    <h3>{holdingsGroup.name}</h3>
                    <ul className="access-list" key={holdingsGroup.uid}>
                      {holdingsGroup.holdings.map((holding, index) => (
                        <li className="access-item" key={index}>
                          <a href={holding.link} className="underline access-link">{holding.linkText}</a>
                          <span className="holding-detail holding-detail-location">{holding.location}</span>
                          <span className="holding-detail">{holding.callnumber}</span>
                          <span className="holding-detail">{holding.status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
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

function mapStateToProps(state) {
  return {
    record: state.records.record,
    activeDatastoreUid: state.datastores.active,
  }
}

export default connect(mapStateToProps)(FullRecord)

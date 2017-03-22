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

            <div className="record-field-list-as-table ">
              <FieldList fields={displayFields} />
            </div>

            {holdings && (
              <div className="full-record-access-container">
                {holdings.map((holdingsGroup, index) => (
                <div key={index} className="access-group-container">
                  <h3 className="access-group-heading">{holdingsGroup.name}</h3>
                  <table className="access-table">
                    <thead>
                      <tr>
                        <th className="access-table-col-status">Status</th>
                        <th className="access-table-col-location">Location</th>
                        <th className="access-table-col-actions">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdingsGroup.holdings.map((holding, index) => (
                      <tr key={index} className="access-item">
                        <td><HoldingStatus status={holding.status} /></td>
                        <td>
                          {holding.location}
                          <div>{holding.callnumber}</div>
                        </td>
                        <td><a href={holding.link} className="underline">{holding.linkText}</a></td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
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

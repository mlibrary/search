import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import {
  AccessList,
  AccessItem,
} from '../AccessList';
import HoldingStatus from '../HoldingStatus';
import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
  getHoldings
} from '../../utilities';

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type } = this.props
    const title = record.names ? record.names[0] : 'no title';
    const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
    const recordUidField = getField(record.fields, 'id');
    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: type,
      datastore: datastoreUid
    });
    const access = filterAccessFields({
      fields: record.fields,
      datastore: datastoreUid,
    });
    const holdings = getHoldings({
      holdings: record.holdings,
      datastoreUid: datastoreUid
    })

    if (recordUidField) {
      const recordUid = recordUidField.value

      return (
        <li className="record">
          <div className="record-container">
            <h3 className="record-title">
              <Link
                className="record-title-link"
                to={`/${datastoreSlug}/record/${recordUid}`}
              >
                {title}
              </Link>
            </h3>
            <FieldList fields={displayFields} />
          </div>

          {record.loadingHoldings ? (
            <div className="access-container access-placeholder-container">
              <div className="placeholder placeholder-access placeholder-inline"></div>
              <div className="placeholder placeholder-inline"></div>
            </div>
          ) : (
            <div className="access-container">
              {access && (
                <AccessList>
                  {access.map((item, index) => (
                    <AccessItem key={index} {...item} />
                  ))}
                </AccessList>
              )}
              {holdings.length > 0 && (
                <div className="holdings-container">
                  {holdings.map((holdingsGroup, index) => (
                    <HoldingsList
                      holdingsGroup={holdingsGroup}
                      key={holdingsGroup.uid}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </li>
      )
    }

    return null
  }
}

class HoldingsList extends React.Component {
  state = {
    show: false
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { holdingsGroup } = this.props;

    return (
      <div className="access-type-container">
        <AccessList addClassName={`show-all-able-list ${this.state.show ? 'show-all' : ''}`}>
          {holdingsGroup.holdings.map((holding, index) => (
            <li className="access-item" key={index}>
              <span className="holding-detail
                 holding-detail-label">{holding.label}</span>
              <a href={holding.link} className="underline access-link">{holding.linkText}</a>
              <HoldingStatus status={holding.status} />
              <span className="holding-detail holding-detail-location">{holding.location}</span>
              <span className="holding-detail">{holding.callnumber}</span>
              <span className="holding-detail">{holding.source}</span>
            </li>
          ))}
        </AccessList>

        {holdingsGroup.holdings.length > 1 && (
          <ShowHideButton
            show={this.state.show}
            length={holdingsGroup.holdings.length}
            handleOnClick={this.handleShowToggleClick.bind(this)}
          />
        )}
      </div>
    )
  }
}

const ShowHideButton = ({ handleOnClick, show, length}) => {
  return (
    <button
      onClick={() => handleOnClick()}
      className="button-secondary button-small show-all-button">
      {show ? 'Fewer' : `${length - 1} More`}
    </button>
  )
}

export default Record;

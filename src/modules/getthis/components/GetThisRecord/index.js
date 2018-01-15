import React from 'react'
import { connect } from 'react-redux';
import _ from 'underscore'

import {
  TrimString
} from '../../../core'
import {
  getField,
  getFieldValue,
  getRecordFormats,
  RecordFullFormats,
  FullRecordPlaceholder,
  RecordPlaceholder,
  Holdings
} from '../../../records'

const getGetThisHolding = ({
  barcode,
  holdings
}) => {
  /*
    Looks through the holdings object data,
    and trims it down to only be the holding
    with the passed in barcode, if the barcode
    does not exist on a holding, then null is
    returned.
  */

  if (!holdings) {
    return null
  }

  const holdingGroupKeys = Object.keys(holdings);
  let holdingFound = false

  const getThisHolding = holdingGroupKeys.reduce((memo, key) => {
    if (!holdingFound) {
      const holding = _.findWhere(holdings[key].holdings, { barcode: barcode })

      if (holding) {
        holdingFound = true

        memo = {
          [key]: {
            ...holdings[key],
            holdings: [].concat(holding)
          }
        }
      }
    }

    return memo
  }, {
    status: '404'
  })

  return getThisHolding
}

const GetThisHoldings = ({
  holding,
  barcode
}) => {
  if (!holding) {
    return null
  }

  if (holding && holding.status === '404') {
    return (
      <div className="holdings">
        <span>The holding with barcode <b>"{barcode}"</b> could not be found.</span>
      </div>
    )
  }

  return (
    <div className="get-this-holdings-container">
      <Holdings holdings={holding} />
    </div>
  )
}

class GetThisRecord extends React.Component {
  render() {
    const {
      record,
      datastoreUid,
      searchQuery,
      institution,
      barcode
    } = this.props;

    if (!record) {
      return <FullRecordPlaceholder />
    }

    const holding = getGetThisHolding({
      barcode,
      holdings: record.holdings
    })

    return (
      <div className="full-record-container u-margin-bottom-1">
        <RecordFullFormats
          fields={record.fields}
          datastoreUid={datastoreUid}
        />
        <div className="record-container">
          <h1 className="full-record-title u-margin-bottom-none">
            {[].concat(record.names).map((title, index) => (
              <div key={index}>
                <TrimString string={title} />
              </div>
            ))}
          </h1>
        </div>

        <GetThisHoldings
          holding={holding}
          barcode={barcode}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
    searchQuery: state.router.location.search,
    institution: state.institution,
  };
}

export default connect(mapStateToProps)(GetThisRecord);

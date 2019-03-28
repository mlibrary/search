import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import { ResourceAccess } from '@umich-lib/core'
import getHoldingByBarcode from '../../getHoldingByBarcode'
import {
  StyledGetThisResourceAccessContainer
} from '../GetThisRecord'

function GetThisFindItHolding({ holding }) {
  return (
    <div>
      <p style={{ marginTop: '0' }}>Use this information to find it:</p>

      <StyledGetThisResourceAccessContainer>
        <ResourceAccess
          {...holding[0]}
          renderAnchor={() => null}
        />
      </StyledGetThisResourceAccessContainer>
    </div>
  )
}

class GetThisFindIt extends React.Component {
  render() {
    const {
      record
    } = this.props
    const {
      barcode
    } = this.props.match.params

    if (record.resourceAccess) {
      const holding = getHoldingByBarcode(record.resourceAccess, barcode)

      if (holding) {
        return (
          <GetThisFindItHolding
            holding={holding}
          />
        )
      }
    }

    return null
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record
  };
}

export default withRouter(connect(mapStateToProps)(GetThisFindIt));
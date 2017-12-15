import React from 'react'

import {
  getField,
  getFieldValue
} from '../../utilities';

import {
  MARCTable
} from '../../../marc'

class ViewMARC extends React.Component {
  state = {
    view: false
  }

  render() {
    const { record } = this.props
    const { view } = this.state
    const marc = getFieldValue(getField(record.fields, 'marc_record'))[0]

    if (marc) {
      if (view) {
        return <MARCTable marc={marc} />
      } else {
        return (
          <div className="marc-link-container">
            <button className="button-light" onClick={() => this.setState({ view: true })}>View MARC data</button>
          </div>
        )
      }
    }

    return null
  }
}

export default ViewMARC;

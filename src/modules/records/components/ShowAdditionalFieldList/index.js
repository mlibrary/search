import React from 'react'
import Field from '../RecordField'
import Button from '@umich-lib/button'

class ShowAdditionalFieldList extends React.Component {
  state = {
    show: false
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { fields, datastoreUid, institution } = this.props
    const buttonText = `${this.state.show ? 'Show brief record' : 'Show complete record' }`
    const displayFields = this.state.show ? fields.standard.concat(fields.additional) : fields.standard

    return (
      <div>
        <dl className="record-field-list">
          {displayFields.map((field, index) => (
            <Field
              field={field}
              datastoreUid={datastoreUid}
              key={index}
              institution={institution}
            />
          ))}
        </dl>

        {(!this.state.show && fields.additional.length > 0) && (
          <div className="zigzag-end"></div>
        )}

        {fields.additional.length > 0 && (
          <div className="center-text">
            <Button
              onClick={this.handleShowToggleClick.bind(this)}
              kind="secondary"
              small
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default ShowAdditionalFieldList

import React from 'react'
import Field from '../RecordField';

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
    const buttonText = `${this.state.show ? 'Show Brief Record' : 'Show Complete Record' }`
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
            <button onClick={this.handleShowToggleClick.bind(this)} className="button-light">
              {buttonText}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ShowAdditionalFieldList

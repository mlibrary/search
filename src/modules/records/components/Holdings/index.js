import React from 'react'
import { _ } from 'underscore'

const FieldValue = ({ field }) => {
  // AND is to also ensure a link exists.

  switch (field.type) {
    case 'link':
      return (
        <span><a className="holding-link" href={field.link}>{field.value}</a></span>
      )
    case 'button-link':
      return (
        <span><a className="holding-button button" href={field.link}>{field.value}</a></span>
      )
    default:
      return (
        <span className="holding-text">{field.value}</span>
      )
  }
}

class Holdings extends React.Component {
  state = {
    show: []
  }

  handleShowAllClick(uid) {
    if (_.contains(this.state.show, uid)) {
      this.setState({
        show: _.reject(this.state.show = (showUid) => uid === showUid)
      })
    } else {
      this.setState({
        show: this.state.show.concat(uid)
      })
    }
  }

  render() {
    const holdingsData = this.props.holdings

    return (
      <div className="holdings">
        {Object.keys(holdingsData).map(holdingGroupUid => {
          const heading = holdingsData[holdingGroupUid].heading
          const showAllName = holdingsData[holdingGroupUid].showAllName
          const holdings = holdingsData[holdingGroupUid].holdings
          const headings = _.pluck(holdings[0].fields, 'heading')
          const showAll = _.contains(this.state.show, holdingGroupUid)

          return (
            <div key={holdingGroupUid} className="holding-group">
              <h3 className="holding-group-heading">{heading}</h3>
              <table className="holding-table">
                <thead>
                  <tr>
                    {headings.map((heading, index) => (
                      <td key={index}>
                        <span className="holding-table-field">{heading}</span>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding, index) => {
                    if (!showAll && index > 0) {
                      return null
                    }

                    return (
                      <tr key={index}>
                        {holding.fields.map((field, index) => (
                          <td key={index}>
                            <span className="holding-table-field">
                              <FieldValue field={field} />
                            </span>
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {holdings.length > 1 && (
                <button
                  className="button-light holdings-show-all-button"
                  onClick={() => this.handleShowAllClick(holdingGroupUid)}>
                  {showAll ? ('Show Fewer') : ('Show All')} {showAllName}
                </button>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Holdings;

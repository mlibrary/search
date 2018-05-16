import React from 'react'
import { Link } from 'react-router-dom'
import { _ } from 'underscore'

import HoldingStatus from '../HoldingStatus'

const HoldingFieldNotAvailable = () => {
  return <span className="holding-value-na">N/A</span>
}

const FieldValue = ({ field }) => {
  // AND is to also ensure a link exists.

  if (!field.value || field.value.length === 0) {
    return (
      <HoldingFieldNotAvailable />
    )
  }

  switch (field.type) {
    case 'get-this':
      return (
        <span><Link className="holding-link" to={field.link}>{field.value}</Link></span>
      )
    case 'link':
      if (!field.link) {
        return <HoldingFieldNotAvailable />
      }

      return (
        <span><a className="holding-link" href={field.link}>{field.value}</a></span>
      )
    case 'button-link':
      if (!field.link) {
        return <HoldingFieldNotAvailable />
      }

      return (
        <span><a className="holding-button button" href={field.link}>{field.value}</a></span>
      )
    default:
      if (field.heading === 'Status') {
        return <HoldingStatus status={field.value} />
      }

      return (
        <span className="holding-text">{field.value}</span>
      )
  }
}

const Heading = ({level, children, className}) => {
  const Tag = level ? `h${level}` : `p`
  
  return (
    <Tag className={className}>{children}</Tag>
  )
}

class Holdings extends React.Component {
  state = {
    show: []
  }

  handleShowAllClick(uid) {
    if (_.contains(this.state.show, uid)) {
      this.setState({
        show: _.reject(this.state.show, (showUid) => uid === showUid)
      })
    } else {
      this.setState({
        show: this.state.show.concat(uid)
      })
    }
  }

  render() {
    const holdingsData = this.props.holdings
    const headingLevel = this.props.headingLevel ? this.props.headingLevel : 2

    return (
      <article className="holdings">
        <Heading className="offpage" level={headingLevel}>Holdings</Heading>
        {Object.keys(holdingsData).map(holdingGroupUid => {
          const {
            heading,
            infoUrl,
            summaryText,
            publicNote,
            showAllName,
            holdings,
            floor
          } = holdingsData[holdingGroupUid]
          const headings = _.pluck(holdings[0].fields, 'heading')
          const showAll = _.contains(this.state.show, holdingGroupUid)
          const holdingGroupClassNames = `holding-group holding-group--${holdingGroupUid}`

          return (
            <section key={holdingGroupUid} className={holdingGroupClassNames}>
              <div className="holding-group-heading-container">
                <Heading className="holding-group-heading" level={headingLevel + 1}>{heading}</Heading>
                {infoUrl && ( <a href={infoUrl} className="holding-group-info-link">About location</a> )}
              </div>
              {floor && (<p className="no-margin text-grey">{floor}</p>)}
              {summaryText && ( <p className="font-small no-margin">Library has: {summaryText}</p> )}
              {publicNote && ( <p className="font-small no-margin">Note: {publicNote}</p> )}
              <table className="holding-table responsive-table">
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
                  {showAll ? ('Show Fewer') : (`Show All ${holdings.length}`)} {showAllName}
                </button>
              )}
            </section>
          )
        })}
      </article>
    )
  }
}

export default Holdings;

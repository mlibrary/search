/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { SPACING } from '../../reusable/umich-lib-core-temp'
import { Button, INTENT_COLORS } from '@umich-lib/core'
import Icon from '../../reusable/components/Icon'

function RenderAnchor({ data }) {
  /*
    Rendered Anchors go to
    - an internal Get This page, or
    - a full record page.
  */
  let to

  if (data.to.action === 'get-this') {
    to = `/catalog/record/${data.to.record}/get-this/${data.to.barcode}`
      + `${document.location.search}`
  } else {
    to = `/catalog/record/${data.to.record}`
      + `${document.location.search}`
  }

  return (
    <Link
      to={to}
    >
      {data.text}
    </Link>
  )
}

export default function Holding({
  holding
}) {
  return (
    <tr>
      {holding.map((cell, i) => (
        <td
          css={{
            paddingTop: SPACING['XS'],
            paddingBottom: SPACING['XS'],
            paddingRight: SPACING['L'],
            color: INTENT_COLORS[cell.intent]
          }} 
          key={i}
        >
          <Cell
            cell={cell}
            renderAnchor={(data) => (
              <RenderAnchor
                data={data}
              />
            )}
          />
        </td>
      ))}
    </tr>
  )
}

const Cell = ({
  cell,
  renderAnchor
}) => {
  return (
    <React.Fragment>
      {cell.icon && (
        <Icon
          icon={cell.icon}
          style={{
            marginRight: '0.25rem',
            marginTop: '-2px'
          }}
        />)}

      {(() => {
        if (cell.href) {
          return (<a href={cell.href}>{cell.text}</a>)
        }
        if (cell.to) {
          return (renderAnchor(cell))
        }
        if (cell.html) {
          return <span dangerouslySetInnerHTML={{ __html: cell.html }} />
        }
        return (<TrimCellText text={cell.text} />)
      })()}
    </React.Fragment>
  )
}

class TrimCellText extends React.Component {
  state = {
    expanded: false,
    trimTextAt: 120
  }

  render() {
    const { text } = this.props
    const { trimTextAt } = this.state

    // When text doens't need to be trimmed.
    // Only trimming past trim text at, so user don't show all
    // for just a few more chars.
    if (text.length <= trimTextAt + 60) {
      return (
        <React.Fragment>{text}</React.Fragment>
      )
    }

    // When text is longer than the trim text at length.
    const isExpanded = this.state.expanded
    const buttonText = isExpanded ? "Show less" : "Show more"
    const displayText = isExpanded ? text : `${text.substr(0, trimTextAt)}...`
    return (
      <React.Fragment>
        <span style={{ paddingRight: '0.25rem' }}>{displayText}</span>
        <Button
          kind="secondary"
          small
          aria-expanded={isExpanded}
          onClick={() => this.setState({ expanded: !isExpanded })}
        >{buttonText}</Button>
      </React.Fragment>
    )
  }
}

/** @jsxImportSource @emotion/react */
import React from 'react';
import { INTENT_COLORS } from '../../reusable/umich-lib-core-temp';
import { Anchor, Icon } from '../../reusable';
import PropTypes from 'prop-types';

function Cell ({ cell }) {
  return (
    <>
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
          return (
            <Anchor href={cell.href}>
              {cell.text}
            </Anchor>
          );
        }
        if (cell.to) {
          return (
            <Anchor to={`/catalog/record/${cell.to.record}${cell.to.action === 'get-this' ? `/get-this/${cell.to.barcode}` : ''}${document.location.search}`}>
              {cell.text}
            </Anchor>
          );
        }
        if (cell.html) {
          return <span dangerouslySetInnerHTML={{ __html: cell.html }} />;
        }
        return (<TrimCellText text={cell.text} />);
      })()}
    </>
  );
};

Cell.propTypes = {
  cell: PropTypes.object
};

class TrimCellText extends React.Component {
  state = {
    expanded: false,
    trimTextAt: 120
  };

  render () {
    const { text } = this.props;
    const { trimTextAt } = this.state;

    // When text doesn't need to be trimmed.
    // Only trimming past trim text at, so user don't show all
    // for just a few more chars.
    if (text.length <= trimTextAt + 60) {
      return text;
    }

    // When text is longer than the trim text at length.
    const isExpanded = this.state.expanded;
    const buttonText = isExpanded ? 'Show less' : 'Show more';
    const displayText = isExpanded ? text : `${text.substr(0, trimTextAt)}...`;
    return (
      <>
        <span style={{ paddingRight: '0.25rem' }}>{displayText}</span>
        <button
          className='btn btn--small btn--secondary'
          aria-expanded={isExpanded}
          onClick={() => {
            return this.setState({ expanded: !isExpanded });
          }}
        >
          {buttonText}
        </button>
      </>
    );
  }
}

TrimCellText.propTypes = {
  text: PropTypes.string
};

export default function Holding ({ holding }) {
  return (
    <tr>
      {holding.map((cell, i) => {
        return (
          <td
            css={{
              color: INTENT_COLORS[cell.intent]
            }}
            key={i}
          >
            <Cell cell={cell} />
          </td>
        );
      })}
    </tr>
  );
}

Holding.propTypes = {
  holding: PropTypes.array
};

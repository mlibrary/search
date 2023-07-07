/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { INTENT_COLORS } from '../../reusable/umich-lib-core-temp';
import { Icon, Button } from '../../reusable';
import PropTypes from 'prop-types';

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
            <Cell
              cell={cell}
              renderAnchor={(data) => {
                return (
                  <Link to={`/catalog/record/${data.to.record}${data.to.action === 'get-this' ? `/get-this/${data.to.barcode}` : ''}${document.location.search}`}>
                    {data.text}
                  </Link>
                );
              }}
            />
          </td>
        );
      })}
    </tr>
  );
}

Holding.propTypes = {
  holding: PropTypes.array
};

const Cell = ({
  cell,
  renderAnchor
}) => {
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
          return (<a href={cell.href}>{cell.text}</a>);
        }
        if (cell.to) {
          return (renderAnchor(cell));
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
  cell: PropTypes.object,
  renderAnchor: PropTypes.func
};

class TrimCellText extends React.Component {
  state = {
    expanded: false,
    trimTextAt: 120
  };

  render () {
    const { text } = this.props;
    const { trimTextAt } = this.state;

    // When text doens't need to be trimmed.
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
        <Button
          kind='secondary'
          small
          aria-expanded={isExpanded}
          onClick={() => {
            return this.setState({ expanded: !isExpanded });
          }}
        >
          {buttonText}
        </Button>
      </>
    );
  }
}

TrimCellText.propTypes = {
  text: PropTypes.string
};

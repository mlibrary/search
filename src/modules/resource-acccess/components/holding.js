import React from 'react';
import { Anchor, Icon, TruncateText } from '../../reusable';
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
        return (<TruncateText text={cell.text} />);
      })()}
    </>
  );
};

Cell.propTypes = {
  cell: PropTypes.object
};

export default function Holding ({ holding }) {
  return (
    <tr>
      {holding.map((cell, i) => {
        return (
          <td
            className={cell.intent && `intent__${[cell.intent]}`}
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

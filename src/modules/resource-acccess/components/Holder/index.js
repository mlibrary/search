/** @jsxImportSource @emotion/react */
import React from 'react';
import Holding from '../Holding';
import {
  Anchor,
  Expandable,
  ExpandableChildren,
  ExpandableButton
} from '../../../reusable';
import PropTypes from 'prop-types';

const notesList = (notes) => {
  if (!notes) return null;

  if (notes.length === 1) {
    return (
      <p className='text-grey__light'>
        {notes[0]}
      </p>
    );
  }

  return (
    <ul>
      {notes.map((note, i) => {
        return (
          <li
            key={note + i}
            className='text-grey__light padding-bottom__xs'
          >
            {note}
          </li>
        );
      })}
    </ul>
  );
};

export default function Holder ({
  headings,
  rows,
  captionLink,
  notes,
  preExpanded,
  ...rest
}) {
  const isExpandable = rows.length > 10;
  return (
    <div {...rest}>
      {captionLink && (
        <p className='margin__none'>
          <Anchor href={captionLink.href} style={{ color: 'var(--ds-color-neutral-400)' }}>
            {captionLink.text}
          </Anchor>
        </p>
      )}

      {notesList(notes)}

      {rows && (
        <Expandable { ...preExpanded }>
          <div
            className='holder-container'
            style={{
              overflowX: 'auto'
            }}
          >
            <table
              css={{
                minWidth: '24rem',
                tableLayout: 'fixed',
                textAlign: 'left',
                width: '100%',
                'tr > *': {
                  padding: '0.5rem 0',
                  width: 'auto',
                  '& + *': {
                    paddingLeft: '1.5rem'
                  },
                  '&:nth-of-type(3):last-of-type': {
                    width: '50%'
                  }
                }
              }}
            >
              <thead>
                <tr>
                  {headings.map((heading, i) => {
                    return (
                      <th
                        scope='col'
                        key={i}
                        className='text-grey__light strong'
                        style={{
                          borderBottom: 'solid 2px var(--ds-color-neutral-100)',
                        }}
                      >
                        {heading}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
              <ExpandableChildren show={isExpandable ? 10 : rows.length}>
                {rows.map((row, i) => {
                  return <Holding holding={row} key={i} />;
                })}
              </ExpandableChildren>
              {isExpandable && (
                <tr>
                  <td
                    colSpan={`${rows[0].length}`}
                    style={{ wordBreak: 'break-word' }}
                  >
                    <ExpandableButton count={rows.length} />
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </Expandable>
      )}
    </div>
  );
}

Holder.propTypes = {
  headings: PropTypes.array,
  rows: PropTypes.array,
  captionLink: PropTypes.object,
  notes: PropTypes.array,
  preExpanded: PropTypes.bool
};

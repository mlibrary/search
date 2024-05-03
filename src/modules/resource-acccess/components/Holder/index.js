import React from 'react';
import './styles.css';
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
          <div className='holder-container'>
            <table>
              <thead>
                <tr>
                  {headings.map((heading, i) => {
                    return (
                      <th
                        scope='col'
                        key={i}
                        className='text-grey__light strong'
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

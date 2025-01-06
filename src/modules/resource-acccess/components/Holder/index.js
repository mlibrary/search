import './styles.css';
import {
  Anchor,
  Expandable,
  ExpandableButton,
  ExpandableChildren
} from '../../../reusable';
import Holding from '../Holding';
import React from 'react';

const notesList = (notes) => {
  if (!notes) {
    return null;
  }

  if (notes.length === 1) {
    return (
      <p className='text-grey__light'>
        {notes[0]}
      </p>
    );
  }

  return (
    <ul>
      {notes.map((note, index) => {
        return (
          <li
            key={note + index}
            className='text-grey__light padding-bottom__xs'
          >
            {note}
          </li>
        );
      })}
    </ul>
  );
};

const Holder = ({ captionLink, headings, notes, preExpanded, rows, ...rest }) => {
  const isExpandable = rows.length > 10;
  return (
    <div {...rest}>
      {captionLink && (
        <p className='margin__none'>
          <Anchor href={captionLink.href} className='btn--tertiary'>
            {captionLink.text}
          </Anchor>
        </p>
      )}

      {notesList(notes)}

      {rows && (
        <Expandable {...preExpanded}>
          <div className='holder-container'>
            <table>
              <thead>
                <tr>
                  {headings.map((heading, index) => {
                    return (
                      <th
                        scope='col'
                        key={index}
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
                  {rows.map((row, index) => {
                    return <Holding holding={row} key={index} />;
                  })}
                </ExpandableChildren>
                {isExpandable && (
                  <tr>
                    <td colSpan={`${rows[0].length}`}>
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
};

export default Holder;

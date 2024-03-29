/** @jsxImportSource @emotion/react */
import React from 'react';
import Holding from './holding';
import {
  Anchor,
  Expandable,
  ExpandableProvider,
  ExpandableChildren,
  ExpandableButton
} from '../../reusable';
import PropTypes from 'prop-types';

const notesList = (notes) => {
  if (!notes) return null;

  if (notes.length === 1) {
    return (
      <p
        css={{
          color: 'var(--ds-color-neutral-300)'
        }}
      >
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
            css={{
              paddingBottom: 'var(--search-spacing-xs)',
              color: 'var(--ds-color-neutral-300)'
            }}
          >
            {note}
          </li>
        );
      })}
    </ul>
  );
};

export default function Holder ({
  record,
  headings,
  rows,
  captionLink,
  notes,
  preExpanded,
  ...rest
}) {
  return (
    <div {...rest}>
      {captionLink && (
        <p
          css={{
            display: 'inline-block',
            margin: '0',
            a: {
              color: 'var(--ds-color-neutral-400)'
            }
          }}
        >
          <Anchor href={captionLink.href}>
            {captionLink.text}
          </Anchor>
        </p>
      )}

      {notesList(notes)}

      {rows && (
        <Expandable>
          <div
            css={{
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
                        css={{
                          borderBottom: 'solid 2px var(--ds-color-neutral-100)',
                          color: 'var(--ds-color-neutral-300)',
                          fontWeight: '600'
                        }}
                      >
                        {heading}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <HolderRows rows={rows} />
              </tbody>
            </table>
          </div>
        </Expandable>
      )}
    </div>
  );
}

Holder.propTypes = {
  record: PropTypes.object,
  headings: PropTypes.array,
  rows: PropTypes.array,
  captionLink: PropTypes.object,
  notes: PropTypes.array,
  preExpanded: PropTypes.bool
};

function HolderRows ({ rows }) {
  /*
    Just render the holdings.
  */
  if (rows <= 10) {
    return (
      <>
        {rows.map((row, i) => {
          return (
            <Holding holding={row} key={i} />
          );
        })}
      </>
    );
  }

  function renderExpandableButton () {
    return (
      <tr>
        <td
          colSpan={`${rows[0].length}`}
          css={{
            wordBreak: 'break-word'
          }}
        >
          <ExpandableButton count={rows.length} />
        </td>
      </tr>
    );
  }

  /*
    We need fancy expandable buttons now.
    Too many holdings.

    Show first 10 holdings.
    Then an expandable button.
    The rest of holdings.
    Then finally an expandable button.
  */
  return (
    <>
      {rows.slice(0, 10).map((row, i) => {
        return (
          <Holding holding={row} key={i} />
        );
      })}
      {rows.length > 10 && (
        <>{renderExpandableButton()}</>
      )}
      <ExpandableChildren show={0}>
        {rows.slice(10).map((row, i) => {
          return (
            <Holding holding={row} key={i} />
          );
        })}
      </ExpandableChildren>
      <ExpandableProvider>
        {(context) => {
          return (
            <>
              {context.expanded && (
                <>{renderExpandableButton()}</>
              )}
            </>
          );
        }}
      </ExpandableProvider>
    </>
  );
}

HolderRows.propTypes = {
  rows: PropTypes.array
};

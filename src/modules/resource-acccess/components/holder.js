/** @jsxImportSource @emotion/react */
import React from 'react';
import Holding from './holding';
import { COLORS, SPACING } from '../../reusable/umich-lib-core-temp';
import {
  Expandable,
  ExpandableProvider,
  ExpandableChildren,
  ExpandableButton
} from '../../reusable';

const cell_padding = {
  paddingTop: SPACING.XS,
  paddingBottom: SPACING.XS,
  paddingRight: SPACING.L
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
    <div
      css={{
        a: {
          textDecoration: 'underline'
        },
        padding: `${SPACING.S} 0`
      }}
      {...rest}
    >
      {captionLink && (
        <p css={{ margin: '0' }}>
          <a
            href={captionLink.href}
            css={{
              color: COLORS.neutral['400'],
              display: 'inline-block'
            }}
          >
            {captionLink.text}
          </a>
        </p>
      )}
      {notes && (
        <ul>
          {notes.map((note, i) => {
            return (
              <li
                key={note + i}
                css={{
                  paddingBottom: SPACING.XS,
                  color: COLORS.neutral['300']
                }}
              >
                {note}
              </li>
            );
          })}
        </ul>
      )}

      {rows && (
        <Expandable>
          <div
            css={{
              overflowX: 'auto'
            }}
          >
            <table
              css={{
                width: '100%',
                minWidth: '24rem',
                textAlign: 'left',
                tableLayout: 'fixed'
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
                          fontWeight: '600',
                          color: COLORS.neutral['300'],
                          ...cell_padding,
                          borderBottom: `solid 2px ${COLORS.neutral['100']}`,
                          width:
                          headings.length === 3 && i === 2 ? '50%' : 'auto'
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
            ...cell_padding,
            wordBreak: 'break-word'
          }}
        >
          <ExpandableButton kind='secondary' small count={rows.length} />
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

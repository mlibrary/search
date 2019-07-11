/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Link } from 'react-router-dom'

import Holding from './holding'

import {
  COLORS,
  SPACING,
} from '../umich-lib-core-temp'

import {
  Expandable,
  ExpandableProvider,
  ExpandableChildren,
  ExpandableButton
} from '@umich-lib/core'

const cell_padding = {
  paddingTop: SPACING['XS'],
  paddingBottom: SPACING['XS'],
  paddingRight: SPACING['L'],
}

export default function Holder({
  record,
  headings,
  rows,
  captionLink,
  ...rest
}) {
  return (
    <div
      css={{
        borderTop: `solid 1px ${COLORS.neutral['100']}`,
        'a': {
          textDecoration: 'underline'
        }
      }}
      {...rest}
    >
      {captionLink && (
        <a
          href={captionLink.href}
          css={{
            color: COLORS.neutral['400'],
            display: 'inline-block',
            paddingBottom: SPACING['S']
          }}
        >{captionLink.text}</a>
      )}

      <Expandable>
        <table
          css={{
            width: '100%',
            textAlign: 'left',
            tableLayout: 'fixed'
          }}
        >
          <thead>
            <tr>
              {headings.map((heading, i) => (
                <th
                  scope="col"
                  key={i}
                  css={{
                    fontWeight: '600',
                    color: COLORS.neutral['300'],
                    ...cell_padding,
                    borderBottom: `solid 2px ${COLORS.neutral['100']}`,
                    width: headings.length === 3 && i === 2 ? '50%' : 'auto'
                  }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <HolderRows rows={rows} />
          </tbody>
        </table>
      </Expandable>
    </div>
  )
}

function HolderRows({
  rows
}) {
  /*
    Just render the holdings. 
  */
  if (rows <= 10) {
    return (
      <React.Fragment>
        {rows.map((row, i) => (
          <Holding
            holding={row}
            key={i}
          />
        ))}
      </React.Fragment>
    )
  }

  function renderExpandableButton() {
    return (
      <tr>
        <td
          colSpan={`${rows[0].length}`}
          css={{
            ...cell_padding
          }}
        >
          <ExpandableButton
            kind="secondary"
            small
            count={rows.length}
          />
        </td>
      </tr>
    )
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
    <React.Fragment>
      {rows.slice(0, 10).map((row, i) => (
        <Holding
          holding={row}
          key={i}
        />
      ))}

      {renderExpandableButton()}
      <ExpandableChildren show={0}>
        {rows.slice(10).map((row, i) => (
          <Holding
            holding={row}
            key={i}
          />
        ))}
      </ExpandableChildren>
      <ExpandableProvider>
        {context =>
          <React.Fragment>
            {(context.expanded) && (
              <React.Fragment>
                {renderExpandableButton()}
              </React.Fragment>
            )}
          </React.Fragment>
        }
      </ExpandableProvider>
    </React.Fragment>
  )
}
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'

import Holding from './holding'
import {
  COLORS,
  SPACING,
  MEDIA_QUERIES
} from '../umich-lib-core-temp'
import {
  Expandable,
  ExpandableProvider,
  ExpandableChildren,
  ExpandableButton,
  Icon,
  Button
} from '@umich-lib/core'

const cell_padding = {
  paddingTop: SPACING['XS'],
  paddingBottom: SPACING['XS'],
  paddingRight: SPACING['L']
}

export default function Holder({
  record,
  headings,
  rows,
  captionLink,
  notes,
  ...rest
}) {
  return (
    <div
      css={{
        'a': {
          textDecoration: 'underline',
        },
        padding: `${SPACING['S']} 0`
      }}
      {...rest}
    >
      {captionLink && (
        <p css={{ margin: '0' }}>
          <a
            href={captionLink.href}
            css={{
              color: COLORS.neutral['400'],
              display: 'inline-block',
              paddingBottom: SPACING['S']
            }}
          >
            {captionLink.text}
          </a>
        </p>
      )}
      <Notes notes={notes} />

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

function Notes({ notes }) {
  const [expanded, setExpanded] = useState(false);

  if (!notes) {
    return null
  }

  return (
    <React.Fragment>
      <Button
        kind="secondary"
        small
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        css={{
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: SPACING['S']
        }}
      >
        <span css={{ paddingRight: '0.25rem' }}>View items held or missing</span>
        {expanded ? (
          <Icon
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
          />
        ) : (
          <Icon
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
          />
        )}
      </Button>

      {expanded && (
        <ul>
          {notes.map(note => (
            <li css={{ paddingBottom: SPACING['XS'] }}>{note}</li>
          ))}
        </ul>
      )}
    </React.Fragment>
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
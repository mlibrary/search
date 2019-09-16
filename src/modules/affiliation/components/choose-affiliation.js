/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { useCookies } from 'react-cookie'

import {
  Button,
  Heading
} from '@umich-lib/core'
import {
  Icon,
  Modal,
} from '../../reusable'
import {
  SPACING
} from '../../resource-acccess/umich-lib-core-temp'
import {
  MultipleChoice
} from '../../core'

const affiliations = {
  'aa': 'U-M Ann Arbor',
  'flint': 'U-M Flint',
  [undefined]: 'No affiliation'
}

export default function ChooseAffiliation() {
  const [cookies] = useCookies(['affiliation']);
  const [open, setOpen] = useState(false)

  const label = affiliations[cookies['affiliation']]
    ? affiliations[cookies['affiliation']]
    : 'No affiliation'

  return (
    <React.Fragment>
      <Button
        kind="secondary"
        css={{
          color: 'white',
          border: 'none',
          padding: '0'
        }}
        onClick={() => setOpen(true)}
      >
        <VisuallyHidden>Choose campus affiliation: </VisuallyHidden>
        <span css={{
          marginRight: SPACING['2XS']
        }}>{label}</span>
        <Icon icon="expand_more" />
      </Button>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
      >
        <Heading size="large" css={{
          marginTop: '0'
        }}>Choose campus affiliation</Heading>
        <p>Selecting an affiliation helps us connect you to electronic materials licensed for your campus.</p>

        <AffiliationForm
          handleClose={() => setOpen(false)}
        />
      </Modal>
    </React.Fragment>
  )
}

function AffiliationForm({ handleClose, initialIndex = 2 }) {
  const [cookies, setCookie, removeCookie] = useCookies(['affiliation']);
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const cookie = cookies['affiliation']
  const options = Object.keys(affiliations).map(a => affiliations[a])
  
  useEffect(() => {
    if (selectedIndex === undefined) {
      if (cookie) {
        const index = Object.keys(affiliations).findIndex(a => a === cookie)

        if (index >= 0) { // index found
          setSelectedIndex(index)
        }
      } else {
        setSelectedIndex(initialIndex)
      }
    }
  }, [selectedIndex])

  function handleSetCookie(e) {
    e.preventDefault()

    if (selectedIndex === 2) { // "No affiliation"
      removeCookie('affiliation')
    } else {
      const value = Object.keys(affiliations)[selectedIndex]
      setCookie('affiliation', value, { path: '/' })
    }

    handleClose()
  }

  return (
    <form css={{
      'label': {
        display: 'block',
        marginBottom: SPACING['XS']
      }
    }}>
      <MultipleChoice
        name={`affiliation`}
        options={options}
        selectedIndex={selectedIndex}
        onMultipleChoiceChange={({ index }) => setSelectedIndex(index)}
      />

      <div className="x-spacing" css={{
        marginTop: SPACING['S']
      }}>
        <Button type="submit" onClick={(e) => handleSetCookie(e)}>Select</Button>
        <Button kind="secondary" onClick={() => handleClose()}>Cancel</Button>
      </div>
    </form>
  )
}
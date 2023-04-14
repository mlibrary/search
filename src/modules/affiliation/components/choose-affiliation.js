/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { MEDIA_QUERIES, COLORS } from '../../reusable/umich-lib-core-temp';
import { Modal, Button } from '../../reusable';

export default function ChooseAffiliation () {
  const { defaultAffiliation, affiliationOptions } = useSelector(
    (state) => {
      return state.affiliation;
    }
  );
  const [cookies] = useCookies(['affiliation']);
  const [open, setOpen] = useState(false);

  let affiliation = defaultAffiliation;

  if (cookies.affiliation) {
    affiliation = cookies.affiliation;
  }

  const label = affiliationOptions[affiliation];
  const alternativeAffiliation = affiliation === 'aa' ? 'flint' : 'aa';
  const alternativeLabel = affiliationOptions[alternativeAffiliation];

  function changeAffiliation () {
    const parsed = qs.parse(document.location.search.substring(1), {
      allowDots: true
    });
    const withAffiliation = {
      ...parsed,
      affiliation: alternativeAffiliation
    };

    document.location.href =
      document.location.pathname +
      '?' +
      qs.stringify(withAffiliation, {
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
        allowDots: true,
        format: 'RFC1738'
      });
  }

  const activeSelector = affiliation === 'aa' ? 'div:first-of-type' : 'div:last-of-type';

  return (
    <>
      <Button
        kind='secondary'
        css={{
          color: 'white',
          padding: '0',
          border: `solid 1px ${COLORS.blue[300]}`,
          margin: '0',
          boxShadow: '0 0 0 1px rgb(16 22 26 / 10%), 0 4px 8px rgb(16 22 26 / 20%), 0 18px 46px 6px rgb(16 22 26 / 20%);'
        }}
        onClick={() => {
          return setOpen(true);
        }}
      >
        <span css={{
          border: '0px',
          clip: 'rect(0px, 0px, 0px, 0px)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0px',
          position: 'absolute',
          width: '1px',
          whiteSpace: 'nowrap',
          overflowWrap: 'normal'
        }}
        >Choose campus affiliation
        </span>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            borderRadius: '4px',
            textTransform: 'uppercase',
            fontWeight: '800',
            fontSize: '0.75rem',
            textAlign: 'right',
            div: {
              display: 'inline-block',
              padding: '0.25rem 0.5rem',
              lineHeight: '1.5',
              '&:hover': {
                textDecoration: 'underline'
              }
            },
            [activeSelector]: {
              background: COLORS.blue['300']
            }
          }}
        ><div>Ann Arbor</div><div>Flint</div>
        </div>
      </Button>
      <Modal
        isOpen={open} onRequestClose={() => {
          return setOpen(false);
        }}
      >
        <div
          css={{
            maxWidth: '32rem'
          }}
        >
          <Button
            kind='secondary'
            onClick={() => {
              return setOpen(false);
            }}
            small
            css={{
              position: 'fixed',
              right: '1.5rem',
              top: '1.5rem',
              border: 'none',
              textDecoration: 'underline'
            }}
          >
            Dismiss
          </Button>
          <h2
            className='heading-large'
            css={{
              marginTop: '0',
              marginRight: '4rem'
            }}
          >
            Choose campus affiliation
          </h2>
          <p>
            Selecting an affiliation helps us connect you to available online
            materials licensed for your campus.
          </p>

          <Button onClick={() => {
            return setOpen(false);
          }}
          >Continue as {label}
          </Button>
          <span
            css={{
              [MEDIA_QUERIES.LARGESCREEN]: {
                margin: '0 0.5rem',
                display: 'inline-block'
              },
              margin: '0.5rem',
              display: 'block'
            }}
          >
            or
          </span>
          <Button kind='secondary' onClick={changeAffiliation} role='link'>
            Change to {alternativeLabel}
          </Button>

          <p className='font-small' css={{ marginBottom: '0' }}>
            You can still use Library Search if you're not affiliated with
            either campus.
          </p>
        </div>
      </Modal>
    </>
  );
}

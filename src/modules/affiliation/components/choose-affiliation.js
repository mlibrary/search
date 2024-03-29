/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { Dialog } from '../../reusable';

function oldSafari () {
  const safariVersionMatch = navigator.userAgent.match(/Version\/([0-9._]+) Safari/);

  if (!safariVersionMatch) return false;

  const [major, minor = 0] = safariVersionMatch[1].split('.').map((part) => {
    return parseInt(part, 10);
  });

  return major < 15 || (major === 15 && minor < 4);
}

export default function ChooseAffiliation () {
  const { defaultAffiliation, affiliationOptions } = useSelector((state) => {
    return state.affiliation;
  });

  let affiliation = localStorage.getItem('affiliation') || defaultAffiliation;

  const urlParams = new URLSearchParams(window.location.search);
  affiliation = urlParams.get('affiliation') || affiliation;

  useEffect(() => {
    localStorage.setItem('affiliation', affiliation);
  }, [affiliation]);

  const alternativeAffiliation = affiliation === 'flint' ? 'aa' : 'flint';

  const changeAffiliation = () => {
    localStorage.setItem('affiliation', alternativeAffiliation);

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
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => {
    return setDialogOpen((bool) => {
      return !bool;
    });
  };
  const closeDialog = () => {
    return setDialogOpen(false);
  };
  return (
    <div>
      <button
        className='btn btn--secondary no-background'
        css={{
          borderColor: 'var(--ds-color-blue-300)',
          color: 'white',
          display: 'flex',
          padding: '0',
          textTransform: 'uppercase',
          fontWeight: '800',
          fontSize: '0.8rem',
          '& > div': {
            padding: '0.25rem 0.5rem',
            '&:hover': {
              textDecoration: 'underline'
            },
            '&.active-affiliation': {
              background: 'var(--ds-color-blue-300)'
            }
          }
        }}
        onClick={oldSafari() ? changeAffiliation : toggleDialog}
      >
        <div className={affiliation !== 'flint' ? 'active-affiliation' : ''}>
          <span className='visually-hidden'>{affiliation === 'flint' ? 'Choose' : 'Current'} campus affiliation: </span>
          Ann Arbor
        </div>
        <div className={affiliation === 'flint' ? 'active-affiliation' : ''}>
          <span className='visually-hidden'>{affiliation === 'flint' ? 'Current' : 'Choose'} campus affiliation: </span>
          Flint
        </div>
      </button>
      {!oldSafari() && (
        <Dialog open={dialogOpen} onRequestClose={closeDialog} closeOnOutsideClick>
          <div
            css={{
              alignItems: 'flex-start',
              display: 'flex',
              gap: '1rem'
            }}
          >
            <div
              css={{
                flexGrow: '1',
                '& > h2': {
                  marginTop: '0'
                },
                '& > *:last-child': {
                  marginBottom: '0'
                }
              }}
            >
              <h2 className='heading-large'>
                Choose campus affiliation
              </h2>
              <p>
                Selecting an affiliation helps us connect you to available online
                materials licensed for your campus.
              </p>
              <div
                css={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  '@media only screen and (min-width: 640px)': {
                    flexDirection: 'row',
                    gap: '1rem'
                  }
                }}
              >
                <button className='btn btn--primary' onClick={closeDialog}>
                  Continue as {affiliationOptions[affiliation]}
                </button>
                or
                <button className='btn btn--secondary' onClick={changeAffiliation} role='link'>
                  Change to {affiliationOptions[alternativeAffiliation]}
                </button>
              </div>
              <p className='font-small'>
                You can still use Library Search if you're not affiliated with
                either campus.
              </p>
            </div>
            <button
              className='btn btn--small btn--secondary'
              onClick={closeDialog}
              css={{
                border: 'none',
                flexShrink: '0',
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              Dismiss
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}

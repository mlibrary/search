import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSearchStateFromURL, stringifySearch } from '../../../search';
import './styles.css';
import { Dialog } from '../../../reusable';

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

    const parsed = getSearchStateFromURL();
    const withAffiliation = {
      ...parsed,
      affiliation: alternativeAffiliation
    };
    document.location.href =
      document.location.pathname +
      '?' +
      stringifySearch(withAffiliation);
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className='choose-affiliation-container'>
      <button
        className='btn btn--secondary font-small no-background'
        onClick={oldSafari()
          ? changeAffiliation
          : () => {
              return setDialogOpen(true);
            }}
        role={oldSafari() ? 'link' : undefined}
      >
        {Object.keys(affiliationOptions).map((campusAffiliation, index) => {
          const currentAffiliation = affiliation === campusAffiliation;
          return (
            <div className={currentAffiliation ? 'active-affiliation' : undefined} key={`${campusAffiliation}-${index}`}>
              <span className='visually-hidden'>{currentAffiliation ? 'Current' : 'Choose'} campus affiliation: </span>
              {affiliationOptions[campusAffiliation]}
            </div>
          );
        })}
      </button>
      {!oldSafari() && (
        <Dialog open={isDialogOpen} isOpen={isDialogOpen} onClose={handleClose}>
          <h2 className='margin-top__none'>
            Choose campus affiliation
          </h2>
          <p>
            Selecting an affiliation helps us connect you to available online materials licensed for your campus.
          </p>
          <div className='dialog-buttons'>
            <button className='btn btn--primary' onClick={handleClose}>
              Continue as {affiliationOptions[affiliation]}
            </button>
            or
            <button className='btn btn--secondary' onClick={changeAffiliation} role='link'>
              Change to {affiliationOptions[alternativeAffiliation]}
            </button>
          </div>
          <p className='font-small margin-bottom__none'>
            You can still use Library Search if you're not affiliated with either campus.
          </p>
        </Dialog>
      )}
    </div>
  );
}

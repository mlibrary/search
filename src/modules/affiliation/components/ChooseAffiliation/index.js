import { React, useState } from 'react';

const initialAffiliationState = {
  active: localStorage.getItem('affiliation') || undefined,
  defaultAffiliation: 'aa',
  affiliationOptions: {
    aa: 'Ann Arbor',
    flint: 'Flint'
  }
};

function ChooseAffiliation () {
  let activeAffiliation = initialAffiliationState.defaultAffiliation;
  // Set default affiliation if query parameter exists
  const urlParams = new URLSearchParams(window.location.search);
  const affiliationParam = urlParams.get('affiliation');
  if (affiliationParam) {
    activeAffiliation = affiliationParam;
    // Set localStorage
    localStorage.setItem('affiliation', affiliationParam);
  }
  const affiliationLocalStorage = localStorage.getItem('affiliation');
  // Set default affiliation if localStorage exists
  if (affiliationLocalStorage) {
    activeAffiliation = affiliationLocalStorage;
  }
  const [affiliation, setAffiliation] = useState(activeAffiliation);
  const onAffiliationChange = (event) => {
    const value = event.target.value;
    setAffiliation(value);
    urlParams.set('affiliation', value);
    window.location.href = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
  };

  return (
    <fieldset className='institution-select-container'>
      <legend className='visually-hidden'>Choose Affiliation</legend>
      <label
        className='institution-select-label institution-select-label-text'
        htmlFor='choose-affiliation'
      >
        Affiliation
      </label>
      <select
        className='dropdown'
        id='choose-affiliation'
        autoComplete='off'
        value={affiliation}
        onChange={onAffiliationChange}
        aria-describedby='affiliation-description'
      >
        {Object.keys(initialAffiliationState.affiliationOptions).map((affiliationOption) => {
          return (
            <option value={affiliationOption} key={`affiliation-${affiliationOption}`}>
              {initialAffiliationState.affiliationOptions[affiliationOption]}
            </option>
          );
        })}
      </select>
      <p className='font-small' id='affiliation-description'>Selecting an affiliation helps us connect you to available online materials licensed for your campus. You can still use Library Search if you're not affiliated with either campus.</p>
    </fieldset>
  );
}

export { initialAffiliationState, ChooseAffiliation };

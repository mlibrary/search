import { React, useState } from 'react';

export default function ChooseAffiliation () {
  const affiliations = {
    aa: 'Ann Arbor',
    flint: 'Flint'
  };
  let defaultAffiliation = Object.keys(affiliations)[0];
  // Set default affiliation if query parameter exists
  const urlParams = new URLSearchParams(window.location.search);
  const affiliationParam = urlParams.get('affiliation');
  if (affiliationParam) {
    defaultAffiliation = affiliationParam;
    // Set localStorage
    localStorage.setItem('affiliation', affiliationParam);
  }
  const affiliationLocalStorage = localStorage.getItem('affiliation');
  // Set default affiliation if localStorage exists
  if (affiliationLocalStorage) {
    defaultAffiliation = affiliationLocalStorage;
  }
  const [affiliation, setAffiliation] = useState(defaultAffiliation);
  const onAffiliationChange = (event) => {
    const value = event.target.value;
    setAffiliation(value);
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
      >
        {Object.keys(affiliations).map((affiliation) => {
          return (
            <option value={affiliation} key={`affiliation-${affiliation}`}>
              {affiliations[affiliation]}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
}

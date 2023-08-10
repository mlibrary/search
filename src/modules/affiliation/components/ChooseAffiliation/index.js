import React from 'react';

export default function ChooseAffiliation () {
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
      >
        <option value='aa'>
          Ann Arbor
        </option>
        <option value='flint'>
          Flint
        </option>
      </select>
    </fieldset>
  );
}

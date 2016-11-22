import React from 'react'
import { submitSearch } from '../store/actions.js'

export const SearchBox = ({
  onSubmitSearch
}) => {
  let input;

  return (
    <div className="search-box-container-full">
      <div className="container container-narrow">
        <form className="search-box">
          <input type="text" ref={node => {
            input = node;
          }}/>
          <input className="button search-box-button" type="submit" value="Search" onClick={(event) => {
            event.preventDefault()
            onSubmitSearch(input.value)
          }}/>
        </form>
      </div>
    </div>
  )
}

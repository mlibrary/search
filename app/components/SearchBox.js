import React from 'react'
import { submitSearch } from '../actions/actions.js'

import { prideRunSearch } from './../pride_interface.js'
import { store } from '../store.js'

class SearchBox extends React.Component {
  render() {
    let input

    return (
      <div className="search-box-container-full">
        <div className="container container-narrow">
          <form className="search-box">
            <input type="text" ref={node => {
              input = node;
            }}/>
            <input className="button search-box-button" type="submit" value="Search" onClick={(event) => {
              event.preventDefault()
              store.dispatch(submitSearch({search_query: input.value}))
              prideRunSearch()
            }}/>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchBox

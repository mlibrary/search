import React from 'react'
import { submitSearch } from '../actions/actions.js'

class Default extends React.Component {
  render() {
    return (
      <div className="search-box-container-full">
        <div className="container container-narrow">
          <form className="search-box">
            <input type="text"/>
            <input className="button search-box-button" type="submit" value="Search" onClick={(event) => {
              event.preventDefault()
            }}/>
          </form>
        </div>
      </div>
    )
  }
}

export default Default

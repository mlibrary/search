import React from 'react'

export class SearchBox extends React.Component {
  render() {
    return (
      <div className="search-box-container-full">
        <div className="container container-narrow">
          <div className="search-box">
            <input type="text"/>
            <input className="button search-box-button" type="submit" value="Search"/>
          </div>
        </div>
      </div>
    )
  }
}

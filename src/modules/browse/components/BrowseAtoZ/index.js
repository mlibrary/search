import React from 'react';
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import history from '../../../../history'

class BrowseAtoZ extends React.Component {
  state = {
    startsWith: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  handleClick = ({ query, filter }) => {
    const {
      match
    } = this.props

    const queryString = qs.stringify({
      query,
      filter,
      sort: 'title_asc'
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format : 'RFC1738'
    })

    const url = `/${match.params.datastoreSlug}?${queryString}`
    history.push(url)
  }

  render() {
    return (
      <section className="browse">
        <h2 className="browse-heading">Titles A-Z</h2>
        <ul className="browse-list">
          {this.state.startsWith.map((character, key) => (
            <li className="browse-item" key={key}>
              <button className="browse-button" onClick={() => this.handleClick({
                query: 'title_starts_with:' + character
              })}>{character}</button>
            </li>
          ))}
          <li className="browse-item"><button className="browse-button" onClick={() => this.handleClick({
            filter: { 'title_initial': '0-9' }
          })}>0-9</button></li>
          <li className="browse-item"><button className="browse-button" onClick={() => this.handleClick({
            filter: { 'title_initial': 'Other' }
          })}>Other</button></li>
        </ul>
      </section>
    )
  }
}

export default withRouter(BrowseAtoZ);

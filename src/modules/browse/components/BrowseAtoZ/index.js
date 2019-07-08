import React from 'react';
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import { Heading } from '@umich-lib/core'

import { Link } from '../../../core'

class BrowseAtoZ extends React.Component {
  state = {
    startsWith: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  createBrowseTo = ({ query, filter }) => {
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

    return `/${match.params.datastoreSlug}?${queryString}`
  }

  render() {
    return (
      <section className="browse">
        <Heading size="3XL" level={2} style={{ marginTop: '0' }}>Titles A-Z</Heading>
        <ul className="browse-list">
          {this.state.startsWith.map((character, key) => (
            <li className="browse-item" key={key}>
              <Link
                className="browse-button"
                to={this.createBrowseTo({
                  query: 'title_starts_with:' + character
                })}
              >{character}</Link>
            </li>
          ))}
          <li className="browse-item">
            <Link
              className="browse-button"
              to={this.createBrowseTo({
                filter: { 'title_initial': '0-9' }
              })}
            >0-9</Link>
          </li>
          <li className="browse-item">
            <Link
              className="browse-button"
              to={this.createBrowseTo({
                filter: { 'title_initial': 'Other' }
              })}
            >Other</Link>
          </li>
        </ul>
      </section>
    )
  }
}

export default withRouter(BrowseAtoZ);

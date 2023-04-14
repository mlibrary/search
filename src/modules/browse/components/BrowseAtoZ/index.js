import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';

class BrowseAtoZ extends React.Component {
  state = {
    startsWith: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  };

  createBrowseTo = ({ query, filter }) => {
    const {
      match
    } = this.props;

    const queryString = qs.stringify({
      query,
      filter,
      sort: 'title_asc'
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format: 'RFC1738'
    });

    return `/${match.params.datastoreSlug}?${queryString}`;
  };

  render () {
    return (
      <section className='browse'>
        <h2 className='heading-large' style={{ marginTop: '0' }}>Titles A-Z</h2>
        <ul className='browse-list'>
          {this.state.startsWith.map((character, key) => {
            return (
              <li className='browse-item' key={key}>
                <Link
                  className='browse-button'
                  to={this.createBrowseTo({
                    query: 'browse_starts_with:' + character
                  })}
                >{character}
                </Link>
              </li>
            );
          })}
          <li className='browse-item'>
            <Link
              className='browse-button'
              to={this.createBrowseTo({
                query: 'browse_starts_with:0-9'
              })}
            >0-9
            </Link>
          </li>
          <li className='browse-item'>
            <Link
              className='browse-button'
              to={this.createBrowseTo({
                query: 'browse_starts_with:Other'
              })}
            >Other
            </Link>
          </li>
        </ul>
      </section>
    );
  }
}

export default BrowseAtoZ;

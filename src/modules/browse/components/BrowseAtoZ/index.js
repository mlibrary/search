import React from 'react';
import qs from 'qs';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function BrowseAtoZ (props) {
  const createBrowseTo = ({ query, filter }) => {
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
    return `/${props.match.params.datastoreSlug}?${queryString}`;
  };

  return (
    <section className='browse'>
      <h2 className='heading-large' style={{ marginTop: '0' }}>Titles A-Z</h2>
      <ul className='browse-list'>
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0-9', 'Other'].map((character, key) => {
          return (
            <li className='browse-item' key={key}>
              <Anchor
                className='browse-button'
                to={createBrowseTo({ query: 'browse_starts_with:' + character })}
              >
                {character}
              </Anchor>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

BrowseAtoZ.propTypes = {
  match: PropTypes.object
};

export default withRouter(BrowseAtoZ);

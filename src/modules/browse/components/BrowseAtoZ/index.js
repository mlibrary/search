import React from 'react';
import { useParams } from 'react-router-dom';
import { stringifySearch } from '../../../search';
import { Anchor } from '../../../reusable';

function BrowseAtoZ () {
  const { datastoreSlug } = useParams();
  const createBrowseTo = ({ query, filter }) => {
    const queryString = stringifySearch({
      query,
      filter,
      sort: 'title_asc'
    });
    return `/${datastoreSlug}?${queryString}`;
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
                to={createBrowseTo({ query: `browse_starts_with:${character}` })}
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

export default BrowseAtoZ;

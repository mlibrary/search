import { Anchor } from '../../../reusable';
import React from 'react';
import { stringifySearch } from '../../../search';
import { useParams } from 'react-router-dom';

const BrowseAtoZ = () => {
  const { datastoreSlug } = useParams();
  const createBrowseTo = ({ filter, query }) => {
    const queryString = stringifySearch({
      filter,
      query,
      sort: 'title_asc'
    });
    return `/${datastoreSlug}?${queryString}`;
  };

  return (
    <section className='browse'>
      <h2 className='margin-y__none'>Titles A-Z</h2>
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
};

export default BrowseAtoZ;

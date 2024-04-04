import React from 'react';
import './styles.css';
import BrowseLink from '../BrowseLink';

function ShelfBrowse () {
  const browse = {
    text: 'text',
    type: 'callnumber',
    value: 'value'
  };

  return (
    <section className='shelf-browse container__rounded'>
      <header>
        <h2>Shelf browse</h2>
        <BrowseLink
          type={browse.type}
          value={browse.value}
        >
          {browse.text}
        </BrowseLink>
      </header>
      Carousel
    </section>
  );
}

export default ShelfBrowse;

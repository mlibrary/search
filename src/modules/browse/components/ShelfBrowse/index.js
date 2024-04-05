import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import './styles.css';
import BrowseLink from '../BrowseLink';
import { Icon } from '../../../reusable';

function findCallNumberBrowse (metadata) {
  const callNumber = metadata.find((item) => {
    return item.term === 'Call Number';
  });

  if (!callNumber) return null;

  const browse = callNumber.description.find((description) => {
    return Object.keys(description).includes('browse');
  });

  return browse?.browse;
}

function ShelfBrowse () {
  const { full } = useSelector((state) => {
    return state.records.record.metadata;
  });

  const callNumberBrowse = findCallNumberBrowse(full);
  console.log(callNumberBrowse);
  const items = Array(22).fill('item');
  const itemsPerPage = 5;
  const maxPages = Math.ceil(items.length / itemsPerPage);
  // Calculate the middle starting page
  const [currentPage, setCurrentPage] = useState(Math.floor(maxPages / 2));

  if (!callNumberBrowse) return null;

  const moveCarousel = (direction) => {
    setCurrentPage((prevPage) => {
      let newPage = prevPage + direction;
      if (newPage < 0) {
        newPage = maxPages - 1;
      }
      if (newPage >= maxPages) {
        newPage = 0;
      }
      return newPage;
    });
  };

  // Calculate item index range for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Subset of items to display on the current page
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <section className='shelf-browse container__rounded'>
      <header>
        <h2>Shelf browse</h2>
        <BrowseLink
          type={callNumberBrowse.type}
          value={callNumberBrowse.value}
        >
          {callNumberBrowse.text}
        </BrowseLink>
      </header>
      <div className='shelf-browse-carousel' aria-label='Carousel component' tabIndex='0'>
        <button
          aria-label='Previous items'
          onClick={() => {
            return moveCarousel(-1);
          }}
        >
          <Icon icon='expand_more' /> Previous
        </button>
        <ul>
          {currentItems.map((item, index) => {
            return (
              <li key={index}>
                {item} {index}
              </li>
            );
          })}
        </ul>
        <button
          aria-label='Next items'
          onClick={() => {
            return moveCarousel(1);
          }}
        >
          Next <Icon icon='expand_less' />
        </button>
      </div>
    </section>
  );
}

export default ShelfBrowse;

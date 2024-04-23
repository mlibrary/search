import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import './styles.css';
import BrowseLink from '../BrowseLink';
import { Icon } from '../../../reusable';
import relatedItems from './test-data';

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

const getMetadata = (items) => {
  return items.reduce((obj, item) => {
    if (item?.uid) {
      obj[item.uid] = item;
    }
    return obj;
  }, {});
};

function ShelfBrowse () {
  const { uid, metadata } = useSelector((state) => {
    return state.records.record;
  });
  const callNumberBrowse = findCallNumberBrowse(metadata.full);
  const items = relatedItems;
  const itemsPerPage = 5;
  const maxPages = Math.ceil(items.length / itemsPerPage);
  // Calculate the middle starting page
  const middlePage = Math.floor(maxPages / 2);
  const [currentPage, setCurrentPage] = useState(middlePage);

  if (!callNumberBrowse) return null;

  const { type, value, text } = callNumberBrowse;

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
      <header className='flex__responsive'>
        <h2 className='margin-y__none'>Shelf browse</h2>
        <BrowseLink
          type={type}
          value={value}
        >
          {text}
        </BrowseLink>
      </header>
      <div className='shelf-browse-carousel' aria-label='Shelf browse carousel'>
        <button
          className='btn no-background'
          aria-label='Previous items'
          onClick={() => {
            return moveCarousel(-1);
          }}
        >
          <Icon icon='chevron_left' size='24' />
        </button>
        <ul className='list__unstyled flex self-browse-items'>
          {currentItems.map((item, index) => {
            const metadata = getMetadata(item);
            const { id } = metadata;
            return (
              <li key={index} className='self-browse-items'>
                <a href=''>
                  {id.value === uid && <p>CURRENT</p>}
                  <dl className='container__rounded'>
                    {['title', 'author', 'published_year', 'callnumber_browse'].map((key) => {
                      console.log(metadata[key]);
                      return (
                        <React.Fragment key={key}>
                          <dt className='visually-hidden'>{metadata[key].name}</dt>
                          <dd>{metadata[key].value}</dd>
                        </React.Fragment>
                      );
                    })}
                  </dl>
                </a>
              </li>
            );
          })}
        </ul>
        <button
          className='btn no-background'
          aria-label='Next items'
          onClick={() => {
            return moveCarousel(1);
          }}
        >
          <Icon icon='chevron_right' size='24' />
        </button>
      </div>
      <button
        className='btn btn--secondary shelf-browse-carousel-return'
        onClick={() => {
          return setCurrentPage(middlePage);
        }}
      >
        Return to current item
      </button>
    </section>
  );
}

export default ShelfBrowse;

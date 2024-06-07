import './styles.css';
import { Icon, useWindowWidth } from '../../../reusable';
import React, { useEffect, useState } from 'react';
import BrowseLink from '../BrowseLink';
import PropTypes from 'prop-types';
import relatedItems from './test-data';

const ShelfBrowseCarousel = ({ callNumber, items = relatedItems }) => {
  const callNumberIndex = items.findIndex((item) => {
    return item.call_number === callNumber;
  });
  const windowWidth = useWindowWidth();
  let itemsPerPage = 5;
  if (windowWidth < 820) {
    itemsPerPage = 3;
  }
  if (windowWidth < 640) {
    itemsPerPage = 1;
  }
  const middlePage = Math.floor(callNumberIndex / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(middlePage);
  const [animationClass, setAnimationClass] = useState('');
  const animationDuration = 250;
  const debounce = (func) => {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, animationDuration);
    };
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setCurrentPage(middlePage);
    });

    window.addEventListener('resize', handleResize);

    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, [middlePage]);

  const maxPages = Math.ceil(items.length / itemsPerPage);

  const moveCarousel = (direction) => {
    const getDirection = direction === 1 ? 'next' : 'previous';
    setAnimationClass(`animation-out-${getDirection}`);
    setTimeout(() => {
      setAnimationClass(`animation-in-${getDirection}`);
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
    }, animationDuration);
    setTimeout(() => {
      setAnimationClass('');
    }, animationDuration * 2);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const firstPage = currentPage === 0;
  const lastPage = currentPage === maxPages - 1;
  const buttonLabel = `${itemsPerPage} item${itemsPerPage === 1 ? '' : 's'}`;

  return (
    <section className='shelf-browse container__rounded'>
      <header className='flex__responsive'>
        <h2 className='margin-y__none heading-medium'>Shelf browse</h2>
        <BrowseLink value={callNumber}>
          <Icon icon='list' size='24' className='margin-right__xs' />Browse in call number list
        </BrowseLink>
      </header>
      <div className='shelf-browse-carousel' aria-label='Shelf browse carousel'>
        <button
          aria-label={`Previous ${buttonLabel}`}
          title={`Previous ${buttonLabel}`}
          disabled={firstPage}
          onClick={() => {
            return moveCarousel(-1);
          }}
          className='btn no-background'
        >
          <Icon icon='chevron_left' size='24' />
        </button>
        <ul
          className='list__unstyled shelf-browse-items'
          style={{
            gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`
          }}
        >
          {currentItems.map((item, index) => {
            const currentItem = item.call_number === callNumber;
            const firstOrLastItem = !currentItem && ((firstPage && index === 0) || (lastPage && currentItems.length - 1 === index));
            const fields = ['title', 'author', 'date', 'call_number'];
            const showFields = firstOrLastItem ? [fields.pop()] : fields;
            return (
              <li key={index} className={`shelf-browse-item ${(currentItem || firstOrLastItem) ? 'shelf-browse-item-current' : ''} ${animationClass}`}>
                <BrowseLink
                  value={item.call_number}
                  className={`underline__none container__rounded padding-x__s padding-bottom__xs padding-top__${currentItem ? 'xs' : 's'}`}
                >
                  <dl className='flex'>
                    {currentItem && <p className='margin__none this-item'>Current Record</p>}
                    {firstOrLastItem && (
                      <>
                        <Icon icon='list' size='24' className='item-term-title' />
                        <span className='item-term-title'>Continue browsing in call number list</span>
                      </>
                    )}
                    {showFields.map((key) => {
                      return item[key] && (
                        <React.Fragment key={key}>
                          <dt className='visually-hidden'>{key.replaceAll('_', ' ')}</dt>
                          <dd className={`item-term-${key}`}>{item[key]}</dd>
                        </React.Fragment>
                      );
                    })}
                  </dl>
                </BrowseLink>
              </li>
            );
          })}
        </ul>
        <button
          aria-label={`Next ${buttonLabel}`}
          title={`Next ${buttonLabel}`}
          disabled={lastPage}
          onClick={() => {
            return moveCarousel(1);
          }}
          className='btn no-background'
        >
          <Icon icon='chevron_right' size='24' />
        </button>
      </div>
      <button
        className='btn btn--secondary btn--small shelf-browse-carousel-return'
        onClick={() => {
          setAnimationClass('animation-out');
          setTimeout(() => {
            setCurrentPage(middlePage);
            setAnimationClass('animation-in');
          }, animationDuration);
          setTimeout(() => {
            setAnimationClass('');
          }, animationDuration * 2);
        }}
        disabled={currentPage === middlePage}
      >
        Return to current item
      </button>
    </section>
  );
};

ShelfBrowseCarousel.propTypes = {
  callNumber: PropTypes.string,
  items: PropTypes.array
};

export default ShelfBrowseCarousel;

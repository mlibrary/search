import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import './styles.css';
import BrowseLink from '../BrowseLink';
import { Icon, useWindowWidth } from '../../../reusable';
import relatedItems from './test-data';

function findObjectWithValue (items, valueToMatch) {
  for (let index = 0; index < items.length; index++) {
    for (let i = 0; i < items[index].length; i++) {
      const item = items[index][i];
      if (item.uid === 'id' && item.value === valueToMatch) {
        return index;
      }
    }
  }
  return 'null';
}

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
  const items = relatedItems;
  const windowWidth = useWindowWidth();
  let itemsPerPage = 5;
  if (windowWidth < 820) {
    itemsPerPage = 3;
  }
  if (windowWidth < 640) {
    itemsPerPage = 1;
  }
  const middlePage = Math.floor(findObjectWithValue(items, uid) / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(middlePage);
  const [animationClass, setAnimationClass] = useState('');
  const animationDuration = 250;
  const debounce = (func) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
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
  const callNumberBrowse = findCallNumberBrowse(metadata.full);

  if (!callNumberBrowse) return null;

  const { type, value, text } = callNumberBrowse;
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

  return (
    <section className='shelf-browse container__rounded'>
      <header className='flex__responsive'>
        <h2 className='margin-y__none heading-medium'>Shelf browse</h2>
        <BrowseLink
          type={type}
          value={value}
        >
          <Icon icon='list' size='24' className='margin-right__xs' />{text}
        </BrowseLink>
      </header>
      <div className='shelf-browse-carousel' aria-label='Shelf browse carousel'>
        <button
          aria-label={`Previous ${itemsPerPage} items`}
          title={`Previous ${itemsPerPage} items`}
          disabled={firstPage}
          onClick={() => {
            return moveCarousel(-1);
          }}
          className='btn no-background'
        >
          <Icon icon='chevron_left' size='24' />
        </button>
        <ul
          className={`list__unstyled shelf-browse-items ${firstPage ? 'shelf-browse-first-page' : lastPage ? 'shelf-browse-last-page' : ''}`}
          style={{
            gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`
          }}
        >
          {currentItems.map((item, index) => {
            const metadata = getMetadata(item);
            const currentItem = metadata.id.value === uid;
            const firstOrLastItem = !currentItem && ((firstPage && index === 0) || (lastPage && currentItems.length - 1 === index));
            const fields = ['title', 'author', 'published_year', 'callnumber_browse'];
            const showFields = firstOrLastItem ? [fields.pop()] : fields;
            return (
              <li key={index} className={`shelf-browse-item ${(currentItem || firstOrLastItem) ? 'shelf-browse-item-current' : ''} ${animationClass}`}>
                <BrowseLink
                  type={type}
                  value={metadata.callnumber_browse?.value?.[0]}
                  className={`underline__none container__rounded padding-x__s padding-bottom__xs padding-top__${currentItem ? 'xs' : 's'}`}
                >
                  <dl className='flex'>
                    {currentItem && <p className='margin__none this-item'>Current Record</p>}
                    {firstOrLastItem && (
                      <>
                        <Icon icon='list' size='24' className='item-term-title' />
                        <span className='item-term-title'>Continue browsing in {type} list</span>
                      </>
                    )}
                    {showFields.map((key) => {
                      return metadata[key]?.value?.[0] && (
                        <React.Fragment key={key}>
                          <dt className='visually-hidden'>{metadata[key].name}</dt>
                          <dd className={`item-term-${key}`}>{metadata[key].value[0]}</dd>
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
          aria-label={`Next ${itemsPerPage} items`}
          title={`Next ${itemsPerPage} items`}
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
}

export default ShelfBrowse;

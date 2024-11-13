import './styles.css';
import { Anchor, Icon, ImagePlaceholder } from '../../../reusable';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const bookCover = (item) => {
  let url = 'https://www.syndetics.com/index.php?client=umichaa&pagename=lc.jpg';
  ['isbn', 'issn', 'oclc'].forEach((parameter) => {
    if (item[parameter]) {
      url += `&${parameter}=${item[parameter]}`;
    }
  });
  return url;
};

const ShelfBrowseCarousel = ({ callNumber, items, itemsPerPage, setButtonAction, setDisableButton, uid }) => {
  const currentItem = (item) => {
    return item.call_number === callNumber && item.url.endsWith(uid);
  };
  const callNumberIndex = items.findIndex((item) => {
    return currentItem(item);
  });
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

  useEffect(() => {
    setButtonAction((prevState) => {
      return {
        ...prevState,
        currentRecord: () => {
          setAnimationClass('animation-out');
          setTimeout(() => {
            setCurrentPage(middlePage);
            setAnimationClass('animation-in');
          }, animationDuration);
          setTimeout(() => {
            setAnimationClass('');
          }, animationDuration * 2);
        },
        nextRecords: () => {
          return moveCarousel(1);
        },
        previousRecords: () => {
          return moveCarousel(-1);
        }
      };
    });
  }, [setButtonAction]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const firstPage = currentPage === 0;
  const lastPage = currentPage === maxPages - 1;

  useEffect(() => {
    setDisableButton((prevState) => {
      return {
        ...prevState,
        currentRecord: currentPage === middlePage,
        nextRecords: lastPage,
        previousRecords: firstPage
      };
    });
  }, [currentPage, firstPage, lastPage, setDisableButton]);

  return (
    <>
      {currentItems.map((item, index) => {
        const isCurrentItem = currentItem(item);
        const firstOrLastItem = !isCurrentItem && ((firstPage && index === 0) || (lastPage && currentItems.length - 1 === index));
        const fields = firstOrLastItem ? ['call_number'] : ['title', 'author', 'date', 'call_number'];
        const basePath = 'https://search.lib.umich.edu';
        const anchorAttributes = firstOrLastItem
          ? { href: `${basePath}/catalog/browse/callnumber?query=${item.call_number}` }
          : { to: item.url.replace(basePath, '') + window.location.search };
        const trueIndex = (currentPage * currentItems.length) + index;

        return (
          <li key={trueIndex} className={`shelf-browse-item ${(isCurrentItem || firstOrLastItem) ? 'shelf-browse-item-current' : ''} ${animationClass}`}>
            <Anchor
              {...anchorAttributes}
              className={`focus underline__none container__rounded padding-x__s padding-bottom__xs padding-top__${isCurrentItem ? 'xs' : 's'}`}
            >
              {isCurrentItem && <p className='margin-top__none this-item'>Current Record</p>}
              <dl className='flex'>
                {firstOrLastItem && (
                  <>
                    <Icon icon='list' size='24' className='item-term-title' />
                    <span className='item-term-title'>Continue browsing in call number list</span>
                  </>
                )}
                {!firstOrLastItem && (
                  <>
                    <dt className='visually-hidden'>Book cover</dt>
                    <dd className='item-term-book_cover'>
                      <ImagePlaceholder {...{
                        index: trueIndex,
                        src: bookCover(item)
                      }}
                      />
                    </dd>
                  </>
                )}
                {fields.map((key) => {
                  return item[key] && (
                    <React.Fragment key={key}>
                      <dt className='visually-hidden'>{key.replaceAll('_', ' ')}</dt>
                      <dd className={`item-term-${key}`}>{item[key]}</dd>
                    </React.Fragment>
                  );
                })}
              </dl>
            </Anchor>
          </li>
        );
      })}
    </>
  );
};

ShelfBrowseCarousel.propTypes = {
  callNumber: PropTypes.string,
  items: PropTypes.array,
  itemsPerPage: PropTypes.number,
  setButtonAction: PropTypes.func,
  setDisableButton: PropTypes.func,
  uid: PropTypes.string
};

export default ShelfBrowseCarousel;

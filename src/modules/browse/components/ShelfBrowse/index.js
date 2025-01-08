import './styles.css';
import { Icon, useWindowWidth } from '../../../reusable';
import React, { useCallback, useEffect, useState } from 'react';
import BrowseLink from '../BrowseLink';
import ShelfBrowseCarousel from '../ShelfBrowseCarousel';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE_BREAKPOINTS = [
  { items: 3, width: 820 },
  { items: 1, width: 640 }
];

const ShelfBrowse = () => {
  const [shelfData, setShelfData] = useState();
  const [disableButton, setDisableButton] = useState({
    currentRecord: true,
    nextRecords: true,
    previousRecords: true
  });
  const [buttonAction, setButtonAction] = useState({
    currentRecord: null,
    nextRecords: null,
    previousRecords: null
  });
  const { metadata, uid } = useSelector((state) => {
    return state.records.record;
  });

  const callNumberBrowse = metadata.full
    .flatMap((data) => {
      return data.description;
    })
    .find((callNumber) => {
      return callNumber.browse?.type === 'callnumber';
    });

  if (!callNumberBrowse) {
    return null;
  }

  const windowWidth = useWindowWidth();
  const itemsPerPage = ITEMS_PER_PAGE_BREAKPOINTS.reduce(
    (acc, breakpoint) => {
      return (windowWidth < breakpoint.width ? breakpoint.items : acc);
    },
    5
  );

  const callNumber = callNumberBrowse.browse.value.trim();

  const fetchShelfData = useCallback(async () => {
    setShelfData('loading');
    try {
      // `https://browse.workshop.search.lib.umich.edu/carousel?query=${callNumber}`
      const response = await fetch(`https://search.lib.umich.edu/catalog/browse/carousel?query=${callNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      const data = await response.json();
      setShelfData(data);
    } catch {
      setShelfData();
    }
  }, [callNumber]);

  useEffect(() => {
    fetchShelfData();
  }, [fetchShelfData]);

  if (!shelfData) {
    return null;
  }

  const loadingItems = new Array(itemsPerPage).fill(null);
  const buttonPrevNext = (direction = 'Previous') => {
    const label = `${direction} ${itemsPerPage} record${itemsPerPage === 1 ? '' : 's'}`;

    return (
      <button
        title={label}
        disabled={disableButton[`${direction.toLowerCase()}Records`]}
        onClick={buttonAction[`${direction.toLowerCase()}Records`]}
        className='btn no-background'
      >
        <Icon icon={`chevron_${direction === 'Previous' ? 'left' : 'right'}`} size='24' />
        <span className='visually-hidden'>{label}</span>
      </button>
    );
  };

  return (
    <section className='shelf-browse container__rounded'>
      <header className='flex__responsive'>
        <h2 className='margin-y__none heading-medium'>Shelf browse</h2>
        <BrowseLink value={callNumber}>
          <Icon icon='list' size='24' className='margin-right__xs' />Browse in call number list
        </BrowseLink>
      </header>
      <div className='shelf-browse-carousel'>
        {buttonPrevNext()}
        <ul
          className='list__unstyled shelf-browse-items'
          style={{
            gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`
          }}
        >
          {shelfData === 'loading'
            ? loadingItems.map((element, index) => {
                return (
                  <li key={index} className='shelf-browse-item'>
                    <div className='container__rounded padding-x__s padding-bottom__xs padding-top__s'>
                      <div className='placeholder-item-title'>
                        <div className='placeholder placeholder-title margin-bottom__none' />
                        <div className='placeholder placeholder-title margin-bottom__none margin-top__2xs' />
                        <div className='placeholder placeholder-title margin-bottom__none margin-top__2xs' />
                      </div>
                      <div className='placeholder-item-line'>
                        <div className='placeholder placeholder-line margin-bottom__none margin-top__s' />
                        <div className='placeholder placeholder-line margin-bottom__none margin-top__s' />
                        <div className='placeholder placeholder-line placeholder-line-alt margin-top__s' />
                      </div>
                    </div>
                  </li>
                );
              })
            : (
                <ShelfBrowseCarousel {...{
                  callNumber,
                  items: shelfData,
                  itemsPerPage,
                  setButtonAction,
                  setDisableButton,
                  uid
                }}
                />
              )}
        </ul>
        {buttonPrevNext('Next')}
      </div>
      <button
        className='btn btn--secondary btn--small shelf-browse-carousel-return'
        onClick={buttonAction.currentRecord}
        disabled={disableButton.currentRecord}
      >
        Return to current record
      </button>
    </section>
  );
};

export default ShelfBrowse;

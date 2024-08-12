import './styles.css';
import { Icon, useWindowWidth } from '../../../reusable';
import React, { useEffect, useState } from 'react';
import BrowseLink from '../BrowseLink';
import ShelfBrowseCarousel from '../ShelfBrowseCarousel';
import { useSelector } from 'react-redux';

const ShelfBrowse = () => {
  const [shelfData, setShelfData] = useState();
  const [disableButton, setDisableButton] = useState({
    currentRecord: true,
    nextRecords: true,
    previousRecords: true
  });
  const [buttonAction, setButtonAction] = useState({
    currentRecord () {
      //
    },
    nextRecords () {
      //
    },
    previousRecords () {
      //
    }
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
  let itemsPerPage = 5;
  if (windowWidth < 820) {
    itemsPerPage = 3;
  }
  if (windowWidth < 640) {
    itemsPerPage = 1;
  }

  const callNumber = callNumberBrowse.browse.value.trim();

  useEffect(() => {
    const fetchShelfData = async () => {
      setShelfData('loading');
      try {
        const response = await fetch(`https://search.lib.umich.edu/catalog/browse/carousel?query=${callNumber}`);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setShelfData(data);
      } catch {
        setShelfData();
      }
    };

    fetchShelfData();
  }, [callNumber]);

  if (!shelfData) {
    return null;
  }

  const loadingItems = new Array(itemsPerPage).fill(null);
  const buttonLabel = `${itemsPerPage} record${itemsPerPage === 1 ? '' : 's'}`;

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
          disabled={disableButton.previousRecords}
          onClick={buttonAction.previousRecords}
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
        <button
          aria-label={`Next ${buttonLabel}`}
          title={`Next ${buttonLabel}`}
          disabled={disableButton.nextRecords}
          onClick={buttonAction.nextRecords}
          className='btn no-background'
        >
          <Icon icon='chevron_right' size='24' />
        </button>
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

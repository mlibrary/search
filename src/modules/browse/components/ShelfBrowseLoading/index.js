import './styles.css';
import { Icon, useWindowWidth } from '../../../reusable';
import BrowseLink from '../BrowseLink';
import PropTypes from 'prop-types';
import React from 'react';

const ShelfBrowseLoading = ({ callNumber }) => {
  const windowWidth = useWindowWidth();
  let itemsPerPage = 5;
  if (windowWidth < 820) {
    itemsPerPage = 3;
  }
  if (windowWidth < 640) {
    itemsPerPage = 1;
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
          disabled
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
          {loadingItems.map((element, index) => {
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
          })}
        </ul>
        <button
          aria-label={`Next ${buttonLabel}`}
          title={`Next ${buttonLabel}`}
          disabled
          className='btn no-background'
        >
          <Icon icon='chevron_right' size='24' />
        </button>
      </div>
      <button
        className='btn btn--secondary btn--small shelf-browse-carousel-return'
        disabled
      >
        Return to current record
      </button>
    </section>
  );
};

ShelfBrowseLoading.propTypes = {
  callNumber: PropTypes.string
};

export default ShelfBrowseLoading;

import './styles.css';
import { BentoboxList, Pagination, RecordList } from '../../index';
import React, { useEffect, useState } from 'react';
import { BrowseInfo } from '../../../browse';
import { Filters } from '../../../filters';
import { Icon } from '../../../reusable';
import { InstitutionSelect } from '../../../institution';
import PropTypes from 'prop-types';

const Results = ({ activeDatastore, activeFilterCount, institution }) => {
  const [isVisible, setIsDivVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 980 && !isVisible) {
      setIsDivVisible(true);
    }
  }, [windowWidth, isVisible]);

  if (activeDatastore.isMultisearch) {
    return (
      <div className='container container-large flex-container'>
        <BentoboxList />
      </div>
    );
  }

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className='container container-medium flex-container margin-top__s'>
      <div className='side-container'>
        <h2 className='visually-hidden'>{activeDatastore.name} Filter Options</h2>
        {windowWidth < 980 && (
          <button
            onClick={() => {
              return setIsDivVisible(!isVisible);
            }}
            aria-expanded={isVisible}
            aria-controls='filter-details'
            className={`flex small-screen-filter-summary ${hasActiveFilters ? 'small-screen-filter-summary--active-filters' : ''}`}
          >
            <Icon icon={`expand_${isVisible ? 'less' : 'more'}`} />
            <span>
              Filters {hasActiveFilters && `(${activeFilterCount})`}
            </span>
          </button>
        )}
        {(isVisible || windowWidth >= 980) && (
          <div id='filter-details'>
            <InstitutionSelect activeDatastore={activeDatastore} institution={institution} />
            <Filters />
            <BrowseInfo datastore={activeDatastore} />
          </div>
        )}
      </div>
      <div className='results-container'>
        <h2 className='visually-hidden'>{activeDatastore.name} Results</h2>
        <RecordList />
        <Pagination />
      </div>
    </div>
  );
};

Results.propTypes = {
  activeDatastore: PropTypes.object,
  activeFilterCount: PropTypes.number,
  institution: PropTypes.object
};

export default Results;

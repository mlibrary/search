import './styles.css';
import { BentoboxList, Pagination, RecordList } from '../../index';
import { H1, Icon, useWindowWidth } from '../../../reusable';
import React, { useEffect, useState } from 'react';
import { BrowseInfo } from '../../../browse';
import { DatastoreInfoContainer } from '../../../datastores';
import { Filters } from '../../../filters';
import { InstitutionSelect } from '../../../institution';
import PropTypes from 'prop-types';

const Results = ({ activeDatastore, activeFilterCount }) => {
  const [isVisible, setIsDivVisible] = useState(true);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth >= 980 && !isVisible) {
      setIsDivVisible(true);
    }
  }, [windowWidth, isVisible]);

  const { isMultisearch, name, uid } = activeDatastore;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <>
      <H1 className='visually-hidden'>{name}</H1>
      <DatastoreInfoContainer {...{ name, uid }} />
      <div className={`container flex-container container-${isMultisearch ? 'large' : 'medium margin-top__s'}`}>
        { isMultisearch
          ? (
              <BentoboxList />
            )
          : (
              <>
                <div className='side-container'>
                  <h2 className='visually-hidden'>{name} Filter Options</h2>
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
                      <InstitutionSelect {...{ activeDatastore }} />
                      <Filters />
                      <BrowseInfo {...{ datastore: activeDatastore }} />
                    </div>
                  )}
                </div>
                <div className='results-container'>
                  <h2 className='visually-hidden'>{name} Results</h2>
                  <RecordList />
                  <Pagination />
                </div>
              </>
            )}
      </div>
    </>
  );
};

Results.propTypes = {
  activeDatastore: PropTypes.object,
  activeFilterCount: PropTypes.number
};

export default Results;

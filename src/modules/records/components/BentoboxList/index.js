import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { Icon } from '../../../core';
import { getMultiSearchRecords } from '../../../pride';
import RecordPreview from '../RecordPreview';
import RecordPreviewPlaceholder from '../RecordPreviewPlaceholder';
import KeywordSwitch from '../KeywordSwitch';
import { SpecialistsWrapper } from '../../../specialists';
import PropTypes from 'prop-types';

class BentoboxList extends React.Component {
  render () {
    const { allRecords, datastoreUid, search, searchQuery, institution } = this.props;
    const bentoboxListRecords = getMultiSearchRecords(datastoreUid, allRecords);

    return (
      <article className='bentobox-list' id='search-results maincontent' tabIndex='-1'>
        <SpecialistsWrapper show={2}>
          {bentoboxListRecords.map((bentobox) => {
            if (!bentobox.records) {
              return null;
            }

            return (
              <section key={bentobox.uid} className={`bentobox bentobox-${bentobox.uid}`}>
                <div className='bentobox-inner-container'>
                  <BentoHeading
                    bentobox={bentobox}
                    search={search}
                    searchQuery={searchQuery}
                  />
                  <BentoResults
                    search={search}
                    bentobox={bentobox}
                    searchQuery={searchQuery}
                    institution={institution}
                    datastoreUid={datastoreUid}
                  />
                  <BentoFooter
                    bentobox={bentobox}
                    search={search}
                    searchQuery={searchQuery}
                  />
                </div>
              </section>
            );
          })}
        </SpecialistsWrapper>
      </article>
    );
  }
}

BentoboxList.propTypes = {
  allRecords: PropTypes.object,
  datastoreUid: PropTypes.string,
  search: PropTypes.object,
  searchQuery: PropTypes.string,
  institution: PropTypes.object
};

const BentoHeading = ({
  bentobox,
  search,
  searchQuery
}) => {
  const totalResults = search.data[bentobox.uid].totalAvailable;
  const url = `/${bentobox.slug}${searchQuery}`;

  return (
    <Link
      className='bentobox-heading-container'
      to={url}
    >
      <h2 className='bentobox-heading'>{bentobox.name}</h2>
      <BentoboxResultsNum bentobox={bentobox} search={search} totalResults={totalResults} />
    </Link>
  );
};

BentoHeading.propTypes = {
  bentobox: PropTypes.object,
  search: PropTypes.object,
  searchQuery: PropTypes.string
};

const BentoFooter = ({
  bentobox,
  search,
  searchQuery
}) => {
  const url = `/${bentobox.slug}${searchQuery}`;
  const footerText = `View all ${bentobox.name} results`;

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return null;
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return null;
  }

  return (
    <Link
      className='bentobox-footer-container'
      to={url}
    >
      <span>{footerText}</span><Icon name='arrow-forward' />
    </Link>
  );
};

BentoFooter.propTypes = {
  bentobox: PropTypes.object,
  search: PropTypes.object,
  searchQuery: PropTypes.string
};

const BentoboxNoResults = ({ bentobox }) => {
  const hasBrowse = !!((bentobox.uid === 'databases' || bentobox.uid === 'onlinejournals'));

  return (
    <div className='bentobox-no-results'>
      <p className='no-margin'><b>No results</b> match your search.</p>

      {hasBrowse && (
        <p className='u-margin-bottom-none'>Try our <Link to={`/${bentobox.slug}/browse`}>Browse {bentobox.name} page</Link> to view all titles alphabetically or by academic discipline.</p>
      )}
    </div>
  );
};

BentoboxNoResults.propTypes = {
  bentobox: PropTypes.object
};

const BentoboxResultsNum = ({ bentobox, search, totalResults }) => {
  const resultsNum = numeral(totalResults).format(0, 0);
  const resultsText = resultsNum === 1 ? 'Result' : 'Results';

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return <span className='bentobox-results-info'>{resultsNum} {resultsText}</span>;
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return <span className='bentobox-results-info'>Loading...</span>;
  }

  // Results have loaded
  return <span className='bentobox-results-info'>{resultsNum} {resultsText}</span>;
};

BentoboxResultsNum.propTypes = {
  bentobox: PropTypes.object,
  search: PropTypes.object,
  totalResults: PropTypes.number
};

const BentoResults = ({ search, bentobox, searchQuery, institution }) => {
  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    if (bentobox.uid === 'primo') {
      return (
        <KeywordSwitch datastore={bentobox} query={search.query} />
      );
    }
    return (
      <BentoboxNoResults bentobox={bentobox} />
    );
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return (
      <div className='results-list results-list-border'>
        {[...Array(3)].map((elementInArray, index) => {
          return <RecordPreviewPlaceholder key={index} />;
        })}
      </div>
    );
  }

  // Results
  return (
    <div className='results-list results-list-border'>
      {bentobox.records.map((record, index) => {
        if (index === 0) {
          return (
            <div key={index + 'keyword-switch'}>
              <KeywordSwitch datastore={bentobox} query={search.query} />
              <RecordPreview
                key={index}
                datastoreUid={bentobox.uid}
                record={record}
                searchQuery={searchQuery}
              />
            </div>
          );
        }
        return (
          <RecordPreview
            key={index}
            datastoreUid={bentobox.uid}
            record={record}
            searchQuery={searchQuery}
          />
        );
      })}
    </div>
  );
};

BentoResults.propTypes = {
  bentobox: PropTypes.object,
  search: PropTypes.object,
  searchQuery: PropTypes.string,
  institution: PropTypes.object
};

function mapStateToProps (state) {
  return {
    allRecords: state.records.records,
    datastoreUid: state.datastores.active,
    search: state.search,
    searchQuery: state.router.location.search,
    institution: state.institution
  };
}

export default connect(mapStateToProps)(BentoboxList);

import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import qs from 'qs'

import { getMultiSearchRecords } from '../../../pride';
import Record from '../Record';
import RecordPlaceholder from '../RecordPlaceholder';

class BentoboxList extends React.Component {
  render() {
    const { allRecords, datastoreUid, search, activeFilters } = this.props;
    const bentoboxListRecords = getMultiSearchRecords(datastoreUid, allRecords);

    return (
      <ul className="bentobox-list">
        {bentoboxListRecords.map(bentobox => {
          if (!bentobox.records) {
            return null
          }

          if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
            return (
              <li key={bentobox.uid} className="bentobox">
                <BentoboxHeading
                  bentobox={bentobox}
                  search={search}
                  activeFilters={activeFilters[bentobox.uid]}/>
                <ul className="results-list results-list-border">
                  <li className="record">
                    <div className="record-container">
                      <p className="no-margin"><b>No results</b> found for your search.</p>
                    </div>
                  </li>
                </ul>
              </li>
            )
          }

          if (bentobox.records.length === 0) {
            return (
              <li key={bentobox.uid} className="bentobox">
                <BentoboxHeading
                  bentobox={bentobox}
                  search={search}
                  activeFilters={activeFilters[bentobox.uid]}/>
                <ul className="results-list results-list-border">
                  <RecordPlaceholder />
                  <RecordPlaceholder />
                  <RecordPlaceholder />
                </ul>
              </li>
            )
          }

          if (bentobox.records.length === 0) {
            return (
              <li key={bentobox.uid} className="bentobox">
              <BentoboxHeading
                bentobox={bentobox}
                search={search}
                activeFilters={activeFilters[bentobox.uid]}/>
                <ul className="results-list results-list-border">
                  <RecordPlaceholder />
                  <RecordPlaceholder />
                  <RecordPlaceholder />
                </ul>
              </li>
            )
          }

          return (
            <li key={bentobox.uid} className="bentobox">
              <BentoboxHeading
                bentobox={bentobox}
                search={search}
                activeFilters={activeFilters[bentobox.uid]}/>
              <ul className="results-list results-list-border">
                {bentobox.records.map((record, index) => {
                  return (
                    <Record
                      key={index}
                      datastoreUid={bentobox.uid}
                      record={record}
                      loading={record.loadingHoldings}
                      type='preview'
                    />
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
}

const BentoboxHeading = ({
  bentobox,
  search,
  activeFilters
}) => {
  const totalResults = search.data[bentobox.uid].totalAvailable;
  const queryString = qs.stringify({
    query: search.query,
    filter: activeFilters
  }, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format : 'RFC1738'
  })
  let url = '/'

  if (queryString.length > 0) {
    url = `/${bentobox.slug}?${queryString}`
  } else {
    url = `/${bentobox.slug}`
  }

  return (
    <Link className="bentobox-heading-container" to={url}>
      <h2 className="bentobox-heading">{ bentobox.name }</h2>
      <BentoboxResultsNum totalResults={totalResults}/>
    </Link>
  )
}

const BentoboxResultsNum = ({ totalResults }) => {

  if (!totalResults) {
    return null;
  }

  const resultsNum = numeral(totalResults).format(0,0)
  const resultsText = resultsNum === 1 ? `Result` : `Results`

  return <span className="underline">{resultsNum} {resultsText}</span>
}

function mapStateToProps(state) {
  return {
    allRecords: state.records.records,
    datastoreUid: state.datastores.active,
    activeFilters: state.filters.active,
    search: state.search,
  };
}

export default connect(mapStateToProps)(BentoboxList);

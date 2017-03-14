import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import { Link } from 'react-router';
import numeral from 'numeral';

import { getMultiSearchRecords } from '../../../../pride-interface';
import RecordPreview from '../RecordPreview';
import RecordPlaceholder from '../RecordPlaceholder';
import { createSearchParams } from '../../../../router';

class BentoboxList extends React.Component {
  render() {
    const { allRecords, datastoreUid, search } = this.props;
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
                <BentoboxHeading bentobox={bentobox} search={search} />
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
                <BentoboxHeading bentobox={bentobox} search={search} />
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
                <BentoboxHeading bentobox={bentobox} search={search} />
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
              <BentoboxHeading bentobox={bentobox} search={search} />
              <ul className="results-list results-list-border">
                {bentobox.records.map((record, index) => {
                  return (
                    <RecordPreview key={index} datastoreUid={bentobox.uid} record={record} loading={record.loadingHoldings}/>
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

const BentoboxHeading = ({ bentobox, search }) => {
  const totalResults = search.data[bentobox.uid].totalAvailable;
  const searchParams = createSearchParams({
    query: search.query
  })
  const link = `${bentobox.slug}${searchParams}`;

  return (
    <Link className="bentobox-heading-container" to={`/${link}`}>
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
    search: state.search,
  };
}

export default connect(mapStateToProps)(BentoboxList);

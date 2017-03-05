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
    const { allRecords, activeDatastore, search } = this.props;
    const bentoboxListRecords = getMultiSearchRecords(activeDatastore, allRecords);
    
    return (
      <ul className="bentobox-list">
        {bentoboxListRecords.map(bentobox => {
          if (!bentobox.records) {
            return null
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
                    <RecordPreview key={index} activeDatastore={bentobox.uid} record={record} loading={record.loading_holdings}/>
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
  const total_results = search.data[bentobox.uid].total_available;
  const searchParams = createSearchParams({
    query: search.query
  })
  const link = `${bentobox.slug}${searchParams}`;

  return (
    <Link className="bentobox-heading-container" to={`/${link}`}>
      <h2 className="bentobox-heading">{ bentobox.name }</h2>
      <BentoboxResultsNum total_results={total_results}/>
    </Link>
  )
}

const BentoboxResultsNum = ({ total_results }) => {
  if (!total_results) {
    return null;
  }

  const results_num = numeral(total_results).format(0,0)
  const results_text = results_num === 1 ? `Result` : `Results`

  return <span className="underline">{results_num} {results_text}</span>
}

function mapStateToProps(state) {
  return {
    allRecords: state.records.records,
    activeDatastore: state.datastores.active,
    search: state.search,
  };
}

export default connect(mapStateToProps)(BentoboxList);

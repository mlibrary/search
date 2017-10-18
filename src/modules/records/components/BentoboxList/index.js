import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import { getMultiSearchRecords } from '../../../pride'
import Record from '../Record'
import RecordPlaceholder from '../RecordPlaceholder'

class BentoboxList extends React.Component {
  render() {
    const { allRecords, datastoreUid, search, searchQuery } = this.props
    const bentoboxListRecords = getMultiSearchRecords(datastoreUid, allRecords)

    return (
      <ul className="bentobox-list">
        {bentoboxListRecords.map(bentobox => {
          if (!bentobox.records) {
            return null
          }

          return (
            <li key={bentobox.uid} className="bentobox">
              <BentoboxHeading
                bentobox={bentobox}
                search={search}
                searchQuery={searchQuery}
              />
              <BentoResults
                search={search}
                bentobox={bentobox}
                searchQuery={searchQuery}
              />
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
  searchQuery
}) => {
  const totalResults = search.data[bentobox.uid].totalAvailable;
  const url = `/${bentobox.slug}${searchQuery}`

  return (
    <Link className="bentobox-heading-container" to={url}>
      <h2 className="bentobox-heading">{ bentobox.name }</h2>
      <BentoboxResultsNum bentobox={bentobox} search={search} totalResults={totalResults}/>
    </Link>
  )
}

const BentoboxResultsNum = ({ bentobox, search, totalResults }) => {
  const resultsNum = numeral(totalResults).format(0,0)
  const resultsText = resultsNum === 1 ? `Result` : `Results`

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return <span className="underline">{resultsNum} {resultsText}</span>
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return <span className="underline">Loading...</span>
  }

  // Results have loaded
  return <span className="underline">{resultsNum} {resultsText}</span>
}

const BentoResults = ({ search, bentobox, searchQuery }) => {

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return (
      <ul className="results-list results-list-border">
        <li className="record">
          <div className="record-container">
            <p className="no-margin"><b>No results</b> match your search.</p>
          </div>
        </li>
      </ul>
    )
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return (
      <ul className="results-list results-list-border">
        <RecordPlaceholder />
        <RecordPlaceholder />
        <RecordPlaceholder />
      </ul>
    )
  }

  // Results
  return (
    <ul className="results-list results-list-border">
      {bentobox.records.map((record, index) => {
        return (
          <Record
            key={index}
            datastoreUid={bentobox.uid}
            record={record}
            loading={record.loadingHoldings}
            type='preview'
            searchQuery={searchQuery}
          />
        )
      })}
    </ul>
  )
}

function mapStateToProps(state) {
  return {
    allRecords: state.records.records,
    datastoreUid: state.datastores.active,
    search: state.search,
    searchQuery: state.router.location.search
  };
}

export default connect(mapStateToProps)(BentoboxList);

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import { Icon } from '../../../core'
import { getMultiSearchRecords } from '../../../pride'
import RecordPreview from '../RecordPreview'
import RecordPreviewPlaceholder from '../RecordPreviewPlaceholder'

class BentoboxList extends React.Component {
  render() {
    const { allRecords, datastoreUid, search, searchQuery, institution } = this.props
    const bentoboxListRecords = getMultiSearchRecords(datastoreUid, allRecords)

    return (
      <ul className={`bentobox-list`}>
        {bentoboxListRecords.map(bentobox => {
          if (!bentobox.records) {
            return null
          }

          return (
            <li key={bentobox.uid} className={`bentobox bentobox-${bentobox.uid}`}>
              <div className="bentobox-inner-container">
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
            </li>
          )
        })}
      </ul>
    )
  }
}

const BentoHeading = ({
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

const BentoFooter = ({
  bentobox,
  search,
  searchQuery
}) => {
  const url = `/${bentobox.slug}${searchQuery}`
  const footerText = `View All ${bentobox.name} Results`

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return null
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return null
  }

  return (
    <Link className="bentobox-footer-container" to={url}>
      <span>{footerText}</span><Icon name="arrow-forward" />
    </Link>
  )
}

const BentoboxResultsNum = ({ bentobox, search, totalResults }) => {
  const resultsNum = numeral(totalResults).format(0,0)
  const resultsText = resultsNum === 1 ? `Result` : `Results`

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return <span className="bentobox-results-info">{resultsNum} {resultsText}</span>
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return <span className="bentobox-results-info">Loading...</span>
  }

  // Results have loaded
  return <span className="bentobox-results-info">{resultsNum} {resultsText}</span>
}

const BentoResults = ({ search, bentobox, searchQuery, institution }) => {

  // No results
  if (search.data[bentobox.uid] && search.data[bentobox.uid].totalAvailable === 0) {
    return (
      <p className="bentobox-no-results"><b>No results</b> match your search.</p>
    )
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return (
      <ul className="results-list results-list-border">
        <RecordPreviewPlaceholder />
        <RecordPreviewPlaceholder />
        <RecordPreviewPlaceholder />
      </ul>
    )
  }

  // Results
  return (
    <ul className="results-list results-list-border">
      {bentobox.records.map((record, index) => {
        return (
          <RecordPreview
            key={index}
            datastoreUid={bentobox.uid}
            record={record}
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
    searchQuery: state.router.location.search,
    institution: state.institution
  };
}

export default connect(mapStateToProps)(BentoboxList);

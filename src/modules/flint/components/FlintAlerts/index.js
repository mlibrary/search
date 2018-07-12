import React from 'react';
import { Alert } from '../../../reusable'
import { connect } from 'react-redux';
import { UserIsFlintAffiliated } from '../../../flint'

const messages = {
  'articlesplus': '',
  'databases': '',
  'journals': '',
  'library website': ''
}

class FlintAlerts extends React.Component {
  state = {
    open: true
  }

  checkClosedStateInSessionStorage = () => {
    const isClosed = sessionStorage.getItem(`flint-alert-for-${this.props.datastore}-closed`)

    if (isClosed === "true" && this.state.open) { // sessionStorage can only store strings...
      this.setState({ open: false })
    }
  }

  componentDidMount() {
    this.checkClosedStateInSessionStorage()
  }

  componentDidUpdate() {
    this.checkClosedStateInSessionStorage()
  }

  handleCloseButtonClick = () => {
    sessionStorage.setItem(`flint-alert-for-${this.props.datastore}-closed`, true)
  }

  render() {
    if (this.state.open) {
      const { query } = this.props

      if (this.props.datastore === 'articlesplus') {
        let url = 'https://umflint.summon.serialssolutions.com/#!/'

        if (query) {
          url = `https://umflint.summon.serialssolutions.com/#!/search?ho=t&l=en&q=${encodeURIComponent(query)}`
        }

        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              onCloseButtonClick={this.handleCloseButtonClick}
              >We noticed you're affiliated with U-M Flint. For the best results use <a href={url}>Thompson Library’s Summon search</a>.</Alert>
          </UserIsFlintAffiliated>
        )
      }
    }

    return null
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
    datastore: state.datastores.active
  };
}

export default connect(mapStateToProps)(FlintAlerts);

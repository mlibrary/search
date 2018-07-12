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
  getClosedStatus = () => {
    return sessionStorage.getItem(`flint-alert-for-${this.props.datastore}-closed`) === "true"
  }

  handleCloseButtonClick = () => {
    sessionStorage.setItem(`flint-alert-for-${this.props.datastore}-closed`, true)
  }

  render() {
    const { query } = this.props
    
    if (this.getClosedStatus()) {
      return null
    }
    
    switch (this.props.datastore) {
      case 'articlesplus':
        let url = 'https://umflint.summon.serialssolutions.com/#!/'

        if (query) {
          url = `https://umflint.summon.serialssolutions.com/#!/search?ho=t&l=en&q=${encodeURIComponent(query)}`
        }
        
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              onCloseButtonClick={this.handleCloseButtonClick}
              >We noticed you are affiliated with U-M Flint. For the best results use <a href={url}>Thompson Library’s Summon</a> to search for articles.</Alert>
          </UserIsFlintAffiliated>
        )
      case 'databases':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              onCloseButtonClick={this.handleCloseButtonClick}
              >We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/az.php?a=all">Thompson Library’s database listing</a>.</Alert>
          </UserIsFlintAffiliated>
        )
      case 'journals':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              onCloseButtonClick={this.handleCloseButtonClick}
              >We noticed you are affiliated with U-M Flint. For the best results use the <a href="http://th5yk4dg6v.search.serialssolutions.com/">Thompson Library’s journal listing</a>.</Alert>
          </UserIsFlintAffiliated>
        )
      case 'website':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              onCloseButtonClick={this.handleCloseButtonClick}
              >We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/library">Thompson Library website </a>.</Alert>
          </UserIsFlintAffiliated>
        )
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

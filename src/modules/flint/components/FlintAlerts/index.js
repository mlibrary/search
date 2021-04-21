import React from 'react';
import { Alert, Button } from '../../../reusable'
import { connect } from 'react-redux';
import { UserIsFlintAffiliated } from '../../../flint'


class FlintAlerts extends React.Component {
  state = {
    closed: false
  }

  handleCloseButtonClick = () => {
    this.setState({ closed: true })
  }

  render() {
    const { query, datastore } = this.props

    if (this.state.closed) {
      return null
    }

    switch (datastore) {
      case 'articlesplus':
        let url = 'https://umflint.summon.serialssolutions.com/#!/'

        if (query) {
          url = `https://umflint.summon.serialssolutions.com/#!/search?ho=t&l=en&q=${encodeURIComponent(query)}`
        }

        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              ><span>U-M Flint users: You may not be able to access U-M Ann Arbor resources. For the best results use <a href={url}>Thompson Library’s Summon</a> to search for articles.</span><Button kind="secondary" small onClick={() => this.handleCloseButtonClick()}>Dismiss</Button></Alert>
          </UserIsFlintAffiliated>
        )
      case 'databases':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              ><span>We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/az.php?a=all">Thompson Library’s database listing</a>.</span> <Button kind="secondary" small onClick={() => this.handleCloseButtonClick()}>Dismiss</Button></Alert>
          </UserIsFlintAffiliated>
        )
      case 'journals':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              ><span>We noticed you are affiliated with U-M Flint. For the best results use the <a href="http://th5yk4dg6v.search.serialssolutions.com/">Thompson Library’s journal listing</a>.</span> <Button kind="secondary" small onClick={() => this.handleCloseButtonClick()}>Dismiss</Button></Alert>
          </UserIsFlintAffiliated>
        )
      case 'onlinejournals':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              ><span>We noticed you are affiliated with U-M Flint. For the best results use the <a href="http://th5yk4dg6v.search.serialssolutions.com/">Thompson Library’s journal listing</a>.</span> <Button kind="secondary" small onClick={() => this.handleCloseButtonClick()}>Dismiss</Button></Alert>
          </UserIsFlintAffiliated>
        )
      case 'website':
        return (
          <UserIsFlintAffiliated>
            <Alert
              type="warning"
              ><span>We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/library">Thompson Library website </a>.</span> <Button kind="secondary" small onClick={() => this.handleCloseButtonClick()}>Dismiss</Button></Alert>
          </UserIsFlintAffiliated>
        )
      default:
        return null
    }
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
    datastore: state.datastores.active
  };
}

export default connect(mapStateToProps)(FlintAlerts);

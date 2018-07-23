import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import {
  withRouter,
  Link
} from 'react-router-dom'
import {
  Record
} from '../../../records'
import {
  Icon
} from '../../../core'
import {
  setA11yMessage
} from '../../../a11y'
import prejudice from '../../prejudice'
import ActionsList from '../ActionsList'

class List extends Component {
  state = {
    active: ''
  }

  setActive = (active) => {
    this.setState({ active })
  }

  getSearchURI = () => {
    const {
      match
    } = this.props

    return `${match.url.replace(/([\/]list[\/]?)/g, "")}${this.getSearch()}`
  }

  getSearch = () => {
    const {
      location
    } = this.props

    return `${location.search}`
  }

  handleRemoveAllFromList = ({ datastoreUid }) => {
    prejudice.clearRecords(datastoreUid)
    this.props.setA11yMessage('Removed all items from list.')
    this.setActive('')
  }

  renderList = () => {
    const {
      list,
      datastore,
      institution,
      searchQuery
    } = this.props

    if (!list || this.getListLength() === 0) {
      return (
        <section className="alert">
          <p><b>This list is empty</b>. <Link className="underline" to={this.getSearchURI()}>Go back to search results</Link> to add to this list.</p>
        </section>
      )
    }

    return (
      <React.Fragment>
        {list.map((record, index) =>
          <Record
            record={record}
            datastoreUid={datastore.uid}
            key={index}
            institution={institution}
            searchQuery={searchQuery}
            type='medium'
            list={list} />
        )}
      </React.Fragment>
    )
  }

  getListLength = () => {
    const { list } = this.props
    return list ? list.length : 0;
  }

  renderRemoveAllFromListButton = (list, datastore) => {
    if (list && list.length > 0) {
      const datastoreUid = datastore.uid;

      return (
        <button className="button-link underline lists-remove-all text-small" onClick={() => this.handleRemoveAllFromList({ datastoreUid })}>Remove all</button>
      )
    }

    return null
  }

  render() {
    const {
      list,
      datastore
    } = this.props

    return (
      <article className="container container-narrow u-margin-top-1">
        <Link to={this.getSearchURI()} className="lists-back-to-search-link"><Icon name="arrow-left" /> <span className="underline">Back to search results</span></Link>
        <header className="lists-header">
          <h1 className="lists-heading">My {datastore.name} List</h1>
          <div className="lists-header-info">
            {this.renderRemoveAllFromListButton(list, datastore)}
            <p className="lists-count-tag"><b>{this.getListLength()}</b> in list</p>
          </div>
        </header>
        <section className="lists-section">
          <h2 className="lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none">Actions</h2>
          <span className="text-small">Select what to do with this list.</span>
          <ActionsList {...this.props} listLength={this.getListLength()} setActive={this.setActive} active={this.state.active} prejudice={prejudice.instance} />
        </section>
        {this.renderList()}
      </article>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    list: state.lists[state.datastores.active],
    institution: state.institution,
    searchQuery: state.router.location.search
  };
}

export default withRouter(connect(mapStateToProps, { setA11yMessage })(List));

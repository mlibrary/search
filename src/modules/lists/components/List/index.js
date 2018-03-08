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

class List extends Component {
  renderList = () => {
    const {
      list,
      datastore,
      institution
    } = this.props

    if (!list || list.length === 0) {
      return null
    }

    return (
      <React.Fragment>
        {list.map((record, index) =>
          <Record
            record={record}
            datastoreUid={datastore.uid}
            key={index}
            institution={institution}
            type='medium'
            list={list} />
        )}
      </React.Fragment>
    )
  }

  renderActions = () => {
    const {
      list,
      datastore
    } = this.props
    const listLength = list ? list.length : 0;
    const plural = list && list.length === 1 ? '' : 's'

    return (
      <section className="lists-section">
        <h2 className="lists-actions-heading">Actions for <b>{listLength} item{plural}</b> in your list</h2>
        <ul className="lists-actions-list">
          <li>Email</li>
          <li>SMS</li>
          <li>Print</li>
          <li>Citation</li>
          <li>Refworks</li>
          <li>Export RIS</li>
          <li>Endnote</li>
          <li>Favorite</li>
        </ul>
      </section>
    )
  }

  render() {
    const {
      match,
      location,
      list,
      datastore
    } = this.props

    return (
      <article className="container container-narrow margin-top-2">
        <header className="lists-header">
          <Link to={`${match.url.replace(/([\/]list[\/]?)/g, "")}${location.search}`} className="lists-back-to-search-link"><Icon name="arrow-left" /> <span className="underline">Back to search results</span></Link>
          <h1 className="lists-heading">My {datastore.name} List</h1>
        </header>
        {this.renderActions()}
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
  };
}

export default withRouter(connect(mapStateToProps)(List));

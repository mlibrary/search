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
  getSearchURI = () => {
    const {
      location,
      match,
    } = this.props

    return `${match.url.replace(/([\/]list[\/]?)/g, "")}${this.getSearch()}`
  }

  getSearch = () => {
    const {
      location
    } = this.props

    return `${location.search}`
  }

  renderList = () => {
    const {
      location,
      match,
      list,
      datastore,
      institution
    } = this.props

    if (!list || this.getListLength() === 0) {
      return (
        <section className="alert">
          <p>Your list is empty. <Link class="underline" to={this.getSearchURI()}>Go back to search results</Link> to add to list.</p>
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

  renderActions = () => {
    const {
      list,
      datastore
    } = this.props
    const plural = list && this.getListLength() === 1 ? '' : 's'

    return (
      <section className="lists-section">
        <h2 className="lists-actions-heading">Actions</h2>
        <ul className="lists-actions-list">
          <li><button className="button-link underline lists-action-button">Email</button></li>
          <li><button className="button-link underline lists-action-button">SMS</button></li>
          <li><button className="button-link underline lists-action-button">Print</button></li>
          <li><button className="button-link underline lists-action-button">Citation</button></li>
          <li><button className="button-link underline lists-action-button">Refworks</button></li>
          <li><button className="button-link underline lists-action-button">Export RIS</button></li>
          <li><button className="button-link underline lists-action-button">Endnote</button></li>
          <li><button className="button-link underline lists-action-button">Favorite</button></li>
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
      <article className="container container-narrow u-margin-top-1">
        <Link to={this.getSearchURI()} className="lists-back-to-search-link"><Icon name="arrow-left" /> <span className="underline">Back to search results</span></Link>
        <header className="lists-header">
          <h1 className="lists-heading">My {datastore.name} List</h1>
          <p className="tag lists-count-tag"><b>{this.getListLength()}</b> in list</p>
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

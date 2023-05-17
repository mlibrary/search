import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { withRouter, Link } from 'react-router-dom';
import { Record } from '../../../records';
import { Breadcrumb } from '../../../reusable';
import { setA11yMessage } from '../../../a11y';
import prejudice from '../../prejudice';
import ActionsList from '../ActionsList';
import PropTypes from 'prop-types';

class List extends Component {
  state = {
    active: ''
  };

  setActive = (active) => {
    this.setState({ active });
  };

  handleRemoveAllFromList = ({ datastoreUid }) => {
    prejudice.clearRecords(datastoreUid);
    this.props.setA11yMessage('Removed all items from list.');
    this.setActive('');
  };

  renderList = () => {
    const {
      list,
      datastore,
      institution,
      searchQuery
    } = this.props;

    if (!list || this.getListLength() === 0) {
      return (
        <section className='alert'>
          <p><span className='strong'>This list is empty</span>. <Link to={`/${datastore.slug}${document.location.search}`}>Go back to {datastore.name}</Link> to add to this list.</p>
        </section>
      );
    }

    return (
      <>
        {list.map((record, index) => {
          return (
            <Record
              record={record}
              datastoreUid={datastore.uid}
              key={index}
              institution={institution}
              searchQuery={searchQuery}
              type='medium'
              list={list}
            />
          );
        }
        )}
      </>
    );
  };

  getListLength = () => {
    const { list } = this.props;
    return list ? list.length : 0;
  };

  renderRemoveAllFromListButton = (list, datastore) => {
    if (list && list.length > 0) {
      const datastoreUid = datastore.uid;

      return (
        <button
          className='button-link underline lists-remove-all text-small' onClick={() => {
            return this.handleRemoveAllFromList({ datastoreUid });
          }}
        >
          Remove all
        </button>
      );
    }

    return null;
  };

  render () {
    const {
      list,
      datastore
    } = this.props;

    return (
      <article className='container container-narrow u-margin-top-1'>
        <Breadcrumb
          items={[
            { text: `${datastore.name}`, to: `/${datastore.slug}${document.location.search}` },
            { text: `My Temporary ${datastore.name} List` }
          ]}
          renderAnchor={(item) => {
            return <Link to={item.to}>{item.text}</Link>;
          }}
        />

        <header className='lists-header'>
          <h1 className='heading-xlarge' id='maincontent' tabIndex='-1'>My Temporary {datastore.name} List</h1>
          <div className='lists-header-info'>
            {this.renderRemoveAllFromListButton(list, datastore)}
            <p className='lists-count-tag'><span className='strong'>{this.getListLength()}</span> in list</p>
          </div>
        </header>
        <p className='font-lede' style={{ marginTop: '0' }}>Items in this list are stored temporarily (within a single session).</p>
        <section className='lists-section'>
          <h2 className='lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none'>Actions</h2>
          <span className='text-small'>Select what to do with this list.</span>
          <ActionsList {...this.props} listLength={this.getListLength()} setActive={this.setActive} active={this.state.active} prejudice={prejudice.instance} />
        </section>
        {this.renderList()}
      </article>
    );
  }
}

List.propTypes = {
  setA11yMessage: PropTypes.func,
  list: PropTypes.array,
  datastore: PropTypes.object,
  institution: PropTypes.object,
  searchQuery: PropTypes.string
};

function mapStateToProps (state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    list: state.lists[state.datastores.active],
    institution: state.institution,
    searchQuery: state.router.location.search
  };
}

export default withRouter(connect(mapStateToProps, { setA11yMessage })(List));

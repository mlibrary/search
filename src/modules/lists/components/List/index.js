import React, { useState } from 'react';
import { connect } from 'react-redux';
import { findWhere } from '../../../reusable/underscore';
import { withRouter } from 'react-router-dom';
import { Record } from '../../../records';
import { Anchor, Breadcrumb } from '../../../reusable';
import { setA11yMessage } from '../../../a11y';
import prejudice from '../../prejudice';
import ActionsList from '../ActionsList';
import PropTypes from 'prop-types';

function List (props) {
  const [active, setActive] = useState('');

  const renderList = () => {
    if (props.list?.length > 0) {
      return (
        <>
          <section className='lists-section'>
            <h2 className='lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none'>Actions</h2>
            <span className='text-small'>Select what to do with this list.</span>
            <ActionsList {...props} setActive={setActive} active={active} prejudice={prejudice.instance} />
          </section>
          {props.list.map((record, index) => {
            return (
              <Record
                record={record}
                datastoreUid={props.datastore.uid}
                key={index}
                institution={props.institution}
                searchQuery={props.searchQuery}
                type='medium'
                list={props.list}
              />
            );
          }
          )}
        </>
      );
    }

    return (
      <section className='alert'>
        <p><span className='strong'>This list is empty</span>. <Anchor to={`/${props.datastore.slug}${document.location.search}`}>Go back to {props.datastore.name}</Anchor> to add to this list.</p>
      </section>
    );
  };

  return (
    <article className='container container-narrow u-margin-top-1'>
      <Breadcrumb
        items={[
          { text: `${props.datastore.name}`, to: `/${props.datastore.slug}${document.location.search}` },
          { text: `My Temporary ${props.datastore.name} List` }
        ]}
      />

      <div className='lists-header'>
        <h1 className='heading-xlarge' id='maincontent' tabIndex='-1'>My Temporary {props.datastore.name} List</h1>
        <div className='lists-header-info'>
          {props.list?.length > 0 &&
            <button
              className='button-link underline lists-remove-all text-small'
              onClick={() => {
                prejudice.clearRecords(props.datastore.uid);
                props.setA11yMessage('Removed all items from list.');
                setActive('');
              }}
            >
              Remove all
            </button>}
          <p className='lists-count-tag'><span className='strong'>{props.list?.length || 0}</span> in list</p>
        </div>
      </div>
      <p className='font-lede' style={{ marginTop: '0' }}>Items in this list are stored temporarily (within a single session).</p>
      {renderList()}
    </article>
  );
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
    datastore: findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    list: state.lists[state.datastores.active],
    institution: state.institution,
    searchQuery: state.router.location.search
  };
}

export default withRouter(connect(mapStateToProps, { setA11yMessage })(List));

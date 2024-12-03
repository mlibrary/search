import { Anchor, Breadcrumb, H1 } from '../../../reusable';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionsList from '../ActionsList';
import prejudice from '../../prejudice';
import PropTypes from 'prop-types';
import { Record } from '../../../records';
import { setA11yMessage as setA11yMessageAction } from '../../../a11y';
import { useLocation } from 'react-router-dom';

const List = (props) => {
  const list = useSelector((state) => {
    return state.lists[props.currentDatastore];
  });
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const { search } = useLocation();
  const setA11yMessage = (message) => {
    return dispatch(setA11yMessageAction(message));
  };
  const { activeDatastore } = props;
  const { name, slug, uid } = activeDatastore;
  const tempList = list || [];
  const listLength = tempList.length;
  const to = `/${slug}${search}`;

  return (
    <article className='container container-narrow u-margin-top-1'>
      <Breadcrumb
        items={[
          { text: `${name}`, to },
          { text: `My Temporary ${name} List` }
        ]}
      />

      <div className='lists-header'>
        <H1 className='heading-xlarge'>My Temporary {name} List</H1>
        <div className='lists-header-info'>
          {Boolean(listLength) && (
            <button
              className='button-link underline lists-remove-all text-small'
              onClick={() => {
                prejudice.clearRecords(uid);
                setA11yMessage('Removed all items from list.');
                setActive('');
              }}
            >
              Remove all
            </button>
          )}
          <p className='lists-count-tag'><span className='strong'>{listLength}</span> in list</p>
        </div>
      </div>
      <p className='font-lede margin-top__none'>Items in this list are stored temporarily (within a single session).</p>
      {listLength
        ? (
            <>
              <section className='lists-section'>
                <h2 className='lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none'>Actions</h2>
                <span className='text-small'>Select what to do with this list.</span>
                <ActionsList {...props} setActive={setActive} active={active} prejudice={prejudice.instance} datastore={activeDatastore} />
              </section>
              {tempList.map((record, index) => {
                return (
                  <Record
                    record={record}
                    datastoreUid={uid}
                    key={index}
                    searchQuery={search}
                    type='medium'
                    list={tempList}
                  />
                );
              }
              )}
            </>
          )
        : (
            <section className='container__rounded record-container'>
              <p><span className='strong'>This list is empty</span>. <Anchor to={to}>Go back to {name}</Anchor> to add to this list.</p>
            </section>
          )}
    </article>
  );
};

List.propTypes = {
  activeDatastore: PropTypes.object,
  currentDatastore: PropTypes.string,
  setA11yMessage: PropTypes.func
};

export default List;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox } from '../../../reusable';
import { findWhere } from '../../../reusable/underscore';
import { isInList } from '../../../lists';
import prejudice from '../../prejudice';
import PropTypes from 'prop-types';

function AddToListButton ({ item }) {
  const [waitingToBeAddedToList, setWaitingToBeAddedToList] = useState(false);
  const datastore = useSelector((state) => {
    return findWhere(state.datastores.datastores, { uid: state.datastores.active });
  }
  );
  const list = useSelector((state) => {
    return state.lists[state.datastores.active];
  });

  useEffect(() => {
    if (isInList(list, item.uid) && waitingToBeAddedToList) {
      setWaitingToBeAddedToList(false);
    }
  }, [list, item.uid, waitingToBeAddedToList]);

  const handleClick = (inList, item) => {
    if (!waitingToBeAddedToList) {
      if (inList) {
        prejudice.removeRecord(item);
      } else {
        setWaitingToBeAddedToList(true);
        prejudice.addRecord(item);
      }
    }
  };

  const inList = isInList(list, item.uid);
  const getRecordTitle = item.fields.filter((field) => {
    return field.uid === 'title';
  })[0].value;

  if (item.loadingHoldings) {
    return null;
  }

  return (
    <div className='add-to-list-checkbox-container'>
      <Checkbox
        handleClick={() => {
          return handleClick(inList, item);
        }}
        isChecked={inList}
        label={`Add "${getRecordTitle}" to my temporary ${datastore?.name} list`}
        hideLabel
        uid={item.uid}
      />
    </div>
  );
}

AddToListButton.propTypes = {
  item: PropTypes.object.isRequired
};

export default AddToListButton;

import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../../reusable';
import { isInList } from '../../../lists';
import prejudice from '../../prejudice';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const AddToListButton = ({ item }) => {
  const [waitingToBeAddedToList, setWaitingToBeAddedToList] = useState(false);
  const { active: activeDatastoreUid, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const datastore = datastores.find((ds) => {
    return ds.uid === activeDatastoreUid;
  });
  const list = useSelector((state) => {
    return state.lists[activeDatastoreUid];
  });

  useEffect(() => {
    if (isInList(list, item.uid) && waitingToBeAddedToList) {
      setWaitingToBeAddedToList(false);
    }
  }, [list, item.uid, waitingToBeAddedToList]);

  if (item.loadingHoldings) {
    return null;
  }

  const inList = isInList(list, item.uid);
  const handleClick = () => {
    if (waitingToBeAddedToList) {
      return;
    }

    if (inList) {
      prejudice.removeRecord(item);
    } else {
      setWaitingToBeAddedToList(true);
      prejudice.addRecord(item);
    }
  };
  const getRecordTitle = item.fields.find((field) => {
    return field.uid === 'title';
  })?.value;

  return (
    <div className='add-to-list-checkbox-container'>
      <Checkbox
        handleClick={handleClick}
        isChecked={inList}
        label={`Add "${getRecordTitle}" to my temporary ${datastore?.name} list`}
        hideLabel
        uid={item.uid}
      />
    </div>
  );
};

AddToListButton.propTypes = {
  item: PropTypes.object.isRequired
};

export default AddToListButton;

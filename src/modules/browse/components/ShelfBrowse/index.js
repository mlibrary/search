import React from 'react';
import ShelfBrowseCarousel from '../ShelfBrowseCarousel';
import { useSelector } from 'react-redux';

const ShelfBrowse = () => {
  const { full } = useSelector((state) => {
    return state.records.record.metadata;
  });

  const callNumberBrowse = full
    .flatMap((metadata) => {
      return metadata.description;
    })
    .find((callNumber) => {
      return callNumber.browse?.type === 'callnumber';
    });

  if (!callNumberBrowse) {
    return null;
  }

  return <ShelfBrowseCarousel callNumber={callNumberBrowse.browse.value} />;
};

export default ShelfBrowse;

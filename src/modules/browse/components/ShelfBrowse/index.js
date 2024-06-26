import React, { useEffect, useState } from 'react';
import ShelfBrowseCarousel from '../ShelfBrowseCarousel';
import { useSelector } from 'react-redux';

const ShelfBrowse = () => {
  const [shelfData, setShelfData] = useState();
  const { metadata, uid } = useSelector((state) => {
    return state.records.record;
  });

  const callNumberBrowse = metadata.full
    .flatMap((data) => {
      return data.description;
    })
    .find((callNumber) => {
      return callNumber.browse?.type === 'callnumber';
    });

  if (!callNumberBrowse) {
    return null;
  }

  const callNumber = callNumberBrowse.browse.value;

  useEffect(() => {
    const fetchShelfData = async () => {
      try {
        const response = await fetch(`https://browse.workshop.search.lib.umich.edu/carousel?query=${callNumber}`);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setShelfData(data);
      } catch (err) {
        console.error(err);
        setShelfData();
      }
    };

    fetchShelfData();
  }, [callNumber]);

  if (!shelfData) {
    return null;
  }

  return <ShelfBrowseCarousel {...{ callNumber, items: shelfData, uid }} />;
};

export default ShelfBrowse;

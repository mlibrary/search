import React, { useState } from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';

function DatastoreInfoContainer ({ activeDatastore }) {
  const [hide, setHide] = useState([]);
  const { uid } = activeDatastore;
  const handleHideClick = () => {
    setHide((previousHide) => {
      return [...previousHide, uid];
    });
  };

  if (hide.includes(uid)) return null;

  const information = {
    everything: (<>results from the Catalog, Articles, Databases, Online Journals, and Guides and More pages.</>),
    mirlyn: (<>results from everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</>),
    primo: (<>results from scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</>),
    databases: (<>results from subscription-based, locally created, and open access databases. Some highlight a particular format, while others contain a variety. Visit individual databases to continue searching and discover additional content.</>),
    onlinejournals: (<>results from Library subscription-based and open access journals, newspapers, trade publications, magazines, and more. Visit individual journals to browse the contents or search within them.</>),
    website: (<>the place to learn about our services, spaces, and collections. Your results will include research guides, specialty sites, blogs and blogs posts, and online exhibits. Visit <Anchor href='https://lib.umich.edu'>lib.umich.edu</Anchor> to search the library website, including library staff, current news, events, and physical exhibits.</>)
  };

  return (
    <div className='container container-narrow'>
      <div className='datastore-info-container' aria-live='polite'>
        <div className='datastore-info'>
          <p>
            <span className='strong'>{activeDatastore.name}</span>: {information[uid]}
          </p>
        </div>
        <button className='datastore-info-hide' onClick={handleHideClick}>
          Hide
        </button>
      </div>
    </div>
  );
}

DatastoreInfoContainer.propTypes = {
  activeDatastore: PropTypes.object
};

export default DatastoreInfoContainer;

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

  return (
    <div className='container container-narrow'>
      <div className='datastore-info-container' aria-live='polite'>
        <div className='datastore-info'>
          <p>
            {uid === 'everything' && (<><span className='strong'>Everything</span>: results from the Catalog, Articles, Databases, Online Journals, and Guides and More pages.</>)}
            {uid === 'mirlyn' && (<><span className='strong'>Catalog</span>: results from everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</>)}
            {uid === 'primo' && (<><span className='strong'>Articles</span>: results from scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</>)}
            {uid === 'databases' && (<><span className='strong'>Databases</span>: results from subscription-based, locally created, and open access databases. Some highlight a particular format, while others contain a variety. Visit individual databases to continue searching and discover additional content.</>)}
            {uid === 'onlinejournals' && (<><span className='strong'>Online Journals</span>: results from Library subscription-based and open access journals, newspapers, trade publications, magazines, and more. Visit individual journals to browse the contents or search within them.</>)}
            {uid === 'website' && (<><span className='strong'>Guides and More</span>: the place to learn about our services, spaces, and collections. Your results will include research guides, specialty sites, blogs and blogs posts, and online exhibits. Visit <Anchor href='https://lib.umich.edu'>lib.umich.edu</Anchor> to search the library website, including library staff, current news, events, and physical exhibits.</>)}
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

import React from 'react';
import { Anchor } from '../../../reusable';
import _ from 'underscore';
import PropTypes from 'prop-types';

function DatastoreInfo ({ activeDatastore }) {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <div className='datastore-info'>
          <p><span className='strong'>Everything</span>: results from the Catalog, Articles, Databases, Online Journals, and Guides and More pages.</p>
        </div>
      );
    case 'mirlyn':
      return (
        <div className='datastore-info'>
          <p><span className='strong'>Catalog</span>: results from everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</p>
        </div>
      );
    case 'primo':
      return (
        <div className='datastore-info'>
          <p><span className='strong'>Articles</span>: results from scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</p>
        </div>
      );
    case 'databases':
      return (
        <div className='datastore-info'>
          <p><span className='strong'>Databases</span>: results from subscription-based, locally created, and open access databases. Some highlight a particular format, while others contain a variety. Visit individual databases to continue searching and discover additional content.</p>
        </div>
      );
    case 'onlinejournals':
      return (
        <div className='datastore-info'>
          <p><span className='strong'>Online Journals</span>: results from Library subscription-based and open access journals, newspapers, trade publications, magazines, and more. Visit individual journals to browse the contents or search within them.</p>
        </div>
      );
    case 'website':
      return (
        <div className='datastore-info'>
          <p><span className='strong'>Guides and More</span>: the place to learn about our services, spaces, and collections. Your results will include research guides, specialty sites, blogs and blogs posts, and online exhibits. Visit <Anchor href='https://lib.umich.edu'>lib.umich.edu</Anchor> to search the library website, including library staff, current news, events, and physical exhibits.</p>
        </div>
      );
    default:
      return (
        <div className='datastore-info'>
          <p>Empty state. Begin your search.</p>
        </div>
      );
  }
};

DatastoreInfo.propTypes = {
  activeDatastore: PropTypes.object
};

class DatastoreInfoContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = { hide: [] };
    this.handleHideClick = this.handleHideClick.bind(this);
  }

  handleHideClick () {
    const datastoreUid = this.props.activeDatastore.uid;
    this.setState({
      hide: this.state.hide.concat(datastoreUid)
    });
  }

  render () {
    const { activeDatastore } = this.props;

    if (_.contains(this.state.hide, activeDatastore.uid)) {
      return null;
    }

    return (
      <div className='container container-narrow'>
        <div className='datastore-info-container' aria-live='polite'>
          <DatastoreInfo activeDatastore={activeDatastore} />
          <button
            className='datastore-info-hide' onClick={(e) => {
              return this.handleHideClick(e);
            }}
          >
            Hide
          </button>
        </div>
      </div>
    );
  }
}

DatastoreInfoContainer.propTypes = {
  activeDatastore: PropTypes.object
};

export default DatastoreInfoContainer;

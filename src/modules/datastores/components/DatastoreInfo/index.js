import React from 'react';
import _ from 'underscore';

const DatastoreInfo = ({ activeDatastore }) => {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <div className="datastore-info">
          <h1><b>Everything</b>: results from the Catalog, Articles, Databases, Online Journals, and Guides and More pages.</h1>
        </div>
      )
    case 'mirlyn':
      return (
        <div className="datastore-info">
          <h1><b>Catalog</b>: results from everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</h1>
        </div>
      )
    case 'articlesplus':
      return (
        <div className="datastore-info">
          <h1><b>Articles</b>: results from scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</h1>
        </div>
      )
    case 'databases':
      return (
        <div className="datastore-info">
          <h1><b>Databases</b>: results from subscription-based, locally created, and open access databases. Some highlight a particular format, while others contain a variety. Visit individual databases to continue searching and discover additional content.</h1>
        </div>
      )
    case 'journals':
      return (
        <div className="datastore-info">
          <h1><b>Online Journals</b>: results from Library subscription-based and open access journals, newspapers, trade publications, magazines, and more. Visit individual journals to browse the contents or search within them.</h1>
        </div>
      )
    case 'website':
      return (
        <div className="datastore-info">
          <h1><b>Guides and More</b>: the place to learn about our services, spaces, and collections. Your results will include research guides, specialty sites, blogs and blogs posts, and online exhibits. Visit <a href="https://lib.umich.edu">lib.umich.edu</a> to search the library website, including library staff, current news, events, and physical exhibits.</h1>
        </div>
      )
    default:
      return (
        <div className="datastore-info">
          <h1>Empty state. Begin your search.</h1>
        </div>
      )
  }
};

class DatastoreInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hide: [] };
    this.handleHideClick = this.handleHideClick.bind(this);
  }

  handleHideClick() {
    const datastore_uid = this.props.activeDatastore.uid;
    this.setState({
      hide: this.state.hide.concat(datastore_uid),
    });
  }

  render() {
    const { activeDatastore } = this.props;

    if (_.contains(this.state.hide, activeDatastore.uid)) {
      return null;
    }

    return (
      <div className="container container-narrow">
        <div className="datastore-info-container" aria-live="polite">
          <DatastoreInfo activeDatastore={activeDatastore} />
          <button className="datastore-info-hide" onClick={(e) => this.handleHideClick(e)}>Hide</button>
        </div>
      </div>
    )
  }
}

export default DatastoreInfoContainer;

import React from 'react';
import { _ } from 'underscore';

const DatastoreInfo = ({ activeDatastore }) => {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <div className="datastore-info">
          <p><b>Everything</b>: results from the Catalog, Articles+, Databases, Online Journals, and Library Website pages.</p>
        </div>
      )
    case 'mirlyn':
      return (
        <div className="datastore-info">
          <p><b>Catalog</b>: results from everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</p>
        </div>
      )
    case 'articlesplus':
      return (
        <div className="datastore-info">
          <p><b>Articles</b>: results from scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</p>
        </div>
      )
    case 'databases':
      return (
        <div className="datastore-info">
          <p><b>Databases</b>: results from subscription-based, locally created, and open access databases. Some highlight a particular format, while others contain a variety. Visit individual databases to continue searching and discover additional content.</p>
        </div>
      )
    case 'journals':
      return (
        <div className="datastore-info">
          <p><b>Online Journals</b>: results from Library subscription-based and open access journals, newspapers, trade publications, magazines, and more. Visit individual journals to browse the contents or search within them.</p>
        </div>
      )
    case 'website':
      return (
        <div className="datastore-info">
          <p><b>Library Website</b>: the place to learn about our services, spaces, and collections. Your results will include website pages, events, exhibits, news, and more.</p>
        </div>
      )
    default:
      return (
        <div className="datastore-info">
          <p>Empty state. Begin your search.</p>
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
        <div className="datastore-info-container">
          <DatastoreInfo activeDatastore={activeDatastore} />
          <button className="datastore-info-hide" onClick={(e) => this.handleHideClick(e)}>Hide</button>
        </div>
      </div>
    )
  }
}

export default DatastoreInfoContainer;

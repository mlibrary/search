/** @jsx jsx */
import { jsx } from '@emotion/core'

import React from 'react';
import { _ } from 'underscore';

import {
  Button,
  SPACING,
  Margins,
  COLORS
} from '@umich-lib/core'

const DatastoreInfo = ({ activeDatastore }) => {
  switch (activeDatastore.uid) {
    case 'everything':
      return (
        <React.Fragment>
          <h1><b>Everything</b>: results from the Catalog, Articles, Databases, Online Journals, and Library Website pages.</h1>
        </React.Fragment>
      )
    case 'mirlyn':
      return (
        <React.Fragment>
          <h1><b>Catalog</b>: results from everything in our physical collection (books, audio, video, maps, musical scores, archival materials, and more), as well as materials available online such as electronic books, streaming audio and video, and online journals.</h1>
        </React.Fragment>
      )
    case 'articlesplus':
      return (
        <React.Fragment>
          <h1><b>Articles</b>: results from scholarly journal articles, newspaper articles, book chapters, conference proceedings, and more.</h1>
        </React.Fragment>
      )
    case 'databases':
      return (
        <React.Fragment>
          <h1><b>Databases</b>: results from subscription-based, locally created, and open access databases. Some highlight a particular format, while others contain a variety. Visit individual databases to continue searching and discover additional content.</h1>
        </React.Fragment>
      )
    case 'journals':
      return (
        <React.Fragment>
          <h1><b>Online Journals</b>: results from Library subscription-based and open access journals, newspapers, trade publications, magazines, and more. Visit individual journals to browse the contents or search within them.</h1>
        </React.Fragment>
      )
    case 'website':
      return (
        <React.Fragment>
          <h1><b>Library Website</b>: the place to learn about our services, spaces, and collections. Your results will include research guides, library staff, events, exhibits, news, and more.</h1>
        </React.Fragment>
      )
    default:
      return (
        <React.Fragment>
          <h1>Empty state. Begin your search.</h1>
        </React.Fragment>
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
      <Margins>
        <div aria-live="polite" css={{
          maxWidth: '42rem',
          margin: '0 auto',
          display: 'flex',
          paddingTop: SPACING['L'],
          alignItems: 'baseline',
          justifyContent: 'center',
          'b': {
            fontWeight: '600'
          }
        }}>
          <DatastoreInfo activeDatastore={activeDatastore} />
          <Button
            onClick={(e) => this.handleHideClick(e)}
            small
            css={{
              marginLeft: SPACING['XL']
            }}
          >Hide</Button>
        </div>
      </Margins>
    )
  }
}

export default DatastoreInfoContainer;

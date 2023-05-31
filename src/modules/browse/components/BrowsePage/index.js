import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowseAtoZ, BrowseByFilters } from '../../../browse';
import { Breadcrumb } from '../../../reusable';
import PropTypes from 'prop-types';

function BrowsePage (props) {
  const { datastore, browse } = props;

  return (
    <div className='container container-narrow u-margin-top-1'>
      <Breadcrumb
        items={[
          { text: `${datastore.name}`, to: `/${datastore.slug}${document.location.search}` },
          { text: 'Browse' }
        ]}
        renderAnchor={(item) => {
          return <Link to={item.to}>{item.text}</Link>;
        }}
      />
      <h1 className='heading-xlarge' id='maincontent' tabIndex='-1'>Browse all {datastore.name}</h1>
      <p className='font-lede'>When you're stuck looking for specific {datastore.name.toLowerCase()} or just want to see what's out there, the browse page makes finding the right {datastore.name.toLowerCase()} easy. Browse all {datastore.name.toLowerCase()} titles alphabetically or by academic discipline.</p>
      <BrowseAtoZ />
      <BrowseByFilters filters={browse} />
    </div>
  );
}

BrowsePage.propTypes = {
  browse: PropTypes.object,
  datastore: PropTypes.object
};

export default connect((state) => {
  return {
    datastore: state.datastores.datastores.filter((datastore) => {
      return datastore.uid === state.datastores.active;
    })[0],
    browse: state.browse[state.datastores.active]
  };
})(BrowsePage);

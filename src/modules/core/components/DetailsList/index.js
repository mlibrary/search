import React from 'react';
import PropTypes from 'prop-types';

/*
  DetailsList

  This element should be passed in details element children.
  It will then provide an "open all" and "close all" button.
*/

class DetailsList extends React.Component {
  render () {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}

DetailsList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default DetailsList;

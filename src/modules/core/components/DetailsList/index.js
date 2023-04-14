import React from 'react';

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

export default DetailsList;

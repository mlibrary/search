import React from 'react';

/*
  DetailsList

  This element should be passed in details element children.
  It will then provide an "open all" and "close all" button.
*/

class DetailsList extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default DetailsList;

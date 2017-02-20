import React from 'react';

import AccessList from './presenter';

class AccessListContainer extends React.Component {
  render() {
    const { access } = this.props;

    if (access.length === 0) {
      return null
    }

    return <AccessList access={access} />
  }
}

export default AccessListContainer;

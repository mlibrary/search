import React from 'react';

import AccessList from './presenter';

class AccessListContainer extends React.Component {
  render() {
    const { access } = this.props;

    if (!access) {
      return null
    }

    return <AccessList access={access} />
  }
}

export default AccessListContainer;

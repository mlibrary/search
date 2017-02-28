import React from 'react';

import AccessList from './presenter';

class AccessListContainer extends React.Component {
  render() {
    const { access, holdings } = this.props;

    return <AccessList access={access} holdings={holdings}/>
  }
}

export default AccessListContainer;

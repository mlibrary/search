import React from 'react';

import AccessList from './presenter';

class AccessListContainer extends React.Component {
  render() {
    const { access, holdings, loading } = this.props;

    return <AccessList access={access} holdings={holdings} loading={loading} />
  }
}

export default AccessListContainer;

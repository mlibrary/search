import React from 'react';
import ClearSearchButton from './presenter';

// TODO
/*
import {
  clearEverything
} from '../../../../pride-interface';
*/

class ClearSearchButtonContainer extends React.Component {
  triggerClick () {
    // TODO
    // clearEverything()
  }

  render () {
    return <ClearSearchButton triggerClick={this.triggerClick} />;
  }
}

export default ClearSearchButtonContainer;

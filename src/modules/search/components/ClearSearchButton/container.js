import React from 'react';

import ClearSearchButton from './presenter';

//TODO
/*
import {
  clearEverything
} from '../../../../pride-interface';
*/

class ClearSearchButtonContainer extends React.Component {
  handleClick() {
    // TODO
    //clearEverything()
  }
  render() {
    return <ClearSearchButton handleClick={this.handleClick} />
  }
}

export default ClearSearchButtonContainer;

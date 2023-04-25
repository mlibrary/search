import React from 'react';

import Holder from './holder';

/*
  Wrap the Holder so that clicks can be tracked
  for analytics.
*/
export default function HolderContainer ({ ...rest }) {
  return (
    <Holder {...rest} />
  );
}

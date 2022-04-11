import React from 'react';
import { ExpandableContext } from './Expandable'

/*
  Provides expandable 'context' as a render prop.
*/
export default props => (
  <ExpandableContext.Consumer>
    {context => (
      <React.Fragment>
        {props.children(context)}
      </React.Fragment>
    )}
  </ExpandableContext.Consumer>
)

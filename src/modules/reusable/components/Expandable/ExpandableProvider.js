import { ExpandableContext } from './Expandable';
import React from 'react';

// Provides expandable 'context' as a render prop.
const ExpandableProvider = (props) => {
  return (
    <ExpandableContext.Consumer>
      {(context) => {
        return (
          <>
            {props.children(context)}
          </>
        );
      }}
    </ExpandableContext.Consumer>
  );
};

export default ExpandableProvider;

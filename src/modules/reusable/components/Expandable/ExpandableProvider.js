import React from 'react';
import { ExpandableContext } from './Expandable';

/*
  Provides expandable 'context' as a render prop.
*/
export default (props) => {
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

import { ExpandableContext } from './Expandable';
import PropTypes from 'prop-types';
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

ExpandableProvider.propTypes = {
  children: PropTypes.any
};

export default ExpandableProvider;

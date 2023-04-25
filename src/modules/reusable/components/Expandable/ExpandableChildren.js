import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExpandableContext } from './Expandable';

class ExpandableChildren extends Component {
  componentDidMount () {
    const {
      context,
      children,
      show
    } = this.props;

    if (children.length <= show && !context.disabled) {
      context.disable();
    }
  }

  render () {
    const {
      context,
      children,
      show
    } = this.props;

    return (
      <>
        {context.expanded
          ? (
              children
            )
          : (
              children.slice(0, show)
            )}
      </>
    );
  }
}

ExpandableChildren.propTypes = {
  context: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  show: PropTypes.number
};

ExpandableChildren.defaultProps = {
  show: 3
};

export default (props) => {
  return (
    <ExpandableContext.Consumer>
      {(context) => {
        return <ExpandableChildren {...props} context={context} />;
      }}
    </ExpandableContext.Consumer>
  );
};

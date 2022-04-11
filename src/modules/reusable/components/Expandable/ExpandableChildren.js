import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ExpandableContext } from './Expandable'


class ExpandableChildren extends Component {
  componentDidMount() {
    const {
      context,
      children,
      show
    } = this.props;

    if (children.length <= show && !context.disabled) {
      context.disable()
    }
  }

  render() {
    const {
      context,
      children,
      show
    } = this.props;
    
    return (
      <React.Fragment>
        {context.expanded ? (
          children
        ) : (
          children.slice(0, show)
        )}
      </React.Fragment>
    )
  }
}

ExpandableChildren.propTypes = {
  show: PropTypes.number
};

ExpandableChildren.defaultProps = {
  show: 3
};

export default props => (
  <ExpandableContext.Consumer>
    {context => <ExpandableChildren {...props} context={context}/>}
  </ExpandableContext.Consumer>
)

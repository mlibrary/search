import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ExpandableContext = React.createContext();

/**
  Use Expandable to show only the first few items. The remaining will be hidden and can be expanded by the user.
*/
class Expandable extends Component {
  state = {
    expanded: false,
    toggleExpanded: () => {
      this.setState({
        expanded: !this.state.expanded
      });
    },
    disabled: false,
    disable: () => {
      this.setState({
        disabled: true
      });
    }
  };

  render () {
    return (
      <ExpandableContext.Provider value={this.state}>
        {this.props.children}
      </ExpandableContext.Provider>
    );
  }
}

Expandable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Expandable.defaultProps = {
  expanded: false
};

export default Expandable;
export {
  ExpandableContext
};

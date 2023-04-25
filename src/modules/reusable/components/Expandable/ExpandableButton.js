import React, { Component } from 'react';
import { ExpandableContext } from './Expandable';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

const cleanList = (list) => {
  return list.filter((x) => {
    return (!!x);
  }).join(' ').trim();
};

class ExpandableButton extends Component {
  render () {
    const { context } = this.props;

    if (context.disabled) {
      return null;
    }

    return (
      <Button
        {...this.props} onClick={() => {
          return context.toggleExpanded();
        }}
      >
        {context.expanded
          ? (
              cleanList(['Show fewer', this.props.name])
            )
          : (
              cleanList(['Show all', this.props.count, this.props.name])
            )}
      </Button>
    );
  }
}

ExpandableButton.propTypes = {
  context: PropTypes.object,
  name: PropTypes.string,
  count: PropTypes.number
};

export default (props) => {
  return (
    <ExpandableContext.Consumer>
      {(context) => {
        return <ExpandableButton {...props} context={context} />;
      }}
    </ExpandableContext.Consumer>
  );
};

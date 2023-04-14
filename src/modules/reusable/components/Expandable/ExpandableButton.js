import React, { Component } from 'react';
import { ExpandableContext } from './Expandable';
import { Button } from '../../../reusable';

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

export default (props) => {
  return (
    <ExpandableContext.Consumer>
      {(context) => {
        return <ExpandableButton {...props} context={context} />;
      }}
    </ExpandableContext.Consumer>
  );
};

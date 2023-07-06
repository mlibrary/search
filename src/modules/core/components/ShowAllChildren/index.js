import React from 'react';
import { connect } from 'react-redux';
import { setA11yMessage } from '../../../a11y';
import PropTypes from 'prop-types';

class ShowAllChildren extends React.Component {
  constructor () {
    super();
    this.handleShowToggleClick = this.handleShowToggleClick.bind(this);
  }

  state = {
    show: false
  };

  handleShowToggleClick () {
    this.setState({
      show: !this.state.show
    });

    const a11yMessage = this.state.show ? 'Showing fewer' : `showing all ${this.props.length}`;
    this.props.setA11yMessage(`${a11yMessage} ${this.props.name}`);
  }

  render () {
    const length = this.props.length || 0;
    const show = this.props.show || 1;
    const hasShowHideButton = length > show;
    const name = this.props.name || undefined;
    const showFewerText = this.props.showFewerText || `Show fewer ${name || ''}`;
    const showAllText = this.props.showAllText || `Show all ${length} ${name || ''}`;
    const buttonText = `${this.state.show ? showFewerText : showAllText}`;

    return (
      <>
        {this.props.children.map((child, index) => {
          if (this.state.show || (show > index)) {
            return child;
          }

          return null;
        })}
        {hasShowHideButton && (
          <button
            onClick={this.handleShowToggleClick}
            className='button-link-light show-all-button'
            aria-expanded={this.state.show}
          >
            <span className='show-all-button__text'>{buttonText}</span>
          </button>
        )}
      </>
    );
  }
}

ShowAllChildren.propTypes = {
  length: PropTypes.number,
  setA11yMessage: PropTypes.func,
  name: PropTypes.string,
  show: PropTypes.number,
  showFewerText: PropTypes.string,
  showAllText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default connect(null, { setA11yMessage })(ShowAllChildren);

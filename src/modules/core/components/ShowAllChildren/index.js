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

    this.props.setA11yMessage(`Showing ${this.state.show ? 'fewer' : `all ${this.props.children.length}`} Library Specialists`);
  }

  render () {
    const show = this.props.show || 1;

    return (
      <>
        {this.props.children.map((child, index) => {
          if (this.state.show || (show > index)) {
            return child;
          }

          return null;
        })}
        {this.props.children.length > show && (
          <button
            onClick={this.handleShowToggleClick}
            className='button-link-light show-all-button'
            aria-expanded={this.state.show}
          >
            <span className='show-all-button__text'>
              {`Show ${this.state.show ? 'fewer' : `all ${this.props.children.length}`} Library Specialists`}
            </span>
          </button>
        )}
      </>
    );
  }
}

ShowAllChildren.propTypes = {
  setA11yMessage: PropTypes.func,
  show: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default connect(null, { setA11yMessage })(ShowAllChildren);

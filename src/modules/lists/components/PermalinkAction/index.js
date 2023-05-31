/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

class PermalinkAction extends React.Component {
  state = {
    permalink: document.location.origin + document.location.pathname,
    status: undefined
  };

  handleSubmitCallback = (data) => {
    this.setState({ status: data });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(this.state.permalink);
    this.props.setAlert({
      intent: 'success',
      text: 'Link copied!'
    });
    this.props.setActive('');
    this.setState({ status: undefined });
  };

  render () {
    if (this.state.status?.status_code === 'action.response.success') return null;

    return (
      <form className='lists-action-form' onSubmit={this.handleSubmit}>
        <div className='lists-action-field-container'>
          <label htmlFor='permalink-action'>Copy link</label>
          <input
            id='permalink-action'
            type='text'
            readOnly
            value={this.state.permalink}
            autoComplete='off'
          />
        </div>
        <Button type='submit' style={{ whiteSpace: 'nowrap' }}>Copy link</Button>
      </form>
    );
  }
}

PermalinkAction.propTypes = {
  setActive: PropTypes.func,
  setAlert: PropTypes.func
};

export default PermalinkAction;

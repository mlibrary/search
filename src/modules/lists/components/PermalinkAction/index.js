/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

class PermalinkAction extends React.Component {
  state = {
    copied: false,
    permalink: '',
    status: undefined
  };

  componentDidMount () {
    this.setState({
      permalink: document.location.origin + document.location.pathname
    });
  }

  handleSubmitCallback = (data) => {
    this.setState({ status: data });
  };

  setCloseStatus = () => {
    this.props.setActive('');
    this.setState({ status: undefined, copied: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(this.state.permalink);
    this.setState({ copied: true });
    this.props.setAlert({
      intent: 'success',
      text: 'Link copied!'
    });
    this.setCloseStatus();
  };

  renderForm = () => {
    const { status } = this.state;

    if (!status || status.status_code !== 'action.response.success') {
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

    return null;
  };

  render () {
    const { listLength } = this.props;

    if (listLength === 0) {
      return null;
    }

    return (
      <section className='lists-action'>
        {this.renderForm()}
      </section>
    );
  }
}

PermalinkAction.propTypes = {
  setActive: PropTypes.func,
  listLength: PropTypes.number,
  setAlert: PropTypes.func
};

export default PermalinkAction;

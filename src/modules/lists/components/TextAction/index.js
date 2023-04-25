import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionStatusMessage from '../ActionStatusMessage';
import { Button } from '../../../reusable';
import PropTypes from 'prop-types';

class TextAction extends Component {
  state = {
    text: '',
    sent: false,
    status: undefined
  };

  componentDidMount () {
    const { profile } = this.props;

    if (profile.text) {
      this.setState({ text: profile.text });
    }
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSubmitCallback = (data) => {
    this.setState({ status: data });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sent: true });
    this.props.prejudice.act(
      'text',
      this.props.datastore.uid,
      this.state.text,
      this.handleSubmitCallback
    );
    this.props.onUsed();
  };

  setCloseStatus = () => {
    this.props.setActive('');
    this.setState({ status: undefined, sent: false });
  };

  renderForm = () => {
    const { status } = this.state;

    if (!status || status.status_code !== 'action.response.success') {
      return (
        <>
          <form className='lists-action-form' onSubmit={this.handleSubmit}>
            <div className='lists-action-field-container'>
              <label htmlFor='phoneNumber'>Phone number</label>
              <input id='phoneNumber' type='tel' placeholder='000-123-5555' required value={this.state.text} onChange={this.handleChange} />
            </div>
            <Button type='submit' style={{ whiteSpace: 'nowrap' }}>Send text</Button>
          </form>
        </>
      );
    }

    return null;
  };

  render () {
    const { listLength, action } = this.props;

    if (listLength === 0) {
      return null;
    }

    return (
      <section className='lists-action'>
        <ActionStatusMessage status={this.state.status} action={action} setCloseStatus={this.setCloseStatus} />
        {this.renderForm()}
      </section>
    );
  }
}

TextAction.propTypes = {
  profile: PropTypes.object,
  prejudice: PropTypes.object,
  datastore: PropTypes.object,
  onUsed: PropTypes.func,
  setActive: PropTypes.func,
  listLength: PropTypes.number,
  action: PropTypes.object
};

function mapStateToProps (state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(TextAction);

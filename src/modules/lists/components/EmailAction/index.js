import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionStatusMessage from '../ActionStatusMessage';
import { Button } from '../../../reusable';

class EmailAction extends Component {
  state = {
    email: '',
    sent: false,
    status: undefined
  };

  componentDidMount () {
    const { email } = this.props.profile;

    if (email) {
      this.setState({ email });
    }
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmitCallback = (data) => {
    this.setState({ status: data });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sent: true });
    this.props.prejudice.act('email', this.props.datastore.uid, this.state.email, this.handleSubmitCallback);
    this.props.onUsed();
  };

  handleCloseStatus = () => {
    this.props.setActive('');
    this.setState({ status: undefined, sent: false });
  };

  renderForm = () => {
    const { status } = this.state;

    if (!status || status.status_code !== 'action.response.success') {
      return (
        <form className='lists-action-form' onSubmit={this.handleSubmit}>
          <div className='lists-action-field-container'>
            <label htmlFor='emailAddress'>Email address</label>
            <input id='emailAddress' type='email' required placeholder='uniqname@umich.edu' value={this.state.email} onChange={this.handleChange} />
          </div>
          <Button type='submit' style={{ whiteSpace: 'nowrap' }}>Send email</Button>
        </form>
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
        <ActionStatusMessage status={this.state.status} action={action} handleCloseStatus={this.handleCloseStatus} />
        {this.renderForm()}
      </section>
    );
  }
}

function mapStateToProps (state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(EmailAction);

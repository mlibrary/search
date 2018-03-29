import React, { Component } from 'react';

class EmailAction extends Component {
  render() {
    return (
      <section className="lists-action">
        <form className="lists-action-email-form">
          <div className="lists-action-field-container">
            <label>Email address</label>
            <input type="email" required placeholder="uniqname@umich.edu" />
          </div>
          <input type="submit" value="Send" class="button" />
        </form>
      </section>
    )
  }
}

export default EmailAction

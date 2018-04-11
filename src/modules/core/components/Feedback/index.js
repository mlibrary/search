import React from 'react';

class Feedback extends React.Component {
  state = {
    form: false
  }

  handleFormClick = () => {
    // Makes the form visible or hidden
    this.setState({ form: !this.state.form })
  }

  renderFeedbackForm = () => {
    if (this.state.form) {
      return (
        <form className="feedback-form">
          <fieldset className="feedback-form-fieldset">
            <legend>
              <h1 class="feedback-heading">
                Help us improve Library Search
              </h1>

              <p>Let us know what is wrong with this page.</p>

              <button className="button-link feedback-close-button" onClick={this.handleFormClick}>Close</button>
            </legend>

            <div className="form-group">
              <label for="feedback-doing">What were you doing?</label>
              <input type="text" id="feedback-doing" />
            </div>

            <div className="form-group">
              <label for="feedback-wrong">What went wrong?</label>
              <input type="text" id="feedback-wrong" />
            </div>

            <input type="submit" value="Send" className="button" />
          </fieldset>
        </form>
      )
    }

    return null
  }

  renderFeedbackOptions = () => {
    if (!this.state.form) {
      return (
        <div className="feedback-options">
          <p><b>Was this page helpful?</b> <a href="" className="underline feedback-link">Yes</a> <a href="" className="underline">No</a></p>

          <button className="button-link underline" onClick={this.handleFormClick}>Is there anything wrong with this page?</button>
        </div>
      )
    }
  }

  renderQualtricsLink = () => {
    return (
      <a href="https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf" className="feedback-qualtrics-link">Give feedback about this page</a>
    )
  }

  render() {

    return (
      <aside className="container container-narrow feedback-container">
        {this.renderQualtricsLink()}
      </aside>
    )
  }
}

export default Feedback

import React from 'react';

class Feedback extends React.Component {
  render() {

    return (
      <section className="container container-medium feedback-container">
        <p className="text-small">Was this page helpful? <a href="" className="underline feedback-link">Yes</a> <a href="" className="underline">No</a></p>

        <a href="" className="underline text-small">Is there anything wrong with this page?</a>
      </section>
    )
  }
}

export default Feedback

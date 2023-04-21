import React from 'react';
import { connect } from 'react-redux';
import { Icon, Alert } from '../../../reusable';
import config from '../../../../config';
import { DetailsList } from '../../../core';
import GetThisOption from '../GetThisOption';

const Section = ({ children }) => {
  return (
    <section className='card get-this-section y-spacing'>
      <h2 className='heading-large' style={{ marginTop: '0' }}>How would you like to get this item?</h2>
      {children}
    </section>
  );
};

class GetThisOptions extends React.Component {
  render () {
    const { record } = this.props;

    if (record && record.getthis) {
      const { status, options } = record.getthis;

      if (status === 'Success') {
        if (options.length === 0) {
          return (
            <Section>
              <Alert type='error'>
                <div className='x-spacing'><Icon icon='error' /><span>No options available.</span></div>
              </Alert>
            </Section>
          );
        }

        return (
          <Section>
            <DetailsList className='get-this-options'>
              {options.map((option, key) => {
                return (
                  <GetThisOption option={option} key={key} />
                );
              })}
            </DetailsList>
          </Section>
        );
      } else if (status === 'Not logged in') {
        const loginRoot = config.loginUrl;
        const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search);

        return (
          <Section>
            <a href={loginUrl} className='button'><b>Log in</b> to view request options</a>
          </Section>
        );
      } else {
        return (
          <Section>
            <div className='alert'>
              <p>Sorry, something unexpected happened.</p>

              <p><b>Status:</b> {status}</p>
            </div>
          </Section>
        );
      }
    } else {
      return (
        <Section>
          <div className='alert'>
            <p>Loading holding options...</p>
          </div>
        </Section>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    record: state.records.record
  };
}

export default connect(mapStateToProps)(GetThisOptions);

import React from 'react';
import { connect } from 'react-redux';
import { DetailsList } from '../../../core';
import GetThisOption from '../GetThisOption';
import { Authentication } from '../../../profile';
import PropTypes from 'prop-types';

const Section = ({ children }) => {
  return (
    <section className='card get-this-section y-spacing'>
      <h2 className='heading-large' style={{ marginTop: '0' }}>How would you like to get this item?</h2>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

function GetThisOptions (props) {
  if (!props.record?.getthis) {
    return (
      <Section>
        <div className='alert'>
          <p>Loading holding options...</p>
        </div>
      </Section>
    );
  }

  const { status, options } = props.record.getthis;

  if (status === 'Success') {
    if (!options.length) {
      return (
        <Section>
          <div className='alert alert--error'>
            No options available.
          </div>
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
  }

  if (status === 'Not logged in') {
    return (
      <Section>
        <Authentication>
          <span className='strong'>Log in</span> to view request options
        </Authentication>
      </Section>
    );
  }

  return (
    <Section>
      <div className='alert'>
        <p>Sorry, something unexpected happened.</p>
        <p><span className='strong'>Status:</span> {status}</p>
      </div>
    </Section>
  );
}

GetThisOptions.propTypes = {
  record: PropTypes.object
};

function mapStateToProps (state) {
  return {
    record: state.records.record
  };
}

export default connect(mapStateToProps)(GetThisOptions);

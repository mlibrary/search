import React from 'react';
import { Alert } from '../../../reusable';
import { connect } from 'react-redux';
import GetThisOption from '../GetThisOption';
import { Authentication } from '../../../profile';
import PropTypes from 'prop-types';

function GetThisOptions (props) {
  let section = (
    <Alert>
      <p>Loading holding options...</p>
    </Alert>
  );

  if (props.record?.getthis) {
    const { status, options } = props.record.getthis;

    section = (
      <Alert>
        <p>Sorry, something unexpected happened.</p>
        <p><span className='strong'>Status:</span> {status}</p>
      </Alert>
    );

    if (status === 'Success') {
      section = (
        <Alert type='error'>
          No options available.
        </Alert>
      );

      if (options.length) {
        section = (
          <>
            {options.map((option, key) => {
              return (
                <GetThisOption option={option} key={key} />
              );
            })}
          </>
        );
      }
    }

    if (status === 'Not logged in') {
      section = (
        <Authentication button>
          <span className='strong'>Log in</span> to view request options
        </Authentication>
      );
    }
  }

  return (
    <section className='card get-this-section y-spacing'>
      <h2 className='heading-large' style={{ marginTop: '0' }}>
        How would you like to get this item?
      </h2>
      {section}
    </section>
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

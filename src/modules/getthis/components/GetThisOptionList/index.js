import React from 'react';
import { connect } from 'react-redux';
import { DetailsList } from '../../../core';
import GetThisOption from '../GetThisOption';
import { Authentication } from '../../../profile';
import PropTypes from 'prop-types';

function GetThisOptions (props) {
  let section = (
    <div className='alert'>
      <p>Loading holding options...</p>
    </div>
  );

  if (props.record?.getthis) {
    const { status, options } = props.record.getthis;

    section = (
      <div className='alert'>
        <p>Sorry, something unexpected happened.</p>
        <p><span className='strong'>Status:</span> {status}</p>
      </div>
    );

    if (status === 'Success') {
      section = (
        <div className='alert alert--error'>
          No options available.
        </div>
      );

      if (options.length) {
        section = (
          <DetailsList className='get-this-options'>
            {options.map((option, key) => {
              return (
                <GetThisOption option={option} key={key} />
              );
            })}
          </DetailsList>
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

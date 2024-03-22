import React from 'react';
import { Alert } from '../../../reusable';
import GetThisOption from '../GetThisOption';
import { Authentication } from '../../../profile';
import PropTypes from 'prop-types';

function GetThisOptions ({ record }) {
  if (!record?.getthis) {
    return (
      <Alert>
        <p>Loading holding options...</p>
      </Alert>
    );
  }

  const { status, options } = record.getthis;

  if (status === 'Not logged in') {
    return (
      <Authentication button>
        <span className='strong'>Log in</span> to view request options
      </Authentication>
    );
  }

  if (status === 'Success') {
    return options?.length
      ? (
        <>
          {options.map((option, index) => {
            return (
              <GetThisOption option={option} key={index} />
            );
          })}
        </>
        )
      : (
        <Alert type='error'>
          No options available.
        </Alert>
        );
  }

  return (
    <Alert>
      <p>Sorry, something unexpected happened.</p>
      <p><span className='strong'>Status:</span> {status}</p>
    </Alert>
  );
}

GetThisOptions.propTypes = {
  record: PropTypes.object
};

export default GetThisOptions;

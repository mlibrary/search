import { Alert } from '../../../reusable';
import { Authentication } from '../../../profile';
import GetThisOption from '../GetThisOption';
import PropTypes from 'prop-types';
import React from 'react';

const GetThisOptions = ({ record }) => {
  if (!record?.getthis) {
    return (
      <Alert>
        <p>Loading holding options...</p>
      </Alert>
    );
  }

  const { options, status } = record.getthis;

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
};

GetThisOptions.propTypes = {
  record: PropTypes.object
};

export default GetThisOptions;

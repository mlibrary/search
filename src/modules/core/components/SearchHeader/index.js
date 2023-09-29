/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Anchor } from '../../../reusable';
import { MEDIA_QUERIES } from '../../../reusable/umich-lib-core-temp';
import { Authentication } from '../../../profile';

function SearchHeader (props) {
  return (
    <m-website-header name='Search' variant='dark' to='/everything'>
      <nav
        aria-label='utility'
        css={{
          background: 'var(--color-blue-400)',
          gridTemplateColumns: 'repeat(4, auto)',
          alignItems: 'baseline',
          display: 'block',
          '& > *': {
            color: 'white',
            display: 'inline-block',
            marginTop: '1rem'
          },
          '& > *:not(:last-child)': {
            marginRight: '1rem',
            marginBottom: '0.5rem'
          },
          a: {
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          },
          [MEDIA_QUERIES.LARGESCREEN]: {
            '& > *': {
              margin: '0'
            },
            '& > *:not(:last-child)': {
              marginBottom: '0'
            }
          }
        }}
      >
        <Anchor href='https://account.lib.umich.edu/'>Account</Anchor>
        <Authentication logout={props.isAuthenticated} />
      </nav>
    </m-website-header>
  );
}

SearchHeader.propTypes = {
  isAuthenticated: PropTypes.bool
};

function mapStateToProps (state) {
  return {
    isAuthenticated: state.profile.status === 'Logged in',
    datastore: state.datastores.active,
    search: state.search
  };
}

export default connect(mapStateToProps)(SearchHeader);

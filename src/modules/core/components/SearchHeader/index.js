/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../../../config';
import { ChooseAffiliation } from '../../../affiliation';
import { MEDIA_QUERIES } from '../../../reusable/umich-lib-core-temp';

function SearchHeader (props) {
  const loginRoot = config.loginUrl;
  const loginUrl =
    loginRoot +
    '?dest=' +
    encodeURIComponent(document.location.pathname + document.location.search);
  const logoutUrl =
    'https://weblogin.umich.edu/cgi-bin/logout?' + document.location;
  const navItems = [
    {
      text: 'Account',
      href: 'https://account.lib.umich.edu/'
    },
    {
      text: `Log ${props.isAuthenticated ? 'out' : 'in'}`,
      href: `${props.isAuthenticated ? logoutUrl : loginUrl}`
    }
  ];

  return (
    <m-website-header name='Search' variant='dark' to='/everything'>
      <nav
        aria-label='utility' css={{
          gridTemplateColumns: 'repeat(4, auto)',
          alignItems: 'baseline',
          display: 'block',
          '& > *': {
            display: 'inline-block',
            marginTop: '1rem'
          },
          '& > *:not(:last-child)': {
            marginRight: '1rem',
            marginBottom: '0.5rem'
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
        {navItems.map((n, i) => {
          return (
            <a
              href={n.href}
              css={{ color: 'white', '&:hover': { textDecoration: 'underline' } }}
              key={i}
            >
              {n.text}
            </a>
          );
        })}
        <ChooseAffiliation />
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

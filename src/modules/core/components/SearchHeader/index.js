import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { ChooseAffiliation } from '../../../affiliation';
import { Anchor } from '../../../reusable';
import { Authentication } from '../../../profile';

function SearchHeader () {
  const isAuthenticated = useSelector((state) => {
    return state.profile.status === 'Logged in';
  });

  return (
    <m-website-header name='Search' variant='dark' to='/everything'>
      <nav aria-label='utility'>
        <Anchor href='https://account.lib.umich.edu/'>Account</Anchor>
        <Authentication logout={isAuthenticated} />
        <ChooseAffiliation />
      </nav>
    </m-website-header>
  );
}

export default SearchHeader;

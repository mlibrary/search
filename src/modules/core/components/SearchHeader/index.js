import './styles.css';
import { Anchor } from '../../../reusable';
import { Authentication } from '../../../profile';
import { ChooseAffiliation } from '../../../affiliation';
import React from 'react';
import { useSelector } from 'react-redux';

const SearchHeader = () => {
  const { status } = useSelector((state) => {
    return state.profile || {};
  });

  return (
    <m-website-header name='Search' variant='dark' to='/everything'>
      <nav aria-label='utility'>
        <Anchor href='https://account.lib.umich.edu/'>Account</Anchor>
        {status && <Authentication logout={status === 'Logged in'} />}
        <ChooseAffiliation />
      </nav>
    </m-website-header>
  );
};

export default SearchHeader;

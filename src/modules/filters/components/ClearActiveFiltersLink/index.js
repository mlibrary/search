/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { getURLWithoutFilters } from '../../utilities';
import { COLORS } from '../../../reusable/umich-lib-core-temp';

export default function ClearActiveFiltersLink () {
  const url = getURLWithoutFilters();

  return (
    <Link
      to={url}
      css={{
        display: 'inline-block',
        textDecoration: 'underline',
        color: COLORS.neutral['300']
      }}
    >
      Clear all active filters
    </Link>
  );
}

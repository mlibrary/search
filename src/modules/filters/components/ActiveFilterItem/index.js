/** @jsxImportSource @emotion/react */
import { useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '../../../reusable';
import { SPACING, COLORS } from '../../../reusable/umich-lib-core-temp';
import { getURLWithFilterRemoved } from '../../utilities';

export default function ActiveFilterItem ({ group, value }) {
  const { groups } = useSelector((state) => {
    return state.filters;
  });
  const url = getURLWithFilterRemoved({ group, value });
  const name = groups[group] ? groups[group].metadata.name : group;

  return (
    <Link
      to={url}
      css={{
        padding: `${SPACING.XS} ${SPACING.S}`,
        color: COLORS.green['500'],
        background: COLORS.green['100'],
        border: `solid 1px ${COLORS.green['200']}`,
        borderRadius: '4px',
        display: 'flex',
        gap: SPACING.XS,
        justifyContent: 'space-between',
        alignItems: 'center',
        ':hover': {
          textDecoration: 'underline'
        }
      }}
    >
      <span>
        {name}: {value}
      </span>
      <Icon icon='close' css={{ flexShrink: 0 }} />
    </Link>
  );
}

ActiveFilterItem.propTypes = {
  group: PropTypes.string,
  value: PropTypes.string
};

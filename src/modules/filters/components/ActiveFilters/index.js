/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { COLORS, MEDIA_QUERIES, SPACING } from '../../../reusable/umich-lib-core-temp';
import { getActiveFilters } from '../../../filters/utilities';
import ActiveFilterItem from '../../../filters/components/ActiveFilterItem';
import ClearActiveFiltersLink from '../../../filters/components/ClearActiveFiltersLink';

export default function ActiveFilters ({ advanced }) {
  const items = getActiveFilters();

  if (!items) {
    return null;
  }

  const clearFilters = items.length > 1 && <ClearActiveFiltersLink />;

  const itemsCount = () => {
    return (
      <span
        css={{
          color: COLORS.neutral['300'],
          fontWeight: 'normal'
        }}
      >
        &nbsp;({items.length})
      </span>
    );
  };

  const sectionStyles = advanced
    ? {
        marginTop: SPACING.XL
      }
    : {
        borderBottom: `solid 1px ${COLORS.neutral['100']}`,
        marginTop: 0,
        padding: `${SPACING.S} ${SPACING.M}`,
        '& > * + *': {
          marginTop: SPACING.XS
        }
      };

  const listItemStyles = advanced && {
    maxWidth: `calc(100% - ${SPACING.XS})%`,
    [MEDIA_QUERIES.LARGESCREEN]: {
      maxWidth: `calc(50% - ${SPACING.XS})`
    },
    [MEDIA_QUERIES.XLSCREEN]: {
      maxWidth: `calc(33% - ${SPACING.XS})`
    }
  };

  return (
    <section
      aria-label='active-filters'
      css={{
        marginTop: SPACING.XL,
        ...sectionStyles
      }}
    >
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: SPACING.XS
        }}
      >
        <h2
          id='active-filters'
          css={{
            fontSize: '1rem',
            margin: '0'
          }}
        >
          Active filters
          {advanced && itemsCount()}
        </h2>
        {advanced && clearFilters}
      </div>

      <ul
        css={{
          display: 'flex',
          flexDirection: advanced ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: SPACING.XS,
          margin: 0,
          marginTop: SPACING.XS,
          listStyle: 'none'
        }}
      >
        {items.map((item, i) => {
          return (
            <li
              key={i + item.group + item.value}
              css={{
                flex: '1 1 100%',
                ...listItemStyles
              }}
            >
              <ActiveFilterItem {...item} />
            </li>
          );
        })}
      </ul>
      {!advanced && clearFilters}
    </section>
  );
}

ActiveFilters.propTypes = {
  advanced: PropTypes.bool
};

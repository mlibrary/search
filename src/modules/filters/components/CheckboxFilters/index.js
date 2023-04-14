/** @jsxImportSource @emotion/react */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { SPACING, COLORS } from '../../../reusable/umich-lib-core-temp';
import Icon from '../../../reusable/components/Icon';

import {
  getURLWithFilterRemoved,
  newSearch
} from '../../utilities';

export default function CheckBoxFiltersContainer () {
  const { filters, datastores } = useSelector((state) => {
    return state;
  });
  const { order, groups } = filters;

  const checkboxes = order.reduce((acc, id) => {
    if (groups[id] && groups[id].type === 'checkbox') {
      acc = acc.concat(groups[id]);
    }

    return acc;
  }, []);

  if (checkboxes.length === 0) {
    return null;
  }

  return (
    <ul css={{
      margin: 0,
      padding: `${SPACING.S} 0`,
      borderBottom: `solid 1px ${COLORS.neutral['100']}`,
      listStyle: 'none'
    }}
    >
      {checkboxes.map((c) => {
        return (
          <li key={datastores.active + '-' + c.uid}>
            <CheckboxFilterContainer uid={c.uid} />
          </li>
        );
      })}
    </ul>
  );
}

function CheckboxFilterContainer ({ uid }) {
  const { datastores, filters } = useSelector((state) => {
    return state;
  });
  const {
    metadata,
    preSelected
  } = filters.groups[uid];

  const isActive = filters.active[datastores.active] && filters.active[datastores.active][uid];

  function isChecked () {
    if (isActive) {
      if (isActive[0] === 'true') {
        return true;
      } else if (isActive[0] === 'false') {
        return false;
      }
    }

    return preSelected;
  }

  function url () {
    if (isActive) {
      return getURLWithFilterRemoved({ group: uid });
    }

    const search = newSearch({ filter: { [uid]: !preSelected }, page: undefined });
    const url = document.location.pathname + '?' + search;

    return url;
  }

  return (
    <CheckboxFilter
      label={metadata.name}
      isChecked={isChecked()}
      url={url()}
    />
  );
}

function CheckboxFilter ({ label, isChecked, url }) {
  return (
    <Link
      to={url} css={{
        display: 'flex',
        padding: `${SPACING['2XS']} ${SPACING.M}`,
        color: COLORS.neutral['400'],
        ':hover': {
          textDecoration: 'underline'
        }
      }}
      role='checkbox'
      aria-checked={isChecked}
      aria-label={label}
    >
      <span
        aria-hidden='true' css={{
          color: isChecked ? '#126DC1' : COLORS.neutral['300'],
          marginRight: SPACING['2XS'],
          lineHeight: '100%'
        }}
      >
        {isChecked
          ? (
            <Icon d='M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' size={22} />
            )
          : (
            <Icon d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' size={22} />
            )}
      </span>
      {label}
    </Link>
  );
}

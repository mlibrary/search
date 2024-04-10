/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { Anchor, Icon } from '../../../reusable';
import { getURLWithFiltersRemoved, newSearch } from '../../utilities';
import PropTypes from 'prop-types';

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
      padding: 'var(--search-spacing-s) 0',
      borderBottom: 'solid 1px var(--ds-color-neutral-100)',
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
  const { metadata, preSelected } = filters.groups[uid];
  const isActive = filters.active[datastores.active] && filters.active[datastores.active][uid];

  return (
    <CheckboxFilter
      label={metadata.name}
      isChecked={isActive ? isActive[0] === 'true' : preSelected}
      url={
        isActive
          ? getURLWithFiltersRemoved({ group: uid, value: isActive[0] })
          : document.location.pathname + '?' + newSearch({ filter: { [uid]: !preSelected }, page: undefined })
      }
    />
  );
}

CheckboxFilterContainer.propTypes = {
  uid: PropTypes.string
};

function CheckboxFilter ({ label, isChecked, url }) {
  return (
    <Anchor
      to={url}
      className='padding-y__2xs padding-x__m'
      css={{
        display: 'flex',
        color: 'var(--ds-color-neutral-400)',
        ':hover': {
          textDecoration: 'underline'
        }
      }}
    >
      <span
        className='margin-right__2xs'
        css={{
          color: isChecked ? 'var(--search-color-blue-400)' : 'var(--ds-color-neutral-300)'
        }}
      >
        <Icon icon={`checkbox_${!isChecked ? 'un' : ''}checked`} size='22' />
      </span>
      {label}
    </Anchor>
  );
}

CheckboxFilter.propTypes = {
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  url: PropTypes.string
};

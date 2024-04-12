/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { Anchor, Icon } from '../../../reusable';
import { getURLWithFiltersRemoved, newSearch } from '../../utilities';
import PropTypes from 'prop-types';

export default function CheckBoxFiltersContainer () {
  const { order, groups } = useSelector((state) => {
    return state.filters;
  });
  const checkboxes = order.reduce((acc, id) => {
    if (groups[id]?.type === 'checkbox') {
      acc = acc.concat(groups[id]);
    }
    return acc;
  }, []);

  if (!checkboxes.length) return null;

  return (
    <ul
      className='list__unstyled padding-y__s'
      style={{
        borderBottom: 'solid 1px var(--ds-color-neutral-100)'
      }}
    >
      {checkboxes.map((checkbox) => {
        return (
          <li key={checkbox.uid}>
            <CheckboxFilter uid={checkbox.uid} />
          </li>
        );
      })}
    </ul>
  );
}

function CheckboxFilter ({ uid }) {
  const { groups, active: activeFilters } = useSelector((state) => {
    return state.filters;
  });
  const { active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const { metadata, preSelected } = groups[uid];
  const isActive = activeFilters[activeDatastore]?.[uid];
  const isChecked = isActive ? isActive[0] === 'true' : preSelected;

  return (
    <Anchor
      to={
        isActive
          ? getURLWithFiltersRemoved({ group: uid, value: isActive[0] })
          : `${document.location.pathname}?${newSearch({ filter: { [uid]: !preSelected }, page: undefined })}`
      }
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
      {metadata.name}
    </Anchor>
  );
}

CheckboxFilter.propTypes = {
  uid: PropTypes.string
};

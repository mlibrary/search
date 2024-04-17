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
    <ul className='list__unstyled padding-y__s active-filters'>
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
  const activeDatastore = useSelector((state) => {
    return state.datastores.active;
  });
  const { metadata, preSelected } = groups[uid];
  const isActive = activeFilters[activeDatastore]?.[uid]?.[0];
  const isChecked = isActive ? isActive === 'true' : preSelected;

  return (
    <Anchor
      to={
        preSelected !== isChecked
          ? getURLWithFiltersRemoved({ group: uid, value: isActive })
          : `${document.location.pathname}?${newSearch({ filter: { [uid]: String(!isChecked) }, page: undefined })}`
      }
      className={`padding-y__2xs padding-x__m flex underline__hover ${isChecked ? 'active-checkbox' : 'inactive-checkbox'}`}
    >
      <Icon icon={`checkbox_${!isChecked ? 'un' : ''}checked`} size='22' />
      {metadata.name}
    </Anchor>
  );
}

CheckboxFilter.propTypes = {
  uid: PropTypes.string
};

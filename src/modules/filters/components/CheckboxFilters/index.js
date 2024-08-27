import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import { getURLWithFiltersRemoved, newSearch } from '../../utilities';
import React from 'react';
import { useSelector } from 'react-redux';

const CheckBoxFilters = () => {
  const { active: activeFilters, groups, order } = useSelector((state) => {
    return state.filters;
  });
  const { active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const checkboxes = order
    .filter((id) => {
      return groups[id]?.type === 'checkbox';
    })
    .map((id) => {
      return groups[id];
    });

  if (!checkboxes.length) {
    return null;
  }

  return (
    <ul className='list__unstyled active-filters'>
      {checkboxes.map(({ uid, metadata, preSelected }, index) => {
        const [isActive] = activeFilters[activeDatastore]?.[uid] || [];
        const isChecked = isActive === 'true' || preSelected;
        return (
          <li key={uid} className={`margin-top__${index === 0 ? 'none' : '2xs'}`}>
            <Anchor
              to={
                preSelected === isChecked
                  ? `${document.location.pathname}?${newSearch({ filter: { [uid]: String(!isChecked) }, page: 1 })}`
                  : getURLWithFiltersRemoved({ group: uid, value: isActive })
              }
              className={`flex underline__hover ${isChecked ? '' : 'in'}active-checkbox`}
            >
              <Icon icon={`checkbox_${isChecked ? 'checked' : 'unchecked'}`} size='22' />
              {metadata.name}
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

export default CheckBoxFilters;

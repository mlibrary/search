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
    .filter((group) => {
      return groups[group]?.type === 'checkbox';
    })
    .map((group) => {
      const { metadata, preSelected, uid } = groups[group];
      return { metadata, preSelected, uid };
    });

  if (!checkboxes.length) {
    return null;
  }

  const activeDatastoreFilters = activeFilters?.[activeDatastore];

  return (
    <ul className='list__unstyled active-filters'>
      {checkboxes.map(({ metadata: { name }, preSelected, uid }) => {
        const isChecked = JSON.parse(activeDatastoreFilters?.[uid]?.[0] ?? String(preSelected));
        return (
          <li key={uid}>
            <Anchor
              to={
                preSelected === isChecked
                  ? `${document.location.pathname}?${newSearch({ filter: { [uid]: String(!isChecked) }, page: 1 })}`
                  : getURLWithFiltersRemoved({ group: uid, value: isChecked })
              }
              className={`flex underline__hover ${isChecked ? '' : 'in'}active-checkbox`}
            >
              <Icon icon={`checkbox_${isChecked ? '' : 'un'}checked`} size='22' />
              {name}
            </Anchor>
          </li>
        );
      })}
    </ul>
  );
};

export default CheckBoxFilters;

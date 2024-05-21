import { Anchor, Icon } from '../../../reusable';
import { getURLWithFiltersRemoved, newSearch } from '../../utilities';
import React from 'react';
import { useSelector } from 'react-redux';

const CheckBoxFiltersContainer = () => {
  const { active: activeFilters, groups, order } = useSelector((state) => {
    return state.filters;
  });
  const activeDatastore = useSelector((state) => {
    return state.datastores.active;
  });
  const checkboxes = order.reduce((acc, id) => {
    if (groups[id]?.type === 'checkbox') {
      return acc.concat(groups[id]);
    }
    return acc;
  }, []);

  if (!checkboxes.length) {
    return null;
  }

  return (
    <ul className='list__unstyled padding-y__s active-filters'>
      {checkboxes.map((checkbox) => {
        const { uid } = checkbox;
        const { metadata, preSelected } = groups[uid];
        const isActive = activeFilters[activeDatastore]?.[uid]?.[0];
        const isChecked = isActive ? isActive === 'true' : preSelected;
        return (
          <li key={uid}>
            <Anchor
              to={
                preSelected === isChecked
                  ? `${document.location.pathname}?${newSearch({ filter: { [uid]: String(!isChecked) }, page: 1 })}`
                  : getURLWithFiltersRemoved({ group: uid, value: isActive })
              }
              className={`padding-y__2xs padding-x__m flex underline__hover ${isChecked ? 'active-checkbox' : 'inactive-checkbox'}`}
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

export default CheckBoxFiltersContainer;

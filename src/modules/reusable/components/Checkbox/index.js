import React from 'react';
import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';

function Checkbox ({ isChecked, handleClick, label, hideLabel, uid }) {
  return (
    <div
      className='checkbox'
      role='checkbox'
      aria-checked={!!isChecked}
      tabIndex='0'
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.code === 'Space') {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <span className={`filter-checkbox-${!isChecked ? 'un' : ''}checked`}>
        <Icon icon={`checkbox_${!isChecked ? 'un' : ''}checked`} className='icon' size='22' />
      </span>
      <span className={hideLabel ? 'offscreen' : 'filter-name'}>
        {label}
      </span>
      {uid && (
        <span aria-hidden='true' className='visually-hidden'>
          {uid}
        </span>
      )}
    </div>
  );
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  uid: PropTypes.string
};

export default Checkbox;

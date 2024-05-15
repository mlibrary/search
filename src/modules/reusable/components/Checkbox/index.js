import { Icon } from '../../../reusable';
import PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({ handleClick, hideLabel, isChecked, label, uid }) => {
  return (
    <div
      className='checkbox'
      role='checkbox'
      aria-checked={Boolean(isChecked)}
      tabIndex='0'
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.code === 'Space') {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <span className={`filter-checkbox-${isChecked ? '' : 'un'}checked`}>
        <Icon icon={`checkbox_${isChecked ? '' : 'un'}checked`} className='icon' size='22' />
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
};

Checkbox.propTypes = {
  handleClick: PropTypes.func,
  hideLabel: PropTypes.bool,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  uid: PropTypes.string
};

export default Checkbox;

import React from 'react';
import Icon from '../Icon';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  render () {
    const {
      isChecked,
      handleClick,
      label,
      hideLabel,
      uid
    } = this.props;

    const labelTextClassName = hideLabel ? 'offscreen' : 'filter-name';

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
        {isChecked
          ? (
            <span className='filter-checkbox-checked'>
              <Icon name='checkbox-checked' />
            </span>
            )
          : (
            <span className='filter-checkbox-unchecked'>
              <Icon name='checkbox-unchecked' />
            </span>
            )}
        <span className={labelTextClassName}>
          {label}
        </span>
        {uid &&
          (
            <span aria-hidden='true' className='visually-hidden'>
              {uid}
            </span>
          )}
      </div>
    );
  }
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  uid: PropTypes.string
};

export default Checkbox;

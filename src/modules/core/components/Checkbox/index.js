import React from 'react';
import Icon from '../Icon';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  render () {
    const {
      isChecked,
      handleClick,
      label,
      hideLabel
    } = this.props;

    const labelTextClassName = hideLabel ? 'offscreen' : 'filter-name';

    return (
      <label
        role='checkbox'
        aria-checked={isChecked}
        className='checkbox-label'
        tabIndex='0'
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.code === 'Space') {
            event.preventDefault();
            handleClick();
          }
        }}
      >
        <div className='checkbox'>
          {isChecked
            ? (
              <span className='filter-checkbox-checked'><Icon name='checkbox-checked' /></span>
              )
            : (
              <Icon name='checkbox-unchecked' />
              )}
        </div>
        <span
          className={labelTextClassName}
        >{label}
        </span>
      </label>
    );
  }
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  hideLabel: PropTypes.bool
};

export default Checkbox;

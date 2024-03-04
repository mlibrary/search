import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  disabled,
  className,
  kind,
  type,
  small,
  ...other
}) => {
  let buttonClasses = 'btn';
  buttonClasses += small ? ' btn--small' : '';
  buttonClasses += kind === 'start' ? ' btn--start' : '';
  buttonClasses += kind === 'primary' ? ' btn--primary' : '';
  buttonClasses += kind === 'secondary' ? ' btn--secondary' : '';
  buttonClasses += kind === 'tertiary' ? ' btn--tertiary' : '';

  if (className) {
    buttonClasses += ` ${className}`;
  }

  const commonProps = {
    className: buttonClasses
  };

  return (
    <button {...other} {...commonProps} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  kind: PropTypes.oneOf([
    'start',
    'primary',
    'secondary',
    'tertiary'
  ]).isRequired,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  small: false,
  kind: 'primary'
};

export default Button;

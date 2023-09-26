import React from 'react';
import classNames from 'classnames';
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
  const buttonClasses = classNames(className, {
    btn: true,
    'btn--small': small,
    'btn--start': kind === 'start',
    'btn--primary': kind === 'primary',
    'btn--secondary': kind === 'secondary',
    'btn--tertiary': kind === 'tertiary'
  });

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

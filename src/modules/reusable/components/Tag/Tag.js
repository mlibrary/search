import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Tag.css'

const Tag = ({
  children,
  className,
  small,
  onRemove,
  ...other
}) => {
  const buttonClasses = classNames(className, {
    'tag': true,
    'tag--small': small
  });

  const remove = (
    <button className="tag-remove" onClick={onRemove}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <title>Remove</title>
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
  )

  return (
    <span {...other} className={buttonClasses}>
      <span className="tag-children">{children}</span>
      {onRemove && remove}
    </span>
  )
}

Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  small: PropTypes.bool,
  onRemove: PropTypes.func
};

Tag.defaultProps = {
  small: false
};

export default Tag;

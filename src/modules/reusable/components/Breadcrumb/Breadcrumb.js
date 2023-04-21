import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Breadcrumb.css';

const BreadcrumbItem = ({
  item,
  renderAnchor
}) => {
  if (item.href) {
    return (
      <a href={item.href}>{item.text}</a>
    );
  }
  if (item.to) {
    return (
      renderAnchor(item)
    );
  }
  return item.text;
};

const Breadcrumb = ({
  className,
  items,
  renderAnchor,
  ...other
}) => {
  const classNames = classnames(className, {
    breadcrumb: true
  });
  return (
    <ol className={classNames} {...other}>
      {items.map((item, i) => {
        return (
          <li className='breadcrumb__item' key={i}>
            <BreadcrumbItem item={item} renderAnchor={renderAnchor} />
          </li>
        );
      })}
    </ol>
  );
};

Breadcrumb.propTypes = {
  className: PropTypes.string,
  /**
    Breadcrumb items are objects that contain text and an optional to or href attribute.
  */
  items: PropTypes.array,
  /**
    A render prop to handle the nav object `to` prop.
  */
  renderAnchor: PropTypes.func
};

export default Breadcrumb;

import Anchor from '../Anchor';
import PropTypes from 'prop-types';
import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <ol className='breadcrumb'>
      {items.map((item, index) => {
        return (
          <li className='breadcrumb__item' key={index}>
            {(item.href || item.to) ? <Anchor href={item.href} to={item.to}>{item.text}</Anchor> : item.text}
          </li>
        );
      })}
    </ol>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.array
};

export default Breadcrumb;

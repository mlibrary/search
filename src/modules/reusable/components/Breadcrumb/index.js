import Anchor from '../Anchor';
import PropTypes from 'prop-types';
import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <ol className='breadcrumb'>
      {items.map((item, index) => {
        const { href, text, to } = item;
        return (
          <li className='breadcrumb__item' key={index}>
            {(href || to) ? <Anchor {...{ href, to }}>{text}</Anchor> : text}
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

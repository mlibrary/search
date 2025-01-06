import Anchor from '../Anchor';
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

export default Breadcrumb;

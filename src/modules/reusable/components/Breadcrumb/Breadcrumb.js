import React from 'react';
import Anchor from '../Anchor';
import PropTypes from 'prop-types';

function Breadcrumb (props) {
  return (
    <ol className='breadcrumb'>
      {props.items.map((item, i) => {
        return (
          <li className='breadcrumb__item' key={i}>
            {item.href || item.to ? <Anchor href={item.href} to={item.to}>{item.text}</Anchor> : item.text}
          </li>
        );
      })}
    </ol>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.array
};

export default Breadcrumb;

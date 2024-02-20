import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setA11yMessage } from '../../../a11y';
import PropTypes from 'prop-types';

function ShowAllSpecialists (props) {
  const [showSpecialists, setShowSpecialists] = useState(false);
  const { children, show } = props;
  const message = (a11y = false) => {
    return `Show${a11y ? 'ing' : ''} ${showSpecialists ? 'fewer' : `all ${children.length}`} Library Specialists`;
  };
  const toggleSpecialists = () => {
    props.setA11yMessage(message(true));
    setShowSpecialists(!showSpecialists);
  };

  return (
    <>
      <div className='specialists__list'>
        {children.map((child, index) => {
          if (showSpecialists || (show > index)) {
            return child;
          }
          return null;
        })}
      </div>
      {children.length > show && (
        <button
          onClick={toggleSpecialists}
          className='btn btn--tertiary btn--small'
          aria-expanded={showSpecialists}
        >
          {message()}
        </button>
      )}
    </>
  );
}

ShowAllSpecialists.propTypes = {
  setA11yMessage: PropTypes.func,
  show: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ShowAllSpecialists.defaultProps = {
  show: 3
};

export default connect(null, { setA11yMessage })(ShowAllSpecialists);

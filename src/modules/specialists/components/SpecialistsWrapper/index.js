import React from 'react';
import SpecialistList from '../SpecialistList';
import PropTypes from 'prop-types';

function SpecialistsWrapper (props) {
  const { children, position, show } = props;
  return (
    <>
      {children.map((child, index) => {
        return (
          <React.Fragment key={`record-specialist-${index}`}>
            {index === position && <SpecialistList show={show} />}
            {child}
          </React.Fragment>
        );
      })}
    </>
  );
}

SpecialistsWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  position: PropTypes.number,
  show: PropTypes.number
};

SpecialistsWrapper.defaultProps = {
  position: 2,
  show: 3
};

export default SpecialistsWrapper;

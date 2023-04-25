import React from 'react';
import SpecialistList from '../SpecialistList';
import PropTypes from 'prop-types';

class SpecialistsWrapper extends React.Component {
  render () {
    const children = this.props.children;
    const position = this.props.position || 2;
    const show = this.props.show || 3;

    return (
      <>
        {React.Children.map(children, (child, i) => {
          return (
            <>
              {i === position
                ? (
                  <SpecialistList show={show} />
                  )
                : null}
              {child}
            </>
          );
        })}
      </>
    );
  }
}

SpecialistsWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  position: PropTypes.number,
  show: PropTypes.number
};

export default SpecialistsWrapper;

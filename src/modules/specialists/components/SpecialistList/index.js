import React from 'react';
import { connect } from 'react-redux';
import { Anchor } from '../../../reusable';
import { Icon } from '../../../core';
import ShowAllSpecialists from '../ShowAllSpecialists';
import Specialist from '../Specialist';
import PropTypes from 'prop-types';

const SpecialistList = ({
  loadingUserData,
  show,
  specialists
}) => {
  if (loadingUserData || !specialists || !specialists.length) {
    return null;
  }

  return (
    <>
      <article className='specialists'>
        <div className='specialists__inner-container'>
          <div className='specialists__heading'>
            <h2>Talk to a Library Specialist</h2>
            <Anchor href='https://www.lib.umich.edu/research-and-scholarship/help-research/find-specialist'>
              Find more specialists
              <Icon name='launch' />
            </Anchor>
          </div>
          <section className='specialists__content'>
            <ShowAllSpecialists show={show}>
              {specialists.map((person, index) => {
                return (
                  <Specialist key={index} person={person} />
                );
              })}
            </ShowAllSpecialists>
          </section>
        </div>
      </article>
    </>
  );
};

SpecialistList.propTypes = {
  loadingUserData: PropTypes.bool,
  show: PropTypes.number,
  specialists: PropTypes.array
};

function mapStateToProps (state) {
  return {
    specialists: state.specialists
  };
}

export default connect(mapStateToProps)(SpecialistList);

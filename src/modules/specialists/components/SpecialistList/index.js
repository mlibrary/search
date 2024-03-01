import React from 'react';
import { Anchor } from '../../../reusable';
import { Icon } from '../../../core';
import ShowAllSpecialists from '../ShowAllSpecialists';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SpecialistList = ({ loadingUserData, show, specialists }) => {
  if (loadingUserData || !specialists?.length) {
    return null;
  }

  return (
    <article className='specialists'>
      <div className='specialists__inner-container'>
        <div className='specialists__heading'>
          <h2 className='specialist__heading'>Talk to a Library Specialist</h2>
          <Anchor href='https://www.lib.umich.edu/research-and-scholarship/help-research/find-specialist'>
            Find more specialists
            <Icon name='launch' />
          </Anchor>
        </div>
        <section className='specialists__content'>
          <ShowAllSpecialists show={show}>
            {specialists.map((specialist, index) => {
              return (
                <article className='specialist' key={`specialist-${index}`}>
                  <img src={specialist.picture} alt='' className='specialist__picture' />
                  <section>
                    <h3 className='specialist__heading'>
                      <Anchor href={specialist.url}>
                        {specialist.name}
                        <Icon name='launch' />
                      </Anchor>
                    </h3>
                    {specialist.job_title && (<p>{specialist.job_title}</p>)}
                    {(specialist.phone && specialist.phone !== '000-000-0000') && (<Anchor href={`tel:+1-${specialist.phone}`}>{specialist.phone}</Anchor>)}
                    {specialist.email && (<Anchor href={`mailto:${specialist.email}`}>{specialist.email}</Anchor>)}
                  </section>
                </article>
              );
            })}
          </ShowAllSpecialists>
        </section>
      </div>
    </article>
  );
};

SpecialistList.propTypes = {
  loadingUserData: PropTypes.bool,
  show: PropTypes.number,
  specialists: PropTypes.array
};

export default connect((state) => {
  return {
    specialists: state.specialists
  };
})(SpecialistList);

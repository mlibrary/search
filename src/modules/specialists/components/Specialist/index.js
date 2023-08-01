import React from 'react';
import { Icon } from '../../../core';
import PropTypes from 'prop-types';

const Specialist = ({ person }) => {
  return (
    <article className='specialist'>
      <div>
        <img src={person.picture} alt='' className='specialist__picture' />
      </div>
      <div>
        <h3 className='specialist__heading'>
          <a href={person.url}>
            {person.name}
            <Icon name='launch' />
          </a>
        </h3>
        <section>
          <p className='specialist__job-title'>{person.job_title}</p>
          <p className='specialist__phone'>{person.phone}</p>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </section>
      </div>
    </article>
  );
};

Specialist.propTypes = {
  person: PropTypes.object
};

export default Specialist;

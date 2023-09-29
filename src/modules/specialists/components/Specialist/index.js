import React from 'react';
import { Anchor } from '../../../reusable';
import { Icon } from '../../../core';
import PropTypes from 'prop-types';

function Specialist ({ person }) {
  return (
    <article className='specialist'>
      <div>
        <img src={person.picture} alt='' className='specialist__picture' />
      </div>
      <div>
        <h3 className='specialist__heading'>
          <Anchor href={person.url}>
            {person.name}
            <Icon name='launch' />
          </Anchor>
        </h3>
        <section>
          <p className='specialist__job-title'>{person.job_title}</p>
          <p className='specialist__phone'>{person.phone}</p>
          <Anchor href={`mailto:${person.email}`}>{person.email}</Anchor>
        </section>
      </div>
    </article>
  );
};

Specialist.propTypes = {
  person: PropTypes.object
};

export default Specialist;

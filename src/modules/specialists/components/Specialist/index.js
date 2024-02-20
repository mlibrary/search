import React from 'react';
import { Anchor } from '../../../reusable';
import { Icon } from '../../../core';
import PropTypes from 'prop-types';

function Specialist ({ person }) {
  return (
    <article className='specialist'>
      <img src={person.picture} alt='' className='specialist__picture' />
      <section>
        <h3 className='specialist__heading'>
          <Anchor href={person.url}>
            {person.name}
            <Icon name='launch' />
          </Anchor>
        </h3>
        {person.job_title && (<p>{person.job_title}</p>)}
        {(person.phone && person.phone !== '000-000-0000') && (<Anchor href={`tel:+1-${person.phone}`}>{person.phone}</Anchor>)}
        {person.email && (<Anchor href={`mailto:${person.email}`}>{person.email}</Anchor>)}
      </section>
    </article>
  );
};

Specialist.propTypes = {
  person: PropTypes.object
};

export default Specialist;

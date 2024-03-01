import React, { useState } from 'react';
import './styles.css';
import { Anchor } from '../../../reusable';
import { Icon } from '../../../core';
import PropTypes from 'prop-types';
import { setA11yMessage } from '../../../a11y';
import { connect } from 'react-redux';

const Specialists = ({ loadingUserData, show = 3, specialists, setA11yMessage }) => {
  const [showSpecialists, setShowSpecialists] = useState(false);
  const specialistsLength = specialists?.length;

  if (loadingUserData || !specialistsLength) {
    return null;
  }

  const message = (a11y = false) => {
    return `Show${a11y ? 'ing' : ''} ${showSpecialists ? 'fewer' : `all ${specialistsLength}`} Library Specialists`;
  };
  const toggleSpecialists = () => {
    setA11yMessage(message(true));
    setShowSpecialists(!showSpecialists);
  };

  return (
    <section className='container__rounded specialists'>
      <header>
        <h2 className='specialists__heading'>Talk to a Library Specialist</h2>
        <Anchor href='https://www.lib.umich.edu/research-and-scholarship/help-research/find-specialist'>
          Find more specialists
          <Icon name='launch' />
        </Anchor>
      </header>
      <ol className='specialists__list'>
        {specialists.map((specialist, index) => {
          if (showSpecialists || (show > index)) {
            return (
              <li className='specialist' key={`specialist-${index}`}>
                <img src={specialist.picture} alt='' className='specialist__picture' />
                <section>
                  <h3 className='specialists__heading'>
                    <Anchor href={specialist.url}>
                      {specialist.name}
                      <Icon name='launch' />
                    </Anchor>
                  </h3>
                  {specialist.job_title && (<p>{specialist.job_title}</p>)}
                  {(specialist.phone && specialist.phone !== '000-000-0000') && (<Anchor href={`tel:+1-${specialist.phone}`}>{specialist.phone}</Anchor>)}
                  {specialist.email && (<Anchor href={`mailto:${specialist.email}`}>{specialist.email}</Anchor>)}
                </section>
              </li>
            );
          }
          return null;
        })}
      </ol>
      {specialistsLength > show && (
        <button
          onClick={toggleSpecialists}
          className='btn btn--tertiary btn--small'
          aria-expanded={showSpecialists}
        >
          {message()}
        </button>
      )}
    </section>
  );
};

Specialists.propTypes = {
  setA11yMessage: PropTypes.func,
  loadingUserData: PropTypes.bool,
  show: PropTypes.number,
  specialists: PropTypes.array
};

export default connect((state) => {
  return {
    specialists: state.specialists
  };
}, { setA11yMessage })(Specialists);

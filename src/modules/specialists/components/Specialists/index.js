import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setA11yMessage } from '../../../a11y';

const Specialists = ({ show = 3 }) => {
  const [showSpecialists, setShowSpecialists] = useState(false);
  const specialists = useSelector((state) => {
    return state.specialists;
  });
  const dispatch = useDispatch();
  const specialistsLength = specialists?.length;

  if (!specialistsLength) {
    return null;
  }

  const message = (a11y) => {
    return `Show${a11y ? 'ing' : ''} ${showSpecialists ? 'fewer' : `all ${specialistsLength}`} Library Specialists`;
  };
  const toggleSpecialists = () => {
    dispatch(setA11yMessage(message(true)));
    setShowSpecialists(!showSpecialists);
  };

  return (
    <section className='container__rounded specialists'>
      <div className='flex flex__responsive padding__m padding-y__s specialists-heading'>
        <h2 className='size__inherit strong margin__none'>Talk to a Library Specialist</h2>
        <Anchor href='https://www.lib.umich.edu/research-and-scholarship/help-research/find-specialist'>
          Find more specialists
          <Icon icon='open_in_new' size='18' className='icon' />
        </Anchor>
      </div>
      <ol className='list__unstyled specialists__list'>
        {specialists.map((specialist, index) => {
          const { picture, url, name, job_title: jobTitle, phone, email } = specialist;
          if (showSpecialists || (show > index)) {
            return (
              <li className='padding__m specialist' key={`specialist-${index}`}>
                <img src={picture} alt='' className='specialist__picture' />
                <section>
                  <h3 className='size__inherit strong margin__none'>
                    <Anchor href={url}>
                      {name}
                      <Icon icon='open_in_new' size='18' className='icon' />
                    </Anchor>
                  </h3>
                  {jobTitle && <p className='margin-y__xs'>{jobTitle}</p>}
                  {(phone !== '000-000-0000' && phone) && <Anchor href={`tel:+1-${phone}`}>{phone}</Anchor>}
                  {email && <Anchor href={`mailto:${email}`}>{email}</Anchor>}
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
          className='center-text padding__m btn btn--tertiary btn--small'
          aria-expanded={showSpecialists}
        >
          {message()}
        </button>
      )}
    </section>
  );
};

export default Specialists;

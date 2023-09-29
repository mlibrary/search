import React from 'react';
import { Anchor, Icon } from '../../../reusable';

const Feedback = () => {
  return (
    <aside className='container container-narrow feedback-container'>
      <Anchor
        href='https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Give feedback about this page - Opens in new window'
        style={{ padding: '.15em' }}
      >
        Give feedback about this page
        <Icon
          icon='open_in_new'
          size={22}
          style={{ paddingLeft: '.25em' }}
        />
      </Anchor>
    </aside>
  );
};

export default Feedback;

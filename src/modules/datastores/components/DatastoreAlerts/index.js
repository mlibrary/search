/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  SPACING,
  COLORS,
  Margins
} from '../../../reusable/umich-lib-core-temp';
import { Anchor, Button, Icon } from '../../../reusable/';

function COVIDAlert () {
  const [dismissed, setDismissed] = useState(false);
  const { datastores } = useSelector((state) => {
    return state;
  });

  if (dismissed) {
    return null;
  }

  if (datastores.active === 'mirlyn' || datastores.active === 'everything') {
    return (
      <div
        css={{
          padding: SPACING.S,
          background: COLORS.orange['100'],
          borderBottom: `solid 1px ${COLORS.orange['300']}`,
          paddingBottom: SPACING.L
        }}
        role='alert'
      >
        <Margins>
          <h2
            className='heading-xlarge'
            css={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icon
              icon='error'
              size={24}
              css={{ marginRight: SPACING.XS, color: COLORS.orange['400'] }}
            />
            <span>Important message</span>
          </h2>
          <p>
            Log in to view Get This options for items in our catalog while building access is limited. <Anchor href='https://guides.lib.umich.edu/c.php?g=914690&p=7402383'>Learn more about access changes due to COVID-19</Anchor>.
          </p>
          <Button
            onClick={() => {
              return setDismissed(true);
            }}
            kind='secondary'
            css={{
              color: 'inherit'
            }}
          >
            Dismiss this message
          </Button>
        </Margins>
      </div>
    );
  }

  return null;
}

export default function DatastoreAlerts () {
  return (
    <>
      <COVIDAlert />
    </>
  );
}

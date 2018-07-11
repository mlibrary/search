import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, object } from '@storybook/addon-knobs';

import Header from './Header';

storiesOf('Headers', module)
  .add('Header',
    withInfo(`
      Website header
    `)(() =>
      <Header
        name={text('Name', 'Site Name')}
        url={text('URL', '#')}
        renderAnchor={(data) => (
          <a className="rendered-prop-anchor-example" href={data.to}>{data.text}</a>
        )}
        nav={object('nav', [
          { text: 'About', to: '/about' },
          { text: 'My Account', href: 'https://www.lib.umich.edu/my-account/' }
        ])}
      />
    )
  )

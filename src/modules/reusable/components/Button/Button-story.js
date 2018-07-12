import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { text, boolean, select } from '@storybook/addon-knobs';

import Button from '../Button';

storiesOf('Buttons', module)
  .add('Button',
    withInfo(`
      Configure
    `)(() =>
      <Button kind={select('Kind', ['primary', 'secondary', 'tertiary'], 'primary')} disabled={boolean('Disabled', false)} small={boolean('Small', false)} href={text('href', '')}>
        {text('Text', 'Button text')}
      </Button>
    )
  )
  .add('Primary buttons',
    withInfo(`
      ~~~js
      <Button>Primary button</Button>
      ~~~

      Use buttons to move though a transaction. Aim to use only one primary button per page.

      Primary buttons should be used for the principle call to action
      on the page. Modify the behavior of the button by changing its event properties.

      The example below shows Primary Button component.
    `)(() =>
      <div>
        <Button onClick={action('Button clicked')} kind="primary">Primary button</Button>
        &nbsp;
        <Button onClick={action('Button clicked')} kind="primary" href="#">Primary link</Button>
      </div>
    )
  )
  .add('Secondary buttons',
    withInfo(`
      Buttons are used to initialize an action, either in the background or foreground of an experience. Secondary buttons should be used for secondary actions on each page.

      Modify the behavior of the button by changing its property events. The example below shows a Secondary Button component.
    `)(() =>
      <div>
        <Button onClick={action('Button clicked')} kind="secondary">Secondary button</Button>
        &nbsp;
        <Button onClick={action('Button clicked')} kind="secondary" href="#">Secondary link</Button>
      </div>
    )
  )
  .add('Tertiary buttons',
    withInfo(`
      Tertiary buttons are best used for small UI interactions that don't require a strong presence on the page.
    `)(() =>
      <div>
        <Button onClick={action('Button clicked')} kind="tertiary">Tertiary button</Button>
        &nbsp;
        <Button onClick={action('Button clicked')} kind="tertiary" href="#">Tertiary link</Button>
      </div>
    )
  )
  .add('Small buttons',
    withInfo(`
      Small buttons may be used when there is not enough vertical space for a regular sized button. This issue is most
      commonly found in tables. Small buttons should have three words or less.
    `)(() =>
      <div>
        <Button onClick={action('Button clicked')} kind="primary" small={true}>Primary</Button>
        &nbsp;
        <Button onClick={action('Button clicked')} kind="secondary" small={true}>Secondary</Button>
        &nbsp;
        <Button onClick={action('Button clicked')} kind="tertiary" small={true}>Tertiary</Button>
      </div>
    )
  )
  .add('Start buttons',
    withInfo(`
      Use buttons to move though a transaction. Aim to use only one primary button per page.

      Launch your service with a "Start now" button.
    `)(() =>
      <div>
        <Button onClick={action('Button clicked')} kind="start">Start button</Button>
        &nbsp;
        <Button onClick={action('Button clicked')} kind="start" href="#">Start link</Button>
      </div>
    )
  )

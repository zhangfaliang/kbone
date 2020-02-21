import React from 'react';
import { storiesOf } from '@storybook/react';
import MyComponent from './button/index';

storiesOf('MyComponent', module)
  .addDecorator(story => <div style={{ textAlign: 'center' }}>{story()}</div>)
  .add('without props', () => <MyComponent />)
  .add('with some props', () => <MyComponent text="The Comp" />);

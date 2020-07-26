import React from 'react';
import Button from '../elements/Button';

export default {
  title: 'Button',
  component: Button
};

export const ToStorybook = () => <Button />;

ToStorybook.story = {
  name: 'Primary button'
};

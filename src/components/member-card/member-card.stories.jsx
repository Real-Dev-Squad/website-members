import React from 'react';

import Card from './index';

const CardStory = {
  title: '@components/Member-Card',
  component: Card,
  argTypes: {},
};

const Template = (args) => <Card developerInfo={args} />;

const IndicatorItem = Template.bind({});
IndicatorItem.args = {
  username: 'sumit',
  first_name: 'Sumit',
  last_name: 'Dhanania',
  img_url: 'http://test.png',
  isMember: true,
};

export default CardStory;
export { IndicatorItem };

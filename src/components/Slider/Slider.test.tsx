import React from 'react';
import styles from './styles.css';
import { shallow } from 'enzyme';

import Slider from '.';
import { noop } from '../../utils';

it('renders', () => {
  shallow(<Slider min={0} max={100} value={30} onValueChange={noop} />);
});

it('sets width of div based on value.', () => {
  const wrapper = shallow(
    <Slider min={0} max={100} value={30} onValueChange={noop} />
  );

  const bar = wrapper.find(`.${styles.bar}`);
  const { style } = bar.props();
  expect(style!.width).toEqual('30%');
});
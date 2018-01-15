// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { SliderInput } from './Slider';

it('renders', () => {
  shallow(<SliderInput min={0} max={100} onValueChange={() => {}} />);
});

it('calls onValueChange when the slider moves', () => {
  const onValueChange = jest.fn();
  const wrapper = shallow(
    <SliderInput min={0} max={100} onValueChange={onValueChange} />
  );

  wrapper.find('input').simulate('change', { target: { value: 20 } });

  expect(onValueChange).toHaveBeenCalledWith(20);
});

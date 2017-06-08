import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import ItemPlaceholder from './ItemPlaceholder';

test('test ItemPlaceholder component', (t) => {
  const wrapper = shallow(<ItemPlaceholder />);
  t.is(wrapper.find('div').length, 1, 'should render a div with message');
  t.end();
});

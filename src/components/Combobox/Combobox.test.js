import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Combobox from './Combobox';

const data = ['first', 'second', 'third'];

test('combobox renders options with first selected by default', (t) => {
  const wrapper = shallow(<Combobox options={data} />);
  t.assert(wrapper.matchesElement(
    <select value={data[0]}>
      <option value="first">first</option>
      <option value="second">second</option>
      <option value="third">third</option>
    </select>,
  ), 'render does not match mock data');
  t.end();
});

test('combobox selects options based on props', (t) => {
  const wrapper = shallow(<Combobox options={data} selected={data[1]} />);
  t.assert(wrapper.matchesElement(
    <select value={data[1]}>
      <option value="first">first</option>
      <option value="second">second</option>
      <option value="third">third</option>
    </select>,
  ), 'selection does not match \'selected\' prop');
  t.end();
});

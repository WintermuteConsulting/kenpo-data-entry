import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import ListBox from './ListBox';

test('listbox renders a select element with size=2 by default', (t) => {
  const wrapper = shallow(<ListBox />);
  t.assert(wrapper.matchesElement(<select size={2} />));
  t.end();
});

const mock = [
  { id: 'abc', value: 'one' },
  { id: 'def', value: 'two' },
  { id: 'ghi', value: 'three' },
];

test('listbox has no selection by default', (t) => {
  const wrapper = shallow(<ListBox options={mock} />);
  t.notok(wrapper.state('value'), '\'value\' should not be set by default');
  t.end();
});

test('listbox renders options with size=option count', (t) => {
  const wrapper = shallow(<ListBox options={mock} />);
  t.is(wrapper.prop('size'), mock.length, 'incorrect size attribute');
  t.is(wrapper.find('option').length, mock.length, 'incorrect number of options');
  wrapper.find('option').forEach(
    (node, i) => {
      const data = mock[i];
      t.assert(
        node.matchesElement(
          <option key={data.id} value={data.value}>
            {data.value}
          </option>),
        'option element key/value does not match');
    });
  t.end();
});

test('listbox applies initial value', (t) => {
  const expected = mock[2];
  const wrapper = shallow(<ListBox options={mock} value={expected.value} />);
  t.is(wrapper.state('value'), expected.value, '\'value\' is not set to the expected value');
  t.end();
});

test('listbox clicks change the selection', (t) => {
  const wrapper = shallow(<ListBox options={mock} />);
  wrapper.find('select').simulate('change', { target: { value: 'three' } });
  t.is(wrapper.state('value'), 'three', '\'value\' is not set to the expected value');
  t.end();
});

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

test('text input renders an input element with type=text', (t) => {
  const wrapper = shallow(<TextInput />);
  t.assert(wrapper.matchesElement(<input type="text" />), 'rendered element is not the correct type');
  t.end();
});

test('text input has an empty value by default', (t) => {
  const wrapper = shallow(<TextInput />);
  t.is(wrapper.state('value'), '', 'value is not empty');
  t.end();
});

test('text input applies a passed-in value', (t) => {
  const mock = 'starting state';
  const wrapper = shallow(<TextInput value={mock} />);
  t.is(wrapper.state('value'), mock, 'value is not empty');
  t.end();
});

test('text input can change its value', (t) => {
  const mock = 'hello';
  const wrapper = shallow(<TextInput />);
  wrapper.find('input').simulate('change', { target: { value: mock } });
  t.is(wrapper.state('value'), mock, '\'value\' does not match the expected value');
  t.end();
});

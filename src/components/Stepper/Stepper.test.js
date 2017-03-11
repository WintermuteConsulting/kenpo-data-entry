import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Stepper from './Stepper';

test('stepper renders a number input', (t) => {
  const wrapper = shallow(<Stepper min={0} max={5} step={1} />);
  t.assert(wrapper.matchesElement(<input type="number" />), 'number input is not rendered');
  t.end();
});

test('stepper applies default props', (t) => {
  const wrapper = shallow(<Stepper min={0} max={5} step={1} />);
  t.is(wrapper.prop('min'), 0, '\'min\' prop does not match the expected value');
  t.is(wrapper.prop('max'), 5, '\'max\' prop does not match the expected value');
  t.is(wrapper.prop('step'), 1, '\'step\' prop does not match the expected value');
  t.end();
});

test('stepper initializes state to the minimum value by default', (t) => {
  const wrapper = shallow(<Stepper min={1} max={5} step={1} />);
  t.is(wrapper.prop('value'), 1, 'state is not set to the expected value');
  t.end();
});

test('stepper applies initial state if supplied', (t) => {
  const wrapper = shallow(<Stepper min={1} max={5} step={1} start={2} />);
  t.is(wrapper.prop('value'), 2, 'state is not set to the start value');
  t.end();
});

test('stepper clamps start value to [min, max]', (t) => {
  const wrapper = shallow(<Stepper min={0} max={5} step={1} start={7} />);
  t.is(wrapper.prop('value'), 0, 'state is not set to the minimum value');
  t.end();
});

test('stepper applies an onChange function', (t) => {
  const wrapper = shallow(<Stepper min={0} max={5} step={1} />);
  t.ok(wrapper.prop('onChange'), 'missing onChange function');
  t.end();
});

test('stepper clamps direct input to [min, max]', (t) => {
  const wrapper = shallow(<Stepper min={1} max={5} step={1} />);
  wrapper.find('input').simulate('change', { target: { value: 7 } });
  t.is(wrapper.state('value'), 5, 'state was set to a value greater than max');
  t.end();
});

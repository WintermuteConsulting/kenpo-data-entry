import test from 'tape';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

test('test TextInput component', (t) => {
  t.test('--- renders an input element with type=text', (subt) => {
    const wrapper = shallow(<TextInput />);
    subt.assert(wrapper.matchesElement(<input type="text" />), 'rendered element is not the correct type');
    subt.end();
  });

  t.test('--- has an empty value by default', (subt) => {
    const wrapper = shallow(<TextInput />);
    subt.is(wrapper.prop('value'), '', 'value should be the empty string');
    subt.end();
  });

  t.test('--- applies a passed-in value', (subt) => {
    const mock = 'starting state';
    const wrapper = shallow(<TextInput value={mock} />);
    subt.is(wrapper.prop('value'), mock, 'value should be assigned the prop value');
    subt.end();
  });

  t.test('--- applies an id if supplied', (subt) => {
    const mock = 'foo';
    const wrapper = shallow(<TextInput id={mock} />);
    subt.is(wrapper.prop('id'), mock, 'should assign the value of the id prop');
    subt.end();
  });

  t.test('--- passes the event\'s value to the change handler', (subt) => {
    const spyHandler = sinon.spy();
    const wrapper = shallow(<TextInput onChange={spyHandler} />);
    wrapper.find('input').simulate('change', { target: { value: 'foo' } });
    subt.assert(spyHandler.calledWith('foo'), 'should unwrap the event and pass its value');
    subt.end();
  });
});

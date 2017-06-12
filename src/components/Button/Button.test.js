import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Button from './Button';

test('test Button component', (t) => {
  t.test('--- default render', (subt) => {
    const wrapper = shallow(<Button />);
    subt.assert(wrapper.matchesElement(<button type="button" />), 'should render a vanilla button');
    subt.end();
  });

  t.test('--- children prop', (subt) => {
    const mock = 'clickme';
    const wrapper = shallow(<Button>{mock}</Button>);
    subt.assert(wrapper.matchesElement(<button type="button">{mock}</button>), 'should render child text');
    subt.end();
  });

  t.test('--- onClick prop', (subt) => {
    const callback = sinon.spy();
    const wrapper = shallow(<Button onClick={callback} />);
    wrapper.find('button').simulate('click');
    subt.assert(callback.called, 'should invoke callback prop when clicked');
    subt.end();
  });

  t.test('--- form prop', (subt) => {
    const mock = '123abc';
    const wrapper = shallow(<Button form={mock} />);
    subt.assert(wrapper.matchesElement(<button form={mock} type="button" />), 'should assign form prop');
    subt.end();
  });

  t.test('--- type prop', (subt) => {
    const type = 'reset';
    const wrapper = shallow(<Button type={type} />);
    subt.assert(wrapper.matchesElement(<button type={type} />), 'should assign type prop');
    subt.end();
  });
});

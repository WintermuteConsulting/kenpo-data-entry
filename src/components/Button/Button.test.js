import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Button from './Button';

test('button renders a vanilla button element', (t) => {
  const wrapper = shallow(<Button />);
  t.assert(wrapper.matchesElement(<button type="button" />), 'does not render a button of the correct type');
  t.end();
});

test('button renders passed-in content', (t) => {
  const mock = 'clickme';
  const wrapper = shallow(<Button>{mock}</Button>);
  t.assert(wrapper.matchesElement(<button type="button">{mock}</button>), 'button text does not match mock value');
  t.end();
});

test('button calls passed-in callback when clicked', (t) => {
  const callback = sinon.spy();
  const wrapper = shallow(<Button onClick={callback} />);
  wrapper.find('button').simulate('click');
  t.assert(callback.called, 'the callback was not called');
  t.end();
});

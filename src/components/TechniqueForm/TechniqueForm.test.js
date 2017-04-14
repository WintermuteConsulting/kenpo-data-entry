import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TechniqueForm, { ids } from './TechniqueForm';

test('technique form renders a form with title, attack fields and submit', (t) => {
  const wrapper = shallow(<TechniqueForm />);
  t.is(wrapper.find('form').length, 1, 'missing form element');
  t.is(wrapper.find('button[type="submit"]').length, 1, 'missing submit button');
  t.is(wrapper.find(`#${ids.title}`).length, 1, 'missing title input');
  t.assert(wrapper.find(`#${ids.attack}`).length, 1, 'missing attack input');
  t.end();
});

test('technique form is empty if not supplied with data', (t) => {
  const wrapper = shallow(<TechniqueForm />);
  t.is(wrapper.find(`#${ids.title}`).prop('value'), '', 'title is not empty');
  t.is(wrapper.find(`#${ids.attack}`).prop('value'), '', 'attack is not empty');
  t.end();
});

test('technique form applies initial data to inputs', (t) => {
  const mock = {
    title: 'Lurking Tiger Strike',
    attack: 'front left do-si-do',
  };
  const wrapper = shallow(<TechniqueForm initialData={mock} />);
  t.is(wrapper.find(`#${ids.title}`).prop('value'), mock.title, 'title is not applied');
  t.is(wrapper.find(`#${ids.attack}`).prop('value'), mock.attack, 'attack is not applied');
  t.end();
});

test('technique form can update its inputs', (t) => {
  const mock = {
    title: 'Lurking',
    attack: 'full',
  };
  const expected = {
    title: `${mock.title} Tiger`,
    attack: `${mock.attack} nelson`,
  };
  const wrapper = shallow(<TechniqueForm initialData={mock} />);
  wrapper.find(`#${ids.title}`).simulate('change', { target: { value: expected.title } });
  wrapper.find(`#${ids.attack}`).simulate('change', { target: { value: expected.attack } });
  t.is(wrapper.find(`#${ids.title}`).prop('value'), expected.title, 'title is not applied');
  t.is(wrapper.find(`#${ids.attack}`).prop('value'), expected.attack, 'attack is not applied');
  t.end();
});

test('technique form uses its prop submit handler', (t) => {
  const callback = sinon.spy();
  const wrapper = shallow(<TechniqueForm onSubmit={callback} />);
  wrapper.find('button[type="submit"]').simulate('click', { preventDefault() {} });
  t.assert(callback.called, 'submit handler not called');
  t.end();
});

test('technique form passes state to submit handler', (t) => {
  const mockData = {
    title: 'bar',
    attack: 'baz',
  };
  const callback = sinon.spy();
  const wrapper = shallow(<TechniqueForm initialData={mockData} onSubmit={callback} />);
  wrapper.find('button[type="submit"]').simulate('click', { preventDefault() {} });
  t.assert(callback.calledWith(mockData), 'arguments do not match data');
  t.end();
});

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Item, { ids } from './Item';
import TechniqueForm from '../TechniqueForm/TechniqueForm';
import Button from '../Button/Button';

const anyData = { foo: 'bar' };
const anyPath = { collection: 'baz', item: 'qux' };

test('test Item component', (t) => {
  t.test('--- default render', (subt) => {
    const saveSpy = sinon.spy();
    const deleteSpy = sinon.spy();
    const wrapper = shallow(
      <Item initialState={anyData} handleSave={saveSpy} handleDelete={deleteSpy} path={anyPath} />,
    );
    subt.assert(
      wrapper.containsMatchingElement(
        <Button type="submit" form={ids.form}>Save</Button>,
      ),
      'should render a save button',
    );
    subt.assert(
      wrapper.containsMatchingElement(
        <Button form={ids.form}>Delete</Button>,
      ),
      'should render a delete button',
    );
    const formWrapper = wrapper.find(TechniqueForm);
    subt.is(formWrapper.length, 1, 'should render a TechniqueForm');
    subt.is(formWrapper.prop('id'), ids.form, 'should pass id to TechniqueForm');
    subt.is(formWrapper.prop('value'), anyData, 'should pass data to TechniqueForm');
    subt.end();
  });

  t.test('--- state updates with setter', (subt) => {
    const anyFunc = () => {};
    const wrapper = shallow(
      <Item initialState={anyData} handleSave={anyFunc} handleDelete={anyFunc} path={anyPath} />,
    );
    const formWrapper = wrapper.find(TechniqueForm);
    formWrapper.prop('handleChange')('new')('thang');
    subt.deepEqual(wrapper.state(), { new: 'thang', ...anyData }, 'should update state when the form invokes handleChange');
    subt.end();
  });

  t.test('--- handleSave prop', (subt) => {
    const saveSpy = sinon.spy();
    const wrapper = shallow(
      <Item initialState={anyData} handleSave={saveSpy} handleDelete={() => {}} path={anyPath} />,
    );
    wrapper.find({ children: 'Save' }).simulate('click');
    subt.assert(saveSpy.calledWith(anyPath, wrapper.state()), 'should invoke handleSave with path prop and state');
    subt.end();
  });

  t.test('--- handleDelete prop', (subt) => {
    const deleteSpy = sinon.spy();
    const wrapper = shallow(
      <Item initialState={anyData} handleSave={() => {}} handleDelete={deleteSpy} path={anyPath} />,
    );
    wrapper.find({ children: 'Delete' }).simulate('click');
    subt.assert(deleteSpy.calledWith(anyPath), 'should invoke handleDelete with path prop');
    subt.end();
  });
});

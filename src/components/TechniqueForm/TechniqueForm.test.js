import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TechniqueForm, { ids } from './TechniqueForm';

const anyData = {
  attack: 'monday blues',
  title: 'sunshine and rainbows',
};

//eslint-disable-next-line
const anyHandler = key => (value) => {};

test('test TechniqueForm component', (t) => {
  t.test('--- renders child elements', (subt) => {
    const wrapper = shallow(<TechniqueForm handleChange={anyHandler} value={anyData} />);
    subt.is(wrapper.find('form').length, 1, 'should render form element');
    subt.is(wrapper.find(`#${ids.title}`).length, 1, 'should render title input');
    subt.assert(wrapper.find(`#${ids.attack}`).length, 1, 'should render attack input');
    subt.end();
  });

  t.test('--- applies props', (subt) => {
    const anyID = '123abc';
    const wrapper = shallow(
      <TechniqueForm handleChange={anyHandler} value={anyData} id={anyID} />,
    );
    subt.is(wrapper.find(`#${anyID}`).length, 1, 'id should be applied to form if supplied');
    subt.is(wrapper.find(`#${ids.title}`).prop('value'), anyData.title, 'title should match supplied state');
    subt.is(wrapper.find(`#${ids.attack}`).prop('value'), anyData.attack, 'attack should match supplied state');
    subt.end();
  });

  t.test('--- invokes setter function on change', (subt) => {
    const setData = {
      title: 'incredible',
      attack: 'much wow',
    };
    const spy = sinon.spy();
    // the assumption in the spy handler below is that the child element (a TextInput)
    // unwraps the event and passes the value to the handler function.
    // Since the child element isn't actually rendered with shallow(), we have to do that here.
    const spyHandler = key => (event) => { spy(key, event.target.value); };
    const wrapper = shallow(<TechniqueForm handleChange={spyHandler} value={anyData} />);
    wrapper.find(`#${ids.title}`).simulate('change', { target: { value: setData.title } });
    subt.assert(spy.calledWith('title', setData.title), 'should invoke setter for title input');
    wrapper.find(`#${ids.attack}`).simulate('change', { target: { value: setData.attack } });
    subt.assert(spy.calledWith('attack', setData.attack), 'should invoke setter for attack input');
    subt.end();
  });
});

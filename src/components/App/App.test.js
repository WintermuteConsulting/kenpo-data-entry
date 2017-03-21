import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import ListContainer from '../ListContainer/ListContainer';
import FormContainer from '../FormContainer/FormContainer';

test('app renders list container and form container', (t) => {
  const wrapper = shallow(<App />);
  t.assert(wrapper.containsMatchingElement(<ListContainer />), 'missing ListContainer component');
  t.assert(wrapper.containsMatchingElement(<FormContainer />), 'missing FormContainer component');
  t.end();
});

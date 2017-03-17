import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import ListContainer from '../ListContainer/ListContainer';

test('app renders list container', (t) => {
  const wrapper = shallow(<App />);
  t.assert(wrapper.containsMatchingElement(<ListContainer />), 'missing ListContainer component');
  t.end();
});

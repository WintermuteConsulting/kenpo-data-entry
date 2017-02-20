import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import PageContainer from './PageContainer';
import Header from '../Header/Header';

test('page container renders header', (t) => {
  const wrapper = shallow(<PageContainer />);
  t.assert(wrapper.containsMatchingElement(<Header />), 'missing Header component');
  t.end();
});

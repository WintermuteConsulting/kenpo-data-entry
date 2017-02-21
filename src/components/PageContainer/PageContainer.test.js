import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import PageContainer from './PageContainer';
import Header from '../Header/Header';
import Workspace from '../Workspace/Workspace';

test('page container renders header and workspace', (t) => {
  const wrapper = shallow(<PageContainer />);
  t.assert(wrapper.containsMatchingElement(<Header />), 'missing Header component');
  t.assert(wrapper.containsMatchingElement(<Workspace />), 'missing Workspace component');
  t.end();
});

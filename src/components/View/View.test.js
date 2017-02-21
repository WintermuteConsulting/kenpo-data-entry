import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import View from './View';
import styles from './View.css';
import Toolbar from '../Toolbar/Toolbar';

test('view renders toolbar and content', (t) => {
  const wrapper = shallow(<View title="Something" />);
  t.assert(wrapper.containsMatchingElement(<Toolbar title="Something" />), 'missing toolbar component');
  t.is(wrapper.find(`.${styles.contentContainer}`).length, 1, 'missing content container');
  t.is(wrapper.find(`.${styles.content}`).length, 1, 'missing content');
  t.end();
});

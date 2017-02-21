import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from './Toolbar';
import styles from './Toolbar.css';

test('toolbar renders children', (t) => {
  const wrapper = shallow(<Toolbar title="Something" />);
  t.is(wrapper.find(`.${styles.title}`).length, 1, 'missing title element');
  t.end();
});

import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import styles from './Header.css';

test('header renders children', (t) => {
  const wrapper = shallow(<Header />);
  t.is(wrapper.find(`.${styles.text}`).length, 1, 'missing text');
  t.is(wrapper.find(`.${styles.statusIndicator}`).length, 1, 'missing status indicator');
  t.end();
});

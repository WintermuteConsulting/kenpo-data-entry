import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import EmptyContent from './EmptyContent';
import styles from './EmptyContent.css';

test('empty content renders children', (t) => {
  const wrapper = shallow(<EmptyContent thing="label" />);
  t.is(wrapper.find(`.${styles.header}`).length, 1, 'missing header text');
  t.is(wrapper.find(`.${styles.exp}`).length, 1, 'missing explanation text');
  t.end();
});

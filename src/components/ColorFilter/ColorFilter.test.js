import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import ColorFilter from './ColorFilter';
import styles from './ColorFilter.css';

test('color filter renders children', (t) => {
  const wrapper = shallow(<ColorFilter />);
  t.assert(wrapper.find(`.${styles.dot}`).length, 8, 'missing 8 dots');
  t.end();
});

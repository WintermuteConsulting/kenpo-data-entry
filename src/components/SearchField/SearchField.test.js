import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import SearchField from './SearchField';
import styles from './SearchField.css';

test('search field renders children', (t) => {
  const wrapper = shallow(<SearchField />);
  t.is(wrapper.find(`.${styles.searchInput}`).length, 1, 'missing search input');
  t.end();
});

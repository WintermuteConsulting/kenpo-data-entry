import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import Workspace from './Workspace';
import styles from './Workspace.css';
import View from '../View/View';

test('workspace renders panes and divider', (t) => {
  const wrapper = shallow(<Workspace />);
  t.is(wrapper.find(View).length, 2, 'missing two panes');
  t.is(wrapper.find(`.${styles.paneDivider}`).length, 1, 'missing pane divider');
  t.end();
});

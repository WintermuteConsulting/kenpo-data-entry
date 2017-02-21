import test from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import styles from './App.css';
import Header from '../Header/Header';
import Workspace from '../Workspace/Workspace';

test('app renders header and workspace', (t) => {
  const wrapper = shallow(<App />);
  t.assert(wrapper.containsMatchingElement(<Header />), 'missing Header component');
  t.assert(wrapper.containsMatchingElement(<Workspace injectedClassName={styles.content} />), 'missing Workspace component');
  t.end();
});

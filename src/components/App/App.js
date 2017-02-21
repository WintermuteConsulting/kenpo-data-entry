import React from 'react';
import styles from './App.css';
import Header from '../Header/Header';
import Workspace from '../Workspace/Workspace';

function App() {
  return (
    <div className={styles.self}>
      <Header />
      <Workspace injectedClassName={styles.content} />
    </div>
  );
}

export default App;

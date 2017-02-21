import React from 'react';
import styles from './Workspace.css';

function Workspace() {
  return (
    <div className={styles.self}>
      <div className={styles.pane} />
      <div className={styles.paneDivider} />
      <div className={styles.pane} />
    </div>
  );
}

export default Workspace;

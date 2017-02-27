import React from 'react';
import styles from './ColorFilter.css';

function ColorFilter() {
  return (
    <div className={styles.self}>
      <div className={styles.dot} style={{ backgroundColor: 'red' }} />
      <div className={styles.dot} style={{ backgroundColor: 'orange' }} />
      <div className={styles.dot} style={{ backgroundColor: 'yellow' }} />
      <div className={styles.dot} style={{ backgroundColor: 'brown' }} />
      <div className={styles.dot} style={{ backgroundColor: 'green' }} />
      <div className={styles.dot} style={{ backgroundColor: 'purple' }} />
      <div className={styles.dot} style={{ backgroundColor: 'blue' }} />
      <div className={styles.dot} style={{ backgroundColor: 'black' }} />
    </div>
  );
}

export default ColorFilter;

import React from 'react';
import styles from './Header.css';

function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.text}>MYKENPO Database</span>
      <div className={styles.statusIndicator} />
    </header>
  );
}

export default Header;

import React from 'react';
import styles from './SearchField.css';

function SearchField() {
  return (
    <div className={styles.self}>
      <svg className="icon--search"><use xlinkHref="icons.svg#search" /></svg>
      <input className={styles.searchInput} type="search" placeholder="search" />
    </div>
  );
}

export default SearchField;

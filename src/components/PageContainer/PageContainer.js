import React from 'react';
import styles from './PageContainer.css';
import Header from '../Header/Header';

function PageContainer() {
  return (
    <div className={styles.pageContainer}>
      <Header />
    </div>
  );
}

export default PageContainer;

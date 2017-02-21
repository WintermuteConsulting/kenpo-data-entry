import React from 'react';
import styles from './PageContainer.css';
import Header from '../Header/Header';
import Workspace from '../Workspace/Workspace';

function PageContainer() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <Workspace />
    </div>
  );
}

export default PageContainer;

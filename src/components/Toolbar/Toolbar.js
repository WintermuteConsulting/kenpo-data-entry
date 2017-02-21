import React from 'react';
import styles from './Toolbar.css';

function Toolbar(props) {
  return (
    <menu className={styles.self}>
      <div className={styles.title}>{props.title}</div>
    </menu>
  );
}

Toolbar.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Toolbar;

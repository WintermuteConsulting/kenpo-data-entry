import React from 'react';
import classNames from 'classnames';
import Toolbar from '../Toolbar/Toolbar';
import styles from './View.css';

function View(props) {
  return (
    <div className={classNames(styles.self, props.injectedClassName)}>
      <Toolbar title={props.title} />
      <div className={styles.contentContainer}>
        <div className={styles.content} />
      </div>
    </div>
  );
}

View.propTypes = {
  injectedClassName: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
};

View.defaultProps = {
  injectedClassName: '',
};

export default View;

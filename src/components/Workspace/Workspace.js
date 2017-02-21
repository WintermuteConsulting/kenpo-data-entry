import React from 'react';
import classNames from 'classnames';
import styles from './Workspace.css';

function Workspace(props) {
  return (
    <div className={classNames(styles.self, props.injectedClassName)}>
      <div className={styles.pane} />
      <div className={styles.paneDivider} />
      <div className={styles.pane} />
    </div>
  );
}

Workspace.propTypes = {
  injectedClassName: React.PropTypes.string,
};

Workspace.defaultProps = {
  injectedClassName: '',
};

export default Workspace;

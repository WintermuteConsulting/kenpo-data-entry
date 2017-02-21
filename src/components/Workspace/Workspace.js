import React from 'react';
import classNames from 'classnames';
import styles from './Workspace.css';
import View from '../View/View';

function Workspace(props) {
  return (
    <div className={classNames(styles.self, props.injectedClassName)}>
      <View injectedClassName={styles.pane} title="Techniques" />
      <div className={styles.paneDivider} />
      <View injectedClassName={styles.pane} title="Ranks" />
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

import React from 'react';
import styles from './EmptyContent.css';

function EmptyContent(props) {
  const thing = props.thing;
  return (
    <div className={styles.self}>
      <h1 className={styles.header}>{`No ${thing}s`}</h1>
      <p className={styles.exp}>{`Click the ＋ button to add a ${thing}.`}</p>
    </div>
  );
}

EmptyContent.propTypes = {
  thing: React.PropTypes.string.isRequired,
};

export default EmptyContent;

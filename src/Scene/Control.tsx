import React from 'react';
import styles from './styles.css';

interface IProps {
  restartGame: () => void;
}

const Control = (props: IProps) => (
  <div className={styles.control}>
    <button className={styles['restart-button']} onClick={props.restartGame}>
      Restart
    </button>
  </div>
);

export default Control;

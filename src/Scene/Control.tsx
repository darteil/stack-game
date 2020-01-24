import React from 'react';
import PropTypes from 'prop-types';
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

Control.propTypes = {
  restartGame: PropTypes.func.isRequired
};

export default Control;

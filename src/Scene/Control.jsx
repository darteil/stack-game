import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Control = props => (
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

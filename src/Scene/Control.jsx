import React from 'react';
import PropTypes from 'prop-types';
import styles from 'App/Scene/styles.css';
import ClassNames from 'classnames';

const Control = props => (
  <div className={styles.control}>
    <button className={ClassNames(styles['fuller-button'], styles.blue)} onClick={props.restartGame}>Restart</button>
  </div>
);

Control.propTypes = {
  restartGame: PropTypes.func.isRequired
};

export default Control;

import React from 'react';
import PropTypes from 'prop-types';
import styles from 'App/Scene/styles.css';
import ClassNames from 'classnames';

const Control = props => (
  <div className={styles.control}>
    <span className={ClassNames(styles.button, styles.restart)} onClick={props.restartGame} />
  </div>
);

Control.propTypes = {
  restartGame: PropTypes.func.isRequired
};

export default Control;

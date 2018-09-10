import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const ErrorComponent = props => (
  <div className={styles.wrap}>
    <div className={styles.text}>
      <p>{props.message}</p>
    </div>
  </div>
);

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorComponent;

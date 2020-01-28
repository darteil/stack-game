import React from 'react';
import styles from './styles.css';

interface IProps {
  message: string;
}

const ErrorComponent = (props: IProps) => (
  <div className={styles.wrap}>
    <div className={styles.text}>
      <p>{props.message}</p>
    </div>
  </div>
);

export default ErrorComponent;

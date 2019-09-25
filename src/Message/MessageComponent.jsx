import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const MessageComponent = props => {
  let timeoutVariable;

  useEffect(() => {
    timeoutVariable = setTimeout(() => {
      props.hideMessage();
    }, 10000);

    return () => clearTimeout(timeoutVariable);
  }, []);

  return (
    <div className={styles.message}>
      <em onClick={props.hideMessage} />
      <p>{props.text}</p>
    </div>
  );
};

MessageComponent.propTypes = {
  text: PropTypes.string.isRequired,
  hideMessage: PropTypes.func.isRequired
};

export default MessageComponent;

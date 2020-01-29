import React, { useEffect } from 'react';
import styles from './styles.css';

interface IProps {
  text: string;
  hideMessage: () => void;
}

const MessageComponent = (props: IProps) => {
  let timeoutVariable: NodeJS.Timeout;

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

export default MessageComponent;

import React, { useEffect } from 'react';
import { IMessageProps } from '.';
import styles from './styles.css';

const Message = (props: IMessageProps) => {
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
      <div>
        {props.messages.map((text: string, index: number) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default Message;

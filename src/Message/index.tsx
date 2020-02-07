import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from './Actions';
import { AppState } from '../store';
import styles from './styles.css';

const Message = () => {
  let timeoutVariable: NodeJS.Timeout;
  const messages = useSelector((state: AppState) => state.Message.messages);
  const dispatch = useDispatch();

  const hideMessageEvent = () => {
    dispatch(hideMessage());
  };

  useEffect(() => {
    timeoutVariable = setTimeout(() => {
      hideMessageEvent();
    }, 10000);

    return () => clearTimeout(timeoutVariable);
  }, []);

  return (
    <div className={styles.message}>
      <em onClick={hideMessageEvent} />
      <div>
        {messages.map((text: string, index: number) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default Message;

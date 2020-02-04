import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { hideMessage } from './Actions';
import { AppState } from '../store';
import Message from './Message';

export interface IMessageProps {
  messages: string[];
  hideMessage: () => void;
}

const MessageComponent = (props: IMessageProps) => <Message {...props} />;

const mapStateToProps = (state: AppState) => ({
  messages: state.Message.messages
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideMessage: () => {
    dispatch(hideMessage());
  }
});

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(MessageComponent);

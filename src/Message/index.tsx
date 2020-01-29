import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { hideMessage } from './Actions';
import { AppState } from '../store';
import MessageComponent from './MessageComponent';

interface IProps {
  text: string;
  hideMessage: () => void;
}

const Message = (props: IProps) => <MessageComponent {...props} />;

const mapStateToProps = (state: AppState) => ({
  text: state.Message.text
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideMessage: () => {
    dispatch(hideMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);

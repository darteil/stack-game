import React from 'react';
import { connect } from 'react-redux';
import { hideMessage } from './Actions';
import MessageComponent from './MessageComponent';

const Message = props => <MessageComponent {...props} />;

const mapStateToProps = state => ({
  text: state.Message.text
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(hideMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

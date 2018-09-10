import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideMessage } from 'App/Message/Actions';
import styles from './styles.css';

class Message extends Component {
  constructor(props) {
    super(props);

    this.timeoutVariable = setTimeout(() => { this.props.hideMessage(); }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutVariable);
  }

  render() {
    return (
      <div className={styles.message}>
        <em onClick={this.props.hideMessage} />
        <p>{this.props.text}</p>
      </div>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  hideMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  text: state.Message.text
});

const mapDispatchToProps = dispatch => ({
  hideMessage: () => {
    dispatch(hideMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);


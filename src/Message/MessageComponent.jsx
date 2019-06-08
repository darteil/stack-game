import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class MessageComponent extends Component {
  constructor(props) {
    super(props);

    this.timeoutVariable = setTimeout(() => {
      this.props.hideMessage();
    }, 10000);
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

MessageComponent.propTypes = {
  text: PropTypes.string.isRequired,
  hideMessage: PropTypes.func.isRequired
};

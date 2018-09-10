import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorComponent from 'App/ErrorComponent/index';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent message="Something went wrong =(" />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired
};

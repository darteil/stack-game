import React, { Component, ReactNode } from 'react';
import ErrorComponent from './ErrorComponent/index';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
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

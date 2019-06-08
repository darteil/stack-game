/* global document */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GithubCorner from 'react-github-corner';
import App from './MainPage/App';
import { persistor, store, history } from './store';
import './reset.css';
import './global.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Fragment>
          <App />
          <GithubCorner href="https://github.com/darteil/StackGame" />
        </Fragment>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

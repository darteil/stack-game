/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './MainPage/App';
import { persistor, store, browserHistory } from './store';
import './reset.css';
import './global.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

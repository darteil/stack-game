/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, history } from './store';
import routes from './routes';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <BrowserRouter>
          <div>
            { routes() }
          </div>
        </BrowserRouter>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

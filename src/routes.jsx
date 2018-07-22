import React from 'react';
import { Route } from 'react-router-dom';
import App from './MainPage/App';

const routes = () => (
  <Route exact path="/" component={App} />
);

export default routes;

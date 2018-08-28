import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Scene from 'App/Scene/Scene';
import ListOfRecords from 'App/ListOfRecords';
import Menu from 'App/MainPage/Menu';
import NotFound from 'App/NotFound';
import { serverCategory } from 'globalVariables';
import styles from './styles.css';


const App = () => (
  <div className={styles.app}>
    <Router>
      <Fragment>
        <Menu />
        <Switch>
          <Route exact path={`${serverCategory}/`} component={Scene} />
          <Route path={`${serverCategory}/list-of-records`} component={ListOfRecords} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  </div>
);


export default App;

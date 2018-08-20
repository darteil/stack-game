import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Scene from 'App/Scene/Scene';
import ListOfRecords from 'App/ListOfRecords';
import Menu from 'App/MainPage/Menu';
import styles from './styles.css';


const App = () => (
  <div className={styles.app}>
    <Router>
      <Fragment>
        <Menu />
        <Route exact path={process.env.SUB_ROUTE || '/'} component={Scene} />
        <Route path={`${process.env.SUB_ROUTE}/list-of-records` || '/list-of-records'} component={ListOfRecords} />
      </Fragment>
    </Router>
  </div>
);


export default App;

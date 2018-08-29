import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scene from 'App/Scene/Scene';
import ListOfRecords from 'App/ListOfRecords';
import Menu from 'App/MainPage/Menu';
import NotFound from 'App/NotFound';
import { serverCategory } from 'globalVariables';
import Message from 'App/Message';
import styles from './styles.css';


const App = props => (
  <div className={styles.app}>
    <Router>
      <Fragment>
        <Menu />
        <Switch>
          <Route exact path={`${serverCategory}/`} component={Scene} />
          <Route path={`${serverCategory}/list-of-records`} component={ListOfRecords} />
          <Route path="*" component={NotFound} />
        </Switch>
        {
          props.showMessageStatus &&
          <Message />
        }
      </Fragment>
    </Router>
  </div>
);

App.propTypes = {
  showMessageStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  showMessageStatus: state.Message.show
});


export default connect(mapStateToProps)(App);

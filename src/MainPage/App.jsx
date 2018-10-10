import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SceneContainer from 'App/Scene/SceneContainer';
import ListOfRecords from 'App/ListOfRecords';
import Menu from 'App/MainPage/Menu';
import ErrorComponent from 'App/ErrorComponent';
import Message from 'App/Message';
import ErrorBoundary from 'App/ErrorBoundary';
import styles from './styles.css';

const NotFound = () => <ErrorComponent message="Not Found =(" />;

const App = props => (
  <div className={styles.app}>
    <Router>
      <Fragment>
        <Menu />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={SceneContainer} />
            <Route path="/list-of-records" component={ListOfRecords} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ErrorBoundary>
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

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SceneContainer from '../Scene/SceneContainer';
import ListOfRecords from '../ListOfRecords';
import Menu from './Menu';
import ErrorComponent from '../ErrorComponent';
import Message from '../Message';
import ErrorBoundary from '../ErrorBoundary';
import styles from './styles.css';

const NotFound = () => <ErrorComponent message="Not Found =(" />;

interface IProps {
  showMessageStatus: boolean;
}

const App = (props: IProps) => (
  <div className={styles.app}>
    <Router basename="/stack">
      <Fragment>
        <Menu />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={SceneContainer} />
            <Route path="/list-of-records" component={ListOfRecords} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ErrorBoundary>
        {props.showMessageStatus && <Message />}
      </Fragment>
    </Router>
  </div>
);

const mapStateToProps = (state: any) => ({
  showMessageStatus: state.Message.show
});

export default connect(mapStateToProps)(App);

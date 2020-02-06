import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import GithubCorner from 'react-github-corner';
import { AppState } from '../store';
import { SceneContainer } from '../Scene/SceneContainer';
import ListOfRecords from '../ListOfRecords';
import Menu from './Menu';
import ErrorComponent from '../ErrorComponent';
import Message from '../Message';
import ErrorBoundary from '../ErrorBoundary';
import styles from './styles.css';

const NotFound = () => <ErrorComponent message="Not Found =(" />;

interface IProps {
  showMessageStatus: boolean;
  UI: boolean;
}

const App = (props: IProps) => (
  <>
    <div className={styles.app}>
      <Router basename="/">
        <Fragment>
          {props.UI && <Menu />}
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
    {props.UI && <GithubCorner href="https://github.com/darteil/StackGame" />}
  </>
);

const mapStateToProps = (state: AppState) => ({
  showMessageStatus: state.Message.show,
  UI: state.GameData.UI
});

export default connect(mapStateToProps)(App);

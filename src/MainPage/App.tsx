import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const App = () => {
  const showMessageStatus = useSelector((state: AppState) => state.Message.show);
  const showUI = useSelector((state: AppState) => state.GameData.UI);

  return (
    <>
      <div className={styles.app}>
        <Router basename="/">
          <Fragment>
            {showUI && <Menu />}
            <ErrorBoundary>
              <Switch>
                <Route exact path="/" component={SceneContainer} />
                <Route path="/list-of-records" component={ListOfRecords} />
                <Route path="*" component={NotFound} />
              </Switch>
            </ErrorBoundary>
            {showMessageStatus && <Message />}
          </Fragment>
        </Router>
      </div>
      {showUI && <GithubCorner href="https://github.com/darteil/StackGame" />}
    </>
  );
};

export default App;

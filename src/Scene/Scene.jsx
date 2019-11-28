/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Game from '../Game/index';
import Control from './Control';
import styles from './styles.css';

/**
 * No react-hooks
 * I had to leave unchanged
 * Because it’s impossible to initialize a game on a react-hooks
 */
export default class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'stopped', // launched or stopped
      count: 0
    };

    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.container = React.createRef();
    this.game = null;
  }

  componentDidMount() {
    this.game = new Game(this.container.current);
    this.game.init();
    this.startGame();
    // this.game.enableOrbitControls();
    // this.game.enableAxesHelper();
    document.addEventListener('keydown', this.setNewStack);
    if (this.props.listOfRecords.length === 0) {
      this.props.showMessage('Press "w" to set block =)');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.setNewStack);
  }

  setNewStack = event => {
    if (this.state.gameStatus === 'stopped' || event.which !== 87) {
      return false;
    }

    this.game.setNewStack();
    this.setState(() => ({ count: this.game.getCount() }));

    if (this.game.getStopStatusGame()) {
      this.setState(() => ({ gameStatus: 'stopped' }));

      if (this.props.topRecord !== 0) {
        if (this.state.count > this.props.topRecord) {
          this.props.setTopRecord(this.state.count, this.game.getStackHeight());
          this.props.showMessage('New record!');
        }
      } else {
        this.props.setTopRecord(this.state.count, this.game.getStackHeight());
      }

      this.props.addRecord({
        time: moment()
          .tz(this.timeZone)
          .format('MMMM Do YYYY, HH:mm:ss'),
        count: this.state.count,
        heightStack: this.game.getStackHeight()
      });
    }

    return true;
  };

  startGame = () => {
    if (this.state.gameStatus === 'launched') {
      return false;
    }
    this.game.start();
    this.setState(() => ({ gameStatus: 'launched' }));
    return true;
  };

  stopGame = () => {
    this.game.stopGame();
  };

  restartGame = () => {
    this.setState(() => ({
      count: 0,
      gameStatus: 'launched'
    }));
    this.game.restartGame();
  };

  render() {
    return (
      <div className={styles['scene-wrap']}>
        <Control restartGame={this.restartGame} />
        <div className={styles.count}>{this.state.count}</div>
        <div className={styles.scene} ref={this.container} />
      </div>
    );
  }
}

Scene.propTypes = {
  addRecord: PropTypes.func.isRequired,
  setTopRecord: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  topRecord: PropTypes.number.isRequired,
  listOfRecords: PropTypes.array.isRequired
};

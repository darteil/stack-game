import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { addRecord, setTopRecord } from './Actions';
import Game from '../Game/index';
import Control from './Control';
import styles from './styles.css';


class Scene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'stopped', // launched or stopped
      count: 0
    };

    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.container = React.createRef();
    this.game = new Game(this.container);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.setNewStack = this.setNewStack.bind(this);
  }

  componentDidMount() {
    this.game.init();
    this.startGame();
  }

  setNewStack() {
    if (this.state.gameStatus === 'stopped') {
      return false;
    }

    this.game.setNewStack();
    this.setState({
      count: this.game.getCount()
    });

    if (this.game.getStopStatusGame()) {
      this.setState({
        gameStatus: 'stopped'
      });

      if (this.props.topRecord !== 0) {
        if (this.state.count > this.props.topRecord) {
          this.props.setTopRecord(this.state.count);
        }
      } else {
        this.props.setTopRecord(this.state.count);
      }

      this.props.addRecord({ time: moment().tz(this.timeZone).format('MMMM Do YYYY, HH:mm:ss'), count: this.state.count });
    }

    return true;
  }

  startGame() {
    if (this.state.gameStatus === 'launched') {
      return false;
    }
    this.game.start();
    this.setState({
      gameStatus: 'launched'
    });
    return true;
  }

  stopGame() {
    this.game.stopGame();
  }

  restartGame() {
    this.setState({
      count: 0,
      gameStatus: 'launched'
    });
    this.game.restartGame();
  }

  render() {
    return (
      <div className={styles['scene-wrap']}>
        <Control setNewStack={this.setNewStack} restartGame={this.restartGame} />
        <div className={styles.count}>{this.state.count}</div>
        <div className={styles.scene} ref={this.container} />
      </div>
    );
  }
}

Scene.propTypes = {
  addRecord: PropTypes.func.isRequired,
  setTopRecord: PropTypes.func.isRequired,
  topRecord: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  topRecord: state.GameData.topRecord
});

const mapDispatchToProps = dispatch => ({
  addRecord: (record) => {
    dispatch(addRecord(record));
  },
  setTopRecord: (record) => {
    dispatch(setTopRecord(record));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Scene);


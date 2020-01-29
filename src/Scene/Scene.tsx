/* global document */
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Record } from '../ListOfRecords/types';
import { v1 as uuid } from 'uuid';
import Game from '../Game';
import Control from './Control';
import styles from './styles.css';

interface IProps {
  addRecord: (record: Record) => void;
  setTopRecord: (count: number, height: number) => void;
  showMessage: (text: string) => void;
  topRecord: number;
  listOfRecords: Record[];
}

interface IState {
  gameStatus: string;
  count: number;
}

export default class Scene extends Component<IProps, IState> {
  private timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private container!: React.RefObject<HTMLDivElement>;
  private game: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      gameStatus: 'stopped', // launched or stopped
      count: 0
    };

    this.game = null;
    this.container = React.createRef();
    this.setNewStack = this.setNewStack.bind(this);
  }

  componentDidMount() {
    this.game = new Game(this.container.current as HTMLElement);
    this.game.init();
    this.startGame();
    // this.game.enableOrbitControls();
    // this.game.enableAxesHelper();

    window.addEventListener('keydown', this.setNewStack);
    if (this.props.listOfRecords.length === 0) {
      this.props.showMessage('Press "w" to set block =)');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.setNewStack);
  }

  setNewStack = (event: KeyboardEvent) => {
    if (this.state.gameStatus === 'stopped' || event.which !== 87) {
      return;
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
        id: uuid(),
        time: moment()
          .tz(this.timeZone)
          .format('MMMM Do YYYY, HH:mm:ss'),
        count: this.state.count,
        heightStack: this.game.getStackHeight()
      });
    }

    return;
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

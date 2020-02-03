/* global window */
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { ISceneProps } from './SceneContainer';
import { v1 as uuid } from 'uuid';
import Game from '../Game';
import Control from './Control';
import styles from './styles.css';

interface IState {
  gameStatus: string;
  count: number;
}

export default class Scene extends Component<ISceneProps, IState> {
  private timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private container!: React.RefObject<HTMLDivElement>;
  private game: any;

  constructor(props: ISceneProps) {
    super(props);

    this.state = {
      gameStatus: 'stopped', // launched or stopped
      count: 0
    };

    this.game = null;
    this.container = React.createRef();
    this.setNewStack = this.setNewStack.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.game = new Game(this.container.current as HTMLElement);
    this.game.init();
    this.startGame();
    // this.game.enableOrbitControls();
    // this.game.enableAxesHelper();

    window.addEventListener('keydown', this.onKeyDown);
    if (this.props.listOfRecords.length === 0) {
      this.props.showMessage('Press "w" to set block =)');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event: KeyboardEvent) {
    const setNewStackKey = 87; // "w"
    const toggleUiKey = 72; // "h"

    switch (event.which) {
      case setNewStackKey: {
        this.setNewStack();
        break;
      }
      case toggleUiKey: {
        this.props.toggleUI();
        break;
      }
      default:
        break;
    }
  }

  setNewStack = () => {
    if (this.state.gameStatus === 'stopped') {
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
        {this.props.UI && (
          <>
            <Control restartGame={this.restartGame} />
            <div className={styles.count}>{this.state.count}</div>
          </>
        )}
        <div className={styles.scene} ref={this.container} />
      </div>
    );
  }
}

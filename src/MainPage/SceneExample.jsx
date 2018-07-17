import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Game from '../Game';
import styles from './styles.css';

const stylesMaterialUi = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});


class SceneExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'stopped' // launched or stopped
    };

    this.container = React.createRef();
    this.game = new Game(this.container);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.setNewStack = this.setNewStack.bind(this);
  }

  componentDidMount() {
    this.game.init();
  }

  setNewStack() {
    this.game.setNewStack();
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
    this.game.restartGame();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={styles.scene} ref={this.container} onClick={this.setNewStack} />
        <Button disabled={this.state.gameStatus === 'launched'} variant="contained" color="primary" className={classes.button} onClick={this.startGame}>
          Start
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.stopGame}>
          Stop
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.restartGame}>
          Restart
        </Button>
      </div>
    );
  }
}

export default withStyles(stylesMaterialUi)(SceneExample);

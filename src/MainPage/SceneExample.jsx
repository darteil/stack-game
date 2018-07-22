import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Game from '../Game';
import styles from './styles.css';

const stylesMaterialUi = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});


class SceneExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: 'stopped', // launched or stopped
      count: 0
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
    if (this.state.gameStatus === 'launched') {
      this.setState({
        count: this.game.getCount()
      });
    }
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
      <Paper className={classes.root} elevation={1}>
        <div>
          <div className={styles.scene} ref={this.container} />
          <div>{this.state.count}</div>
          <Button disabled={this.state.gameStatus === 'launched'} variant="contained" color="primary" className={classes.button} onClick={this.startGame}>
            Start
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.stopGame}>
            Stop
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={this.restartGame}>
            Restart
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.setNewStack}>
            Click!
          </Button>
        </div>
      </Paper>
    );
  }
}

SceneExample.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(stylesMaterialUi)(SceneExample);

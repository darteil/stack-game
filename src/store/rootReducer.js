import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import GameData from '../Scene/Reducer';

export default combineReducers({
  routerReducer,
  GameData
});

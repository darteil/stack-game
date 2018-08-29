import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import GameData from 'App/Scene/Reducer';
import Message from 'App/Message/Reducer';

export default combineReducers({
  routerReducer,
  GameData,
  Message
});

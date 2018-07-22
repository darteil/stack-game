import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import MainReducer from '../MainPage/reducer';

export default combineReducers({
  routerReducer,
  MainReducer
});

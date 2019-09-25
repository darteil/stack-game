import { createBrowserHistory } from 'history';
import getConfigureStore from './configureStore';

const initialState = {};

const configureStore = getConfigureStore();

export const browserHistory = createBrowserHistory();
export const { store } = configureStore(initialState);
export const { persistor } = configureStore(initialState);

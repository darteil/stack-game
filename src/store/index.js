import createHistory from 'history/createBrowserHistory';
import getConfigureStore from './configureStore';

const initialState = {};

const configureStore = getConfigureStore();

export const history = createHistory();
export const { store } = configureStore(initialState);
export const { persistor } = configureStore(initialState);

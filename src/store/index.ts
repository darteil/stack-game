import { createBrowserHistory } from 'history';
import getConfigureStore from './configureStore';
import rootReducer from './rootReducer';

const initialState = {};

const configureStore = getConfigureStore();

export const browserHistory = createBrowserHistory();
export const { store } = configureStore(initialState);
export const { persistor } = configureStore(initialState);
export type AppState = ReturnType<typeof rootReducer>;

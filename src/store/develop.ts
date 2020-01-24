import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: true
});

const persistConfig = {
  key: 'GameData',
  storage,
  whitelist: ['GameData']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function developerConfigureStore(initialState: any) {
  const composeEnhancers = composeWithDevTools({});
  const enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}

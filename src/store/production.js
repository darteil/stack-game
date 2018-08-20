import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'GameData',
  storage,
  whitelist: ['GameData']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function developerConfigureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunk));
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}

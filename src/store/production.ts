import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'GameData',
  storage,
  whitelist: ['GameData']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function productionConfigureStore(initialState: any) {
  const store = createStore(persistedReducer, initialState);
  const persistor = persistStore(store);

  return { store, persistor };
}

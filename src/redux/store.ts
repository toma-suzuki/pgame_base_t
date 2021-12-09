import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { RootSaga } from './root.saga';
import { IStore, RootReducer } from './root.reducer';

// - redux-saga -
const sagaMiddleWare = createSagaMiddleware();

// - redux-logger -
const reduxLogger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
});

// - 永続化設定 -
const persistConfig: PersistConfig<any> = {
  key: 'root',
  whitelist: [],
  storage,
  debug: false,
};

// - ミドルウェア -
const isActiveLogger = location.hostname  === 'localhost';
const middleware = isActiveLogger ? [
  sagaMiddleWare,
  reduxLogger,
] : [
  sagaMiddleWare,
];

// - ストア生成 -
const ConfigureStore = (preloadState?: IStore) => {
  const middlewareEnhancer = applyMiddleware(...middleware);
  const persistedReducer = persistReducer(persistConfig, RootReducer());
  const store = createStore(
    persistedReducer,
    preloadState,
    middlewareEnhancer,
  );
  const persistor = persistStore(store);
  sagaMiddleWare.run(RootSaga);
  return { store, persistor };
};

const obj = ConfigureStore();

export const Store = obj.store;
export const Persistor = obj.persistor;

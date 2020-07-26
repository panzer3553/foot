import React from 'react';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';

import reducer from './reducers';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

const persistConfig = {
  storage: AsyncStorage,
  whitelist: ['auth', 'record'],
  blackList: [],
  version: 1,
  key: 'root',
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export const withReduxProvider = (C) => (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <C {...props} />
    </PersistGate>
  </Provider>
);

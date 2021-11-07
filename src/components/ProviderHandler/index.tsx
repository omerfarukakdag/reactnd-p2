import React, { ReactNode } from 'react';
import { persistReducer, persistStore } from 'redux-persist';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import middleware from '../../middleware';
import reducer from '../../reducers';
import { reduxPersistEnabled } from '../../common/config';
import storageSession from 'redux-persist/lib/storage/session';

const ReduxPersistProvider = ({ children }: { children: ReactNode }) => {
  const persistConfig = {
    key: 'root',
    storage: storageSession,
    stateReconciler: hardSet,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

const ReduxDefaultProvider = ({ children }: { children: ReactNode }) => {
  const store = createStore(reducer, middleware);

  return <Provider store={store}>{children}</Provider>;
};

const ProviderHandler = ({ children }) => {
  if (reduxPersistEnabled) {
    return <ReduxPersistProvider>{children}</ReduxPersistProvider>;
  }

  return <ReduxDefaultProvider>{children}</ReduxDefaultProvider>;
};

export default ProviderHandler;

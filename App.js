import React from 'react';
import { Provider } from 'react-redux'
import { AppContainer } from './Navigation/Navigation';
import store from './Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer/>
    </PersistGate>
    </Provider>
  );
}
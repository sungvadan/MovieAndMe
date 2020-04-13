import React from 'react';
import { Provider } from 'react-redux'
import { AppContainer } from './Navigation/Navigation';
import store from './Store/configureStore'

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
}
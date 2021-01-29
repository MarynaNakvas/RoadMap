import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from 'core/configure-store';
import RoadMapApp from './layouts/app';

const { persistor, store } = configureStore();

export default function RootProvider() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoadMapApp />
      </PersistGate>
    </Provider>
  );
}

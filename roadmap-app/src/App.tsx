import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'core/configure-store';
import RoadMapApp from './layouts/app';

const { persistor, store } = configureStore();

export default function RootProvider() {
  return (
    <Provider store={store}>
      <RoadMapApp />
    </Provider>
  );
}

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from 'core/configure-store';
import RoadMapApp from './layouts/app';

const { store } = configureStore();

export default function RootProvider() {
  return (
    <Provider store={store}>
      <Router>
        <RoadMapApp />
      </Router>
    </Provider>
  );
}

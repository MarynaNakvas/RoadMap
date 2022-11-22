import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { call } from 'redux-saga/effects';
import { get } from 'lodash';

import { createApiCall } from 'services/api-service';
import withInjectReducerAndSaga from 'core/withInjectReducerAndSaga';
import { TableErrors, InitialState } from 'core/roadmap';
import List from 'components/list';

import './errors.scss';

let sagaErrors: TableErrors = {};

const Errors: React.FunctionComponent = memo(() => {
  const newState = useSelector(state => get(state, 'errorsReducer'));

  const errors = get(newState, 'errors');

  return <List data={errors} byKey={'text'}/>;
});

Errors.displayName = 'Errors';

// Saga
export function* fetchErrors() {
    const options = {
      method: 'GET',
    };

    const url =
      'https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/errors.json';

    sagaErrors = yield call(createApiCall, url, options);
}

// Reducers
const errorsReducer = (state: InitialState) => ({...state, errors: sagaErrors});
const versionReducer = (state: InitialState) => ({...state, version: '1.0'});

const withReducerAndSaga = withInjectReducerAndSaga({
  injectSaga: {saga : fetchErrors},
  errorsReducer,
  versionReducer,
});

export default withReducerAndSaga(Errors);

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { call } from 'redux-saga/effects';
import { get } from 'lodash';

import { createApiCall } from 'services/api-service';
import withInjectReducerAndSaga from 'core/withInjectReducerAndSaga';
import List from 'components/list';

import './errors.scss';

let sagaErrors: any[] = [];

const Errors: React.FunctionComponent = memo(() => {
  const newState = useSelector(state => get(state, 'mySlice'));
  const sagaErrors = get(newState, 'errors');

  return <List data={sagaErrors} key={'text'}/>;
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
const myReducer = (state: any) => ({...state, errors: sagaErrors});
const myOtherReducer = (state: any) => ({...state, soAuthor: 'Vasia'});

const withReducer = withInjectReducerAndSaga({
  mySaga: {saga : fetchErrors},
  mySlice: myReducer,
  myOtherSlice: myOtherReducer,
});

export default withReducer(Errors);

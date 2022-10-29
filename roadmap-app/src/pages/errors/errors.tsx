import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionMeta, createAction } from 'redux-actions';
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { get } from 'lodash';

import { createApiCall } from 'services/api-service';
import { tableActions, tableSelectors } from 'core/roadmap';
import withAsyncStoreSaga from 'core/withAsyncStoreSaga';
import { putError } from 'core/roadmap/table-utils';
import { resolvedAction, AppMeta } from 'utils/actions';
import List from 'components/list';

import './errors.scss';

interface ErrorsPageProps {
  title: string;
  setTitle(title: string): void;
}

const ErrorsPage = ({ title, setTitle }: ErrorsPageProps) => {
  const errors = useSelector(tableSelectors.getErrors);
  const myOtherSlice = useSelector(state => get(state, 'myOtherSlice'));
  
  const newAuthor = get(myOtherSlice, 'soAuthor');

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return <div>{newAuthor}</div>;
};

ErrorsPage.displayName = 'ErrorsPage';

// Reducer
let sagaErrors: any[] = [];

export function* helloSaga() {
    const options = {
      method: 'GET',
    };

    const url =
      'https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/errors.json';

      sagaErrors = yield call(createApiCall, url, options);
      
}

const myReducer = (state: any) => ({...state, errors: sagaErrors});
const myOtherReducer = (state: any) => ({...state, soAuthor: 'Vasia'});


const withReducer = withAsyncStoreSaga({
  mySaga: {saga : helloSaga},
  myReducer: myReducer,
  myOtherSlice: myOtherReducer,
});

export default withReducer(ErrorsPage);

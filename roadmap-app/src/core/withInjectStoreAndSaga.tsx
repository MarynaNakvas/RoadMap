import React, { useEffect, useContext } from 'react';
import { ReactReduxContext, useSelector } from 'react-redux';

import Spinner from 'components/spinner';
import { CustomStore, AsyncReducers, AsyncSagas } from './root.model';

const withInjectStoreAndSaga = (stores: any) => (WrappedComponent: React.FunctionComponent) => {
  const InjectReducerAndSaga = (props: any) => {
    const { store } = useContext(ReactReduxContext);
    const customStore: CustomStore = store;
    console.log('stores', stores);
    
    const hasStores = useSelector((state: any) => {
      const keys = Object.keys(stores)
      for (const key of keys) {
        if (!state[key]) {
          return false;
        }
      }
      return true;
    })

    useEffect(() => {
      for (const [key, storeSlice] of Object.entries(stores) as any) {
        if (customStore.injectSaga && !!storeSlice.saga) {
          customStore.injectSaga(key, storeSlice.saga)
        }
      }
      const newStores: any = Object.entries(stores).filter(([storeSlice]: any) => !storeSlice.saga);
      if (customStore.injectReducer) {
        customStore.injectReducer(Object.fromEntries(newStores));
      }
    }, [])

    if (!hasStores) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  }
  
  InjectReducerAndSaga.asyncStores = stores;
  return InjectReducerAndSaga;
}

export default withInjectStoreAndSaga;

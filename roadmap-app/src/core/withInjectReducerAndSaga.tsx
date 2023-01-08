import React, { useEffect, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { CustomStore } from './root.model';

const withInjectReducerAndSaga = (stores: any) => (WrappedComponent: React.FunctionComponent) => {
  const InjectReducerAndSaga = (props: any) => {
    const { store } = useContext(ReactReduxContext);
    const customStore: CustomStore = store;
    
    useEffect(() => {
      for (const [key, storeSlice] of Object.entries(stores) as any[]) {
        if (customStore.injectSaga && !!storeSlice.saga) {
          customStore.injectSaga(key, storeSlice.saga)
        }
      }
      const newStores: any[] = Object.entries(stores).filter(
        ([storeSlice]: any) => !storeSlice.saga);
      if (customStore.injectReducer) {
        customStore.injectReducer(Object.fromEntries(newStores));
      }
    }, [])

    return <WrappedComponent {...props} />;
  }
  
  InjectReducerAndSaga.asyncStores = stores;
  return InjectReducerAndSaga;
}

export default withInjectReducerAndSaga;

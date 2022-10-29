import React, { useEffect, useContext } from 'react';
import { ReactReduxContext, useSelector } from 'react-redux';
import Spinner from 'components/spinner';

const withAsyncStoreSaga = (stores: any) => (WrappedComponent: any) => {
  const InjectReducer = (props: any) => {
    const { store } = useContext(ReactReduxContext);
    const customStore: any = store;

    const hasStores = useSelector((state: any) => {
      const keys = Object.keys(stores)
      for (const key of keys) {
        if (!state[key]) {
          return false
        }
      }
      return true
    })

    useEffect(() => {
      for (const [key, storeSlice] of Object.entries(stores) as any) {
        if (!!storeSlice.saga) {
          customStore.injectSaga(key, storeSlice.saga)
        }
      }
      const newStores = Object.entries(stores).filter(([key, storeSlice]: any) => !storeSlice.saga);   
      customStore.injectReducer(Object.fromEntries(newStores));
    }, [])

    if (!hasStores) {
      return <Spinner />
    }

    return <WrappedComponent {...props} />
  }
  
  InjectReducer.asyncStores = stores;
  return InjectReducer;
}

export default withAsyncStoreSaga;

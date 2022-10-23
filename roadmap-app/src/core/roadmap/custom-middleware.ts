import { MiddlewareAPI, Dispatch, Middleware } from 'redux';
import { ActionMeta } from 'redux-actions';

import actions from 'core/roadmap/table-actions';
import { AppMeta } from 'utils/actions';

export default (): Middleware =>
  ({ dispatch }: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: ActionMeta<any, AppMeta>) => {
      const { meta = {}, payload } = action;
      const { auth } = meta;
      
      if (!auth) {
        return next(action);
      }

      const { enableFetch } = auth;

      if (enableFetch) {
        dispatch(enableFetch(payload));
        dispatch(actions.setInitialStore());
      }

      return next(action);
  };

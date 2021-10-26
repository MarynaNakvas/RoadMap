import {
  HomePage,
  TablePage,
  ErrorsPage,
} from 'pages';

import { PAGE_PATH, PAGE_TITLES } from './app-constants';

export interface Route {
  path: string;
  title: string;
  component: any;
}

const appRoutes: Route[] = [
  {
    title: PAGE_TITLES.HOME,
    path: PAGE_PATH.HOME,
		component: HomePage,
  },
  {
    title: PAGE_TITLES.TABLE,
    path: PAGE_PATH.TABLE,
		component: TablePage,
  },
  {
    title: PAGE_TITLES.ERRORS,
    path: PAGE_PATH.ERRORS,
		component: ErrorsPage,
  },
];

export default appRoutes;

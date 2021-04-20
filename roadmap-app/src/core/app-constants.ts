import { ActiveFiltersProps } from 'modules/table/table.model';

export const PAGE_PATH = {
  HOME: '/',
  TABLE: '/table',
  ERRORS: '/errors',
};

export const globalFilters: ActiveFiltersProps = {
  rating: '',
  title: '',
  date: '',
  author: '',
};

import { ActiveFiltersProps } from 'modules/table/table.model';

export const PAGE_PATH = {
  HOME: '/',
  TABLE: '/table',
  ERRORS: '/errors',
};

export const PAGE_TITLES = {
  HOME: 'Main',
  TABLE: 'Table',
  ERRORS: 'Show Errors',
};

export const globalFilters: ActiveFiltersProps = {
  rating: '',
  title: '',
  date: '',
  author: '',
};

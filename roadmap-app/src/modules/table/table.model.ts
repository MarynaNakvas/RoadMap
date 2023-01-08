export interface ActiveFiltersProps {
  [key: string]: string;
}

export interface SotringRulesProps {
  [key: string]: string;
}

export interface TableActionProps {
  setTableContent: any;
  changeActiveFilters: any;
}

export interface OptionProps {
  value: string;
  label: string;
}

export interface Collection {
  [key: string]: OptionProps[];
}

export interface CollectionMap {
  [key: string]: Set<string>;
}

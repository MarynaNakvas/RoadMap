export enum TableKeys {
  id = 'id',
  Title = 'title',
  Author = 'author',
  Date = 'date',
  Raiting = 'raiting',
  Action = 'action',
  isPriority = 'isPriority',
}

export interface TableKeysType {
  [TableKeys.id]: string;
  [TableKeys.Title]: string;
  [TableKeys.Author]: string;
  [TableKeys.Date]: string;
  [TableKeys.Raiting]: number;
  [TableKeys.isPriority]: any;
}

export interface AppMeta {
  message: string;
  requestOptions?: RequestInit;
}

export interface Action<T> {
  type: string;
  payload?: T;
  meta?: AppMeta;
}

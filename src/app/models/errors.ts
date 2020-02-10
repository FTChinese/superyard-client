export interface IApiErrorBody<T extends string> {
  message: string;
  param?: T,
  code?: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
}


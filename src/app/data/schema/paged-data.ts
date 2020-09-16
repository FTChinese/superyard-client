export interface PagedData<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

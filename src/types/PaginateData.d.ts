export interface PaginateData<T> {
  count: number;
  results: T[];
  next?: number;
  previous?: number;
}

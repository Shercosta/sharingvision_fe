export interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

export interface Meta {
  count: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  message: string;
  meta: Meta;
  pagination: Pagination;
}

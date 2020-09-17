import { HttpParams } from '@angular/common/http';
import { ParamMap } from '@angular/router';
import { PagedData } from 'src/app/data/schema/paged-data';

export interface Paging {
  page: number;
  perPage: number;
}

export interface PrevNextLink {
  prev?: {
    page: number;
  };
  next?: {
    page: number;
  };
  totalItems: number;
  limit: number; // Item should be shown per page.
  currentPage: number;
  totalPages: number;
}

export function buildPrevNext<T>(p: PagedData<T>): PrevNextLink {
  const totalPages = Math.ceil(p.total / p.limit);
  return {
    // If current page number is 1, do not show the previous button;
    // If actual array length is 0, do not show previous button.
    prev: (totalPages === 0 || p.page === 1)
      ? null
      : {
        page: p.page - 1
      },
    // If no item fetched, or total item is less than limit per page, do not show the next button.
    next: (totalPages === 0 || p.page >= totalPages)
      ? null
      : {
        page: p.page + 1
      },
    totalItems: p.total,
    limit: p.limit,
    currentPage: p.page,
    totalPages,
  };
}

/**
 * Build a Paging type from query parameter.
 * A page has 10 item by default. Current page is acquired from query parameter
 * `page`.
 * If the value of `page` is not a number, it is set to 1.
 */
export function getPaging(params: ParamMap, perPage: number = 20): Paging {
  return {
    page: Number.parseInt(params.get('page'), 10) || 1,
    perPage,
  };
}

/**
 * @description Build the pagination query parameters for a request.
 */
export function pagingParams(p: Paging): HttpParams {
  return new HttpParams()
    .set('page', p.page.toFixed())
    .set('per_page', p.perPage?.toFixed() || '20');
}

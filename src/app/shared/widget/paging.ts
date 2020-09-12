import { HttpParams } from '@angular/common/http';
import { ParamMap } from '@angular/router';

export interface Paging {
  page: number;
  perPage?: number;
}

/**
 * Build a Paging type from query parameter.
 * A page has 10 item by default. Current page is aquired from query parameter
 * `page`.
 * If the value of `page` is not a number, it is set to 1.
 */
export function getPaging(params: ParamMap, perPage: number = 10): Paging {
  return {
    page: Number.parseInt(params.get('page')) || 1,
    perPage,
  }
}

/**
 * @description Build the pagination query parameters.
 */
export function pagingParams(p: Paging): HttpParams {
  return new HttpParams()
    .set('page', p.page.toFixed())
    .set('per_page', p.perPage?.toFixed() || '20');
}

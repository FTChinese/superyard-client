import { HttpErrorResponse } from '@angular/common/http';

export interface IApiErrorBody {
  message: string;
  param?: string,
  code?: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
}

interface HttpError {
  message: string;
  notFound?: boolean;
  unprocessable?: {
    param: string;
    code: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
  };
}

/**
 * If the error is returned from API, we only use the `error` field, which is
 * defined as:
 * {
 *  message: string;
 *  param?: string;
 *  code?: 'missing' | 'missing_field' | 'invalid' | 'already_exists'
 * }
 *
 * If the error is Angular's ErrorEvent, the `error` field has similar structure:
 * {
 *  message: string;
 * }
 *
 * If the error neither come from Angular nor from API, for example, the server
 * is down, then the `error` field will a string.
 */
export function parseErrorResponse(errResp: HttpErrorResponse): HttpError {
  if (errResp.error instanceof ErrorEvent) {
    return {
      message: errResp.error.message,
    };
  }

  if (typeof(errResp.error) === 'string') {
    return {
      message: errResp.error,
    };
  }

  return {
    message: errResp.error.message,
    notFound: errResp.status == 404 ? true : false,
    unprocessable: errResp.status == 422 ? {
      param: errResp.error.param,
      code: errResp.error.code,
    } : undefined,
  }
}

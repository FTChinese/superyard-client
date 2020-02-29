import { HttpErrorResponse } from '@angular/common/http';

interface ValidationError {
  field: string;
  code: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
}

export interface IApiErrorBody {
  message: string;
  // param?: string;
  // code?: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
  error?: ValidationError;
}

interface HttpError {
  statusCode: number;
  message: string;
  notFound?: boolean;
  unprocessable?: {
    param: string;
    code: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
  };
}

class RequstError {
  readonly statusCode: number;
  readonly message: string;
  readonly invalid?: ValidationError;

  constructor(statusCode: number, body: string | IApiErrorBody) {
    this.statusCode = statusCode;

    if (typeof body === 'string') {
      this.message = body;
      return;
    }

    this.message = body.message;
    this.invalid = body.error;
  }

  get notFound(): boolean {
    return this.statusCode === 404;
  }

  get unprocessable(): boolean {
    return this.statusCode === 422;
  }

  get invalidObject(): {[k: string]: string} | null {
    if (!this.invalid) {
      return null;
    }

    return {[this.invalid.field]: this.message};
  }
}
/**
 * Two types of errors can occur. The server backend might reject the
 * request, returning an HTTP response with a status code such as 404
 * or 500. These are error responses.
 *
 * Or something could go wrong on the client-side such as a network error
 * that prevents the request from completing successfully or an exception
 * thrown in an RxJS operator.
 * These errors produce JavaScript `ErrorEvent` objects.
 *
 * class HttpErrorResponse {
 *  readoly headers: HttpHeaders;
 *  readonly status: number;
 *  readonly statusText: string;
 *  readonly url: string | null;
 *  readonly ok = false;
 *  readonly type: HttpEventType.Response | HttpEventType.ReponseHeader
 *
 *  readonly name = 'HttpErrorResponse',
 *  readonly message: string; // This is angular's error message.
 *  readonly error: any | null; // ErroEvent, string or server-side response body.
 * }
 *
 * If the error neither come from Angular nor from API, for example, the server
 * is down, then the `error` field will a string.
 */
export function parseErrorResponse(errResp: HttpErrorResponse): RequstError {
  /**
   * interface ErrorEvent extends Event {
   *  readonly colno: number;
   *  readonly error: any;
   *  readonly filename: string;
   *  readonly lineno: number;
   *  readonly message: string;
   * }
   */
  if (errResp.error instanceof ErrorEvent) {
    return new RequstError(errResp.status, errResp.error.message);
  }

  if (typeof(errResp.error) === 'string') {
    return new RequstError(errResp.status, errResp.error);
  }

  return new RequstError(errResp.status, errResp.error);
}

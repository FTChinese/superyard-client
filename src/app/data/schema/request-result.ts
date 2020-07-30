import { HttpErrorResponse } from '@angular/common/http';

// Server-side validation error.
export interface Unprocessable {
  field: string; // Which field goes wrong.
  code: 'missing' | 'missing_field' | 'invalid' | 'already_exists';
}

export interface ApiErrorPayload {
  message: string;
  // Only exists for 422 Unprocessable.
  error?: Unprocessable;
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

export const serviceNames = {
  logIn: 'logIn',
  forgotPassword: 'forgotPassword',
  android: 'android',
  reader: 'reader',
};

// Interpret non-422 status code.
// User RequestError#serviceName
// and status code as key.
const statusCodeMessages: Record<string, string> = {
  logIn_404: 'Invalid credentials',
};

export class RequestError {
  readonly message: string;
  readonly unprocessable?: Unprocessable;
  readonly statusCode: number;

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
   * is down, then the `error` field will be a string.
   */
  static fromResponse(
    errResp: HttpErrorResponse,
    serviceName: string = ''
  ): RequestError {

    return new RequestError(
      errResp,
      serviceName,
    );
  }

  /**
   * @example
   * HTTPErrorResponse:
   * error: "Error occured while trying to proxy to: localhost:4200/api/login"
   * headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
   * message: "Http failure response for http://localhost:4200/api/login: 504 Gateway Timeout"
   * name: "HttpErrorResponse"
   * ok: false
   * status: 504
   * statusText: "Gateway Timeout"
   * url: "http://localhost:4200/api/login"
   */
  constructor(
    errResp: HttpErrorResponse,
    readonly serviceName?: string,
  ) {
    this.statusCode = errResp.status;

    if (isString(errResp.error)) {
      this.message = errResp.message;
      return;
    }

    /**
     * When errResp.error is ErrorEvent
     * interface ErrorEvent extends Event {
     *  readonly colno: number;
     *  readonly error: any;
     *  readonly filename: string;
     *  readonly lineno: number;
     *  readonly message: string;
     * }
     */
    if (errResp.error instanceof ErrorEvent) {
      this.message = errResp.error.error.message;
      return;
    }

    const payload: ApiErrorPayload = errResp.error;

    this.message = payload.message;
    this.unprocessable = payload.error;
  }

  get badRequest(): boolean {
    return this.statusCode === 400;
  }

  get unauthorized(): boolean {
    return this.statusCode === 401;
  }

  // 404 Not Found
  get notFound(): boolean {
    return this.statusCode === 404;
  }

  // 403 Fobidden.
  get fobidden(): boolean {
    return this.statusCode === 403;
  }

  get tooManyRequests(): boolean {
    return this.statusCode === 429;
  }

  get serverError(): boolean {
    return this.statusCode >= 500;
  }

  // Turn 422 error to key-value maps.
  // The key is usually the same as a form
  // field name.
  get toFormFields(): {[k: string]: string} | null {
    if (!this.unprocessable) {
      return null;
    }
    const name = this.unprocessable.field;
    const value = this.message;
    const o = {};
    o[name] = value;
    return o;
  }

  toString(): string {
    const key = statusCodeMessages[`${this.serviceName}_${this.statusCode}`];

    if (key) {
      return key;
    }

    return `Server error: ${this.statusCode} ${this.message}`;
  }
}


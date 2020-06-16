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
  logIn: 'loginIn',
  forgotPassword: 'forgotPassword',
};

// Interpret non-422 status code.
// User RequestError#serviceName
// and status code as key.
const statusCodeMessages: Record<string, string> = {
  logIn_404: 'Invalid credentials',
}

export class RequestError {
  readonly message: string;
  readonly unprocessable?: Unprocessable;

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
  static fromResponse(
    errResp: HttpErrorResponse,
    serviceName: string = ''
  ): RequestError {
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
    return new RequestError(
      errResp.status,
      serviceName,
      errResp.error
    );
  }

  constructor(
    readonly statusCode: number,
    readonly serviceName: string,
    body: ErrorEvent | ApiErrorPayload
  ) {

    if (body instanceof ErrorEvent) {
      this.message = body.message;
      return;
    }

    this.message = body.message;
    this.unprocessable = body.error;
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
    const m = statusCodeMessages[`${this.serviceName}_${this.statusCode}`];

    if (m) {
      return m;
    }

    return `Server error: ${this.statusCode} ${this.message}`;
  }
}


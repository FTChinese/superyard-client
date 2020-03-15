import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestError } from '../models/request-result';
import { IApiApp } from '../models/oauth';

@Injectable()
export class AppFormService {
  private formSubmittedSource = new Subject<IApiApp>();
  private errorsSource = new Subject<RequestError>();

  formSubmitted$ = this.formSubmittedSource.asObservable();
  errorReceived$ = this.errorsSource.asObservable();

  submitForm(data: IApiApp) {
    this.formSubmittedSource.next(data);
  }

  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }
}

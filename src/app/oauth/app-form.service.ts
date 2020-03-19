import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestError } from '../models/request-result';
import { IAppBase } from '../models/oauth';

@Injectable()
export class AppFormService {
  private formSubmittedSource = new Subject<IAppBase>();
  private errorsSource = new Subject<RequestError>();

  formSubmitted$ = this.formSubmittedSource.asObservable();
  errorReceived$ = this.errorsSource.asObservable();

  submitForm(data: IAppBase) {
    this.formSubmittedSource.next(data);
  }

  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppBase } from 'src/app/data/schema/oauth';
import { RequestError } from 'src/app/data/schema/request-result';

@Injectable()
export class AppFormService {
  private formSubmittedSource = new Subject<AppBase>();
  private errorsSource = new Subject<RequestError>();

  formSubmitted$ = this.formSubmittedSource.asObservable();
  errorReceived$ = this.errorsSource.asObservable();

  submitForm(data: AppBase) {
    this.formSubmittedSource.next(data);
  }

  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IReleaseBase } from 'src/app/data/schema/android';
import { RequestError } from 'src/app/data/schema/request-result';

@Injectable()
export class ReleaseService {

  private formSubmittedSource = new Subject<IReleaseBase>();
  private errorsSource = new Subject<RequestError>();

  formSubmitted$ = this.formSubmittedSource.asObservable();
  errorReceived$ = this.errorsSource.asObservable();

  submitForm(data: IReleaseBase) {
    this.formSubmittedSource.next(data);
  }

  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }
}

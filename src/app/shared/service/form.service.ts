import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestError } from '../../data/schema/request-result';

@Injectable()
export class FormService {

  private formSubmittedSource = new Subject<string>();
  private errorsSource = new Subject<RequestError>();
  private formStateSource = new Subject<boolean>();

  formSubmitted$ = this.formSubmittedSource.asObservable();
  errorReceived$ = this.errorsSource.asObservable();
  formEnabled$ = this.formStateSource.asObservable();

  // Pass form data to parent host.
  submit(data: string) {
    this.formSubmittedSource.next(data);
  }

  // Parent host send error messages to form.
  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }

  enable(ok: boolean) {
    this.formStateSource.next(ok);
  }
}

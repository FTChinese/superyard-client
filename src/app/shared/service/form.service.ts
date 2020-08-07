import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestError } from '../../data/schema/request-result';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormService {

  private formSubmittedSource = new Subject<string>();
  private errorsSource = new Subject<RequestError>();
  private formStateSource = new Subject<boolean>();
  private formCreatedSource = new Subject<FormGroup>();

  // Tells host the form is created.
  formCreated$ = this.formCreatedSource.asObservable();
  // Tells host that data will be submitted.
  formSubmitted$ = this.formSubmittedSource.asObservable();
  // Tells child to enabled/disable the form
  formEnabled$ = this.formStateSource.asObservable();
  // Tells child to show any HTTP request error..
  errorReceived$ = this.errorsSource.asObservable();

  // Tell host the form is created.
  created(form: FormGroup) {
    this.formCreatedSource.next(form);
  }

  // Pass form data to parent host.
  submit(data: string) {
    console.log('ForService: data submitted');
    this.formSubmittedSource.next(data);
  }

  // Parent host send error messages to form.
  // For long forms, it's better to handle non-422 error
  // in host component with a toast.
  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }

  // Parent send command to child.
  enable(ok: boolean) {
    this.formStateSource.next(ok);
  }
}

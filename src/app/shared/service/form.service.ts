import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestError } from '../../data/schema/request-result';
import { DynamicControl } from '../widget/control';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

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

  toFormGroup(configs: DynamicControl[]): FormGroup {
    const group: {[key: string]: AbstractControl} = {};

    configs.forEach(control => {
      group[control.key] = new FormControl(
        {
          value: control.value,
          disabled: control.disabled || false,
        },
        control.validators
      );
    });

    return new FormGroup(group);
  }

  // Tell host the form is created.
  created(form: FormGroup) {
    this.formCreatedSource.next(form);
  }

  // Pass form data to parent host.
  submit(data: string) {
    this.formSubmittedSource.next(data);
  }

  // Parent host send error messages to form.
  sendError(err: RequestError) {
    this.errorsSource.next(err);
  }

  // Parent send command to child.
  enable(ok: boolean) {
    this.formStateSource.next(ok);
  }
}

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

  form: FormGroup;

  formSubmitted$ = this.formSubmittedSource.asObservable();
  errorReceived$ = this.errorsSource.asObservable();
  // formEnabled$ = this.formStateSource.asObservable();

  toFormGroup(configs: DynamicControl[]): FormGroup {
    const group: {[key: string]: AbstractControl} = {};

    configs.forEach(config => {
      group[config.key] = new FormControl(config.value, config.validators);
    });

    this.form = new FormGroup(group);

    return this.form;
  }

  // Pass form data to parent host.
  submit(data: string) {
    const d = JSON.stringify(this.form.getRawValue());
    console.log(d);
    this.formSubmittedSource.next(d);
    this.form.disable();
  }

  // Parent host send error messages to form.
  sendError(err: RequestError) {
    this.form.enable();
    this.errorsSource.next(err);
  }

  enable(ok: boolean) {
    if (ok) {
      this.form.enable();
    } else {
      this.form.disable();
    }
    // this.formStateSource.next(ok);
  }
}

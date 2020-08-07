import { Component, OnInit, Input } from '@angular/core';
import { DynamicControl } from '../widget/control';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { FormService } from '../service/form.service';
import { DynamicControlService } from '../service/dynamic-control.service';
import { Button } from '../widget/button';
import { RequestError } from 'src/app/data/schema/request-result';
import { Alert } from '../widget/alert';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {

  @Input() controls: DynamicControl[] = [];
  @Input() button: Button;
  @Input() crossValidator: ValidatorFn;

  form: FormGroup;
  alert: Alert;

  private set submitting(ok: boolean) {
    if (ok) {
      this.form.disable();
      this.button.start();
    } else {
      this.form.enable();
      this.button.stop();
    }
  }

  constructor(
    private formService: FormService,
    private controlService: DynamicControlService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlService.toFormGroup(this.controls, this.crossValidator);

    // Host might need to manipulate this form.
    this.formService.created(this.form);

    this.formService.errorReceived$.subscribe(reqErr => {
      this.submitting = false;
      this.setError(reqErr);
    });

    this.formService.formEnabled$.subscribe(ok => {
      // Explicitly ask to enable form.
      if (ok) {
        this.submitting = false;
      } else {
        // When explicitly ask to disable form, the spinner should not be shown.
        this.form.disable();
      }
    });
  }

  onSubmit() {
    const data = JSON.stringify(this.form.getRawValue());
    this.formService.submit(data);
    this.submitting = true;
  }

  private setError(err: RequestError) {
    console.log('DynamicFormComponent: setting errors manully');

    // When the form is very long, showing alert message at the top
    // of form might not be a good idea since it might scrolled off
    // the screen. In such case a toast might be better.
    if (!err.unprocessable) {
      this.alert = Alert.danger(err.toString());
      return;
    }

    // Use the Unprocessable#field to find which field goes wrong.
    // Use the Unprocessable#code as ValidationErrors' key,
    // and API error response message as fallback error message.
    this.form.get(err.unprocessable.field).setErrors({
      [err.unprocessable.code]: err.message
    });
  }

  onDismissAlert() {
    this.alert = null;
  }
}

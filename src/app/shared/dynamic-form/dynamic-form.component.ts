import { Component, OnInit, Input } from '@angular/core';
import { DynamicControl } from '../widget/control';
import { FormGroup } from '@angular/forms';
import { FormService } from '../service/form.service';
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

  form: FormGroup;
  alert: Alert;
  loading = false;

  private set alertMsg(v: string) {
    this.alert = {
      type: 'danger',
      message: v,
      dismissible: true,
    };
  }

  constructor(
    readonly formService: FormService,
  ) { }

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.controls);
    this.formService.created(this.form);

    this.formService.errorReceived$.subscribe(reqErr => {
      this.form.enable();
      this.loading = false;
      this.setError(reqErr);
    });

    this.formService.formEnabled$.subscribe(ok => {
      this.loading = !ok;
      if (ok) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    })
  }

  onSubmit() {
    const data = JSON.stringify(this.form.getRawValue());
    this.formService.submit(data);
    this.form.disable();
    this.loading = true;
  }

  private setError(err: RequestError) {
    console.log('Setting error manually');

    if (!err.unprocessable) {
      this.alertMsg = err.toString();
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

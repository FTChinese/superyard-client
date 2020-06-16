import { Component, OnInit, Input } from '@angular/core';
import { DynamicControl } from '../widget/control';
import { FormGroup } from '@angular/forms';
import { ControlService } from '../service/control.service';
import { FormService } from '../service/form.service';
import { Button } from '../widget/button';
import { RequestError } from 'src/app/data/schema/request-result';
import { Alert } from '../widget/alert';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ControlService],
})
export class DynamicFormComponent implements OnInit {

  @Input() controls: DynamicControl[] = [];
  @Input() button: Button;

  form: FormGroup;
  alert: Alert;

  private set alertMsg(v: string) {
    this.alert = {
      type: 'danger',
      message: v,
      dismissible: true,
    };
  }

  constructor(
    private controlService: ControlService,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlService.toFormGroup(this.controls);
    this.formService.errorReceived$.subscribe(reqErr => {
      this.setError(reqErr);
    });
    this.formService.formEnabled$.subscribe(ok => {
      if (ok) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    })
  }

  onSubmit() {
    const data = JSON.stringify(this.form.getRawValue());
    console.log(data);
    this.formService.submit(data);
    this.form.disable();
  }

  private setError(err: RequestError) {
    console.log('Setting error manually');
    this.form.enable();
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

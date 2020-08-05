import { Component, Input } from '@angular/core';
import { DynamicControl, transformErrMsg } from '../widget/control';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.scss']
})
export class DynamicControlComponent {
  @Input() control: DynamicControl;
  @Input() form: FormGroup;

  // The current FormControl instance.
  get formControl(): AbstractControl {
    return this.form.get(this.control.key);
  }

  get isInvalid(): boolean {
    return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }

  get errMsg(): string {
    return transformErrMsg(this.control.label, this.formControl.errors);
  }
}

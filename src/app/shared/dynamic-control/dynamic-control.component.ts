import { Component, Input } from '@angular/core';
import { DynamicControl, ControlError } from '../widget/control';
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
    const errors: ControlError = this.formControl.errors;
    console.log(errors);

    if (errors.required) {
      return `${this.control.label} is required`;
    }

    if (errors.email) {
      return 'Please provide a valid email';
    }

    if (errors.mismatched) {
      return `${this.control.label} does not match your previous input`;
    }

    if (errors.min) {
      return `${this.control.label} should not be lower than ${errors.min.min}`;
    }

    if (errors.max) {
      return `${this.control.label} should not be greater than ${errors.max.max}`;
    }

    if (errors.minLength) {
      return `${this.control.label} should have a minimum length of ${errors.minLength.requiredLength}`;
    }

    if (errors.maxLength) {
      return `${this.control.label} should have a maximun length of ${errors.maxLength.requiredLength}`;
    }

    if (errors.pattern) {
      return 'Pattern mismatched';
    }

    if (errors.missing) {
      return 'The requesting resource does not exist, or is removed';
    }

    if (errors.missing_field) {
      return `${this.control.label} is required`;
    }

    if (errors.invalid) {
      return `The value you entered is invalid`;
    }

    if (errors.already_exists) {
      return `The same value for ${this.control.label} already exists. Please use another one.`;
    }

    return '';
  }
}

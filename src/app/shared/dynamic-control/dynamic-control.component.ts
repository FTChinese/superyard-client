import { Component, Input } from '@angular/core';
import { DynamicControl } from '../control';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.scss']
})
export class DynamicControlComponent {
  @Input() config: DynamicControl;
  @Input() form: FormGroup;

  get isValid(): boolean {
    return this.control.valid;
  }

  get control(): AbstractControl {
    return this.form.get(this.config.key);
  }

  // {
  //   min?: {
  //     min: number,
  //     actual: number
  //   };
  //   max?: {
  //     max: number,
  //     actual: number
  //   };
  //   required?: true;
  //   email?: true;
  //   minLength?: {
  //     requiredLength: number,
  //     acutualLength: number
  //   };
  //   maxLength?: {
  //     requiredLength: number,
  //     acutualLength: number
  //   };
  //   pattern?: {
  //     requiredPattern: string,
  //     actualValue: string
  //   };
  // }
  get errMsg(): string {
    const errors = this.control.errors;

    if (errors.required) {
      return `${this.config.label} is required`;
    }

    if (errors.email) {
      return 'Please provide a valid email';
    }

    if (errors.min) {
      return 'Too low';
    }

    if (errors.max) {
      return 'Too high';
    }

    if (errors.minLength) {
      return 'Too short';
    }

    if (errors.maxLength) {
      return 'Too long';
    }

    if (errors.pattern) {
      return 'Pattern mismatched';
    }

    return '';
  }
}

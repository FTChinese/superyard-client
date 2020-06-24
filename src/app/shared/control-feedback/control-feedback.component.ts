import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-control-feedback',
  templateUrl: './control-feedback.component.html',
  styleUrls: ['./control-feedback.component.scss']
})
export class ControlFeedbackComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() desc: string;

  get isInvalid(): boolean {
    console.log('Invalid: %s', this.control.invalid);
    console.log(this.control);
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errMsg(): string {
    const errors = this.control.errors;
    console.log(errors);

    if (errors.required) {
      return 'This field is required';
    }

    if (errors.min) {
      return 'The number is too small';
    }

    if (errors.max) {
      return 'The number is too large';
    }

    return JSON.stringify(errors);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

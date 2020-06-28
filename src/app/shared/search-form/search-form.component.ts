import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlOptions } from '../widget/control';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

interface RequestDone {
  success: boolean;
  error: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {

  @Input() control: ControlOptions;
  // When should it be invisible:
  // UI initiated;
  // Request finished - success or not.
  @Input() set done(m: string) {
    this.inProgress = false;
    if (m) {
      this.errMsg = m;
    }
  }

  @Output() submitted = new EventEmitter<string>();

  form: FormGroup;
  inProgress = false;
  errMsg: string;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      [this.control.key]: new FormControl(this.control.value, this.control.validators)
    });
  }

  get formControl(): AbstractControl {
    return this.form.get(this.control.key);
  }

  get isInvalid(): boolean {
    return this.formControl.invalid;
  }

  submit() {
    console.log('Submitting search keyword %o', this.form.getRawValue());
    console.log('Is invalid: %s', this.isInvalid);

    if (this.isInvalid) {
      console.log('Invalid search');

      this.errMsg = 'Please specify a valid keyword to search';
      return;
    }

    this.inProgress = true;
    this.submitted.emit(JSON.stringify(this.form.getRawValue()));
  }
}

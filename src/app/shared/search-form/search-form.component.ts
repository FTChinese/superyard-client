import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlOptions } from '../widget/control';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {

  @Input() control: ControlOptions;

  form: FormGroup;
  inProgress = false;
  errMsg: string;

  constructor(
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      [this.control.key]: new FormControl(this.control.value, this.control.validators)
    });

    this.formService.errorReceived$.subscribe(reqErr => {
      this.form.enable();
      this.inProgress = false;
      if (reqErr.notFound) {
        this.errMsg = 'No result';
        return;
      }

      this.errMsg = reqErr.message;
    });

    this.formService.formEnabled$.subscribe(ok => {
      this.inProgress = false;
    });
  }

  get formControl(): AbstractControl {
    return this.form.get(this.control.key);
  }

  get isInvalid(): boolean {
    return this.formControl.invalid;
  }

  submit() {
    if (this.isInvalid) {
      console.log('Invalid search');

      this.errMsg = 'Please specify a valid keyword to search';
      return;
    }

    this.clearError();
    this.inProgress = true;
    this.formService.submit(JSON.stringify(this.form.getRawValue()));
  }

  clearError() {
    this.errMsg = '';
  }
}

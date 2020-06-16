import { Component, OnInit, Input } from '@angular/core';
import { ControlOptions } from '../widget/control';
import { Button } from '../widget/button';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {

  @Input() control: ControlOptions;
  @Input() button: Button;

  form: FormGroup;

  errMsg: string;

  constructor(
    private formService: FormService,
  ) { }

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

  onSubmit() {
    console.log('Submitting search keyword %o', this.form.getRawValue());
    console.log('Is invalid: %s', this.isInvalid);

    if (this.isInvalid) {
      console.log('Invalid search');

      this.errMsg = 'Please specify a valid keyword to search';
      return;
    }

    this.formService.submit(JSON.stringify(this.form.getRawValue()));
  }
}

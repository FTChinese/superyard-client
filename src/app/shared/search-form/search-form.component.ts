import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlOptions, transformErrMsg } from '../widget/control';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Search } from '../widget/search';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {

  @Input() control: ControlOptions;
  @Input() placeholder = '';
  @Input() buttonName = 'Search';
  @Input()
  set disabled(yes: boolean) {
    console.log('Disabled form %s', yes);
    if (yes) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Output() submitted = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    keyword: new FormControl('', [
      Validators.required,
      Validators.maxLength(64)
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  get formControl(): AbstractControl {
    return this.form.get('keyword');
  }

  get isInvalid(): boolean {
    return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }

  get errMsg(): string {
    console.log(this.formControl.errors);

    return transformErrMsg('Keyword', this.formControl.errors);
  }

  submit() {
    const data: Search = this.form.value;
    this.disabled = true;
    this.submitted.emit(data.keyword.trim());
  }

}

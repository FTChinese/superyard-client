import { Component, OnInit, Input } from '@angular/core';
import { InputControl, transformErrMsg } from '../widget/control';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit {

  @Input() control: InputControl;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

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

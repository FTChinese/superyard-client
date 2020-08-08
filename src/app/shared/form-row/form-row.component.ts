import { Component, OnInit, Input, Output } from '@angular/core';
import { DynamicControl, transformErrMsg, FieldsetControl, isControlInvalid } from '../widget/control';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent implements OnInit {

  @Input() fieldset: FieldsetControl;
  @Input() controls: DynamicControl[];
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  // Get the control as a group.
  private get groupControl(): AbstractControl {
    return this.form.get(this.fieldset.groupName);
  }

  get isGroupInvalid(): boolean {
    return isControlInvalid(this.groupControl);
  }

  get groupErrMsg(): string {
    return transformErrMsg(this.fieldset.legend, this.groupControl.errors);
  }

  private getControl(key: string): AbstractControl {
    return this.form.get([this.fieldset.groupName, key]);
  }

  isInputInvalid(dc: DynamicControl): boolean {
    return isControlInvalid(this.getControl(dc.key));
  }

  getInputErrMsg(dc: DynamicControl): string {
    return transformErrMsg(dc.label, this.getControl(dc.key));
  }
}

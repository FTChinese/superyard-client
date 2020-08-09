import { Component, OnInit, Input } from '@angular/core';
import { DynamicControl, isControlInvalid, transformErrMsg } from '../widget/control';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-group',
  templateUrl: './dynamic-group.component.html',
  styleUrls: ['./dynamic-group.component.scss']
})
export class DynamicGroupComponent implements OnInit {

  // Thist control acts as the root field of a nested form group.
  // Its groupControls array is used to render a list of input element.
  @Input() control: DynamicControl;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  // Get the control as a group.
  private get groupControl(): AbstractControl {
    return this.form.get(this.control.key);
  }

  // Is the group as a whole valid?
  get isGroupInvalid(): boolean {
    return isControlInvalid(this.groupControl);
  }

  // Group level error
  get groupErrMsg(): string {
    return transformErrMsg(this.control.label, this.groupControl.errors);
  }

  // Get specific control
  private getControl(key: string): AbstractControl {
    return this.form.get([this.control.key, key]);
  }

  isInputInvalid(dc: DynamicControl): boolean {
    return isControlInvalid(this.getControl(dc.key));
  }

  getInputErrMsg(dc: DynamicControl): string {
    return transformErrMsg(dc.label, this.getControl(dc.key));
  }
}

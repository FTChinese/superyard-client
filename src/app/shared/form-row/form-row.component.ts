import { Component, OnInit, Input, Output } from '@angular/core';
import { DynamicControl, transformErrMsg } from '../widget/control';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent implements OnInit {

  @Input() controls: DynamicControl[];
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  private getControl(path: string): AbstractControl {
    return this.form.get(path);
  }

  isInputInvalid(index: number): boolean {
    const ctrl = this.getControl(this.controls[index].key);

    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  getErrMsg(index: number): string {
    const config = this.controls[index];

    return transformErrMsg(config.label, this.getControl(config.key));
  }
}

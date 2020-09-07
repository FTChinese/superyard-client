import { Injectable } from '@angular/core';
import { DynamicControl } from '../widget/control';
import { ValidatorFn, FormGroup, AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicControlService {

  constructor() { }

  toFormGroup(
    configs: DynamicControl[],
    crossValidator?: ValidatorFn
  ): FormGroup {
    const group: {[key: string]: AbstractControl} = {};

    for (const control of configs) {
      if (control.controlType === 'row') {
        group[control.key] = this.toFormGroup(control.rowControls);
      } else {
        group[control.key] = new FormControl(
          {
            value: control.value,
            disabled: control.disabled || false,
          },
          control.validators
        );
      }
    }

    return new FormGroup(group, crossValidator);
  }
}

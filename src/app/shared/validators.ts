import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

/**
 * @description Validates whether two control fields have the same value. This is mostly used by password upating.
 * @param fieldA - control field name
 * @param fieldB - the repeated control field name
 */
export function matchValidator(fieldA: string, fieldB: string): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const controlA = control.get(fieldA);
    const controlB = control.get(fieldB);

    const mismatched = controlA && controlB && controlA.value !== controlB.value;

    if (mismatched) {
      const err = {
        mismatched: true
      };
      controlB.setErrors(err);
      return err;
    }
    return null;
  };
}

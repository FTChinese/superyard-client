import { ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { SelectOption } from 'src/app/data/schema/enum';

type ControlType = 'textbox' | 'dropdown' | 'textarea' | 'group';
type InputType = 'text' | 'email' | 'password' | 'number' | 'url' | 'search' | 'date' | 'datetime-local' | 'time';

/**
 * @description Represent the <opiton> element.
 */
interface OptionElement extends SelectOption<string> {}

export interface ControlOptions {
  value?: any;
  key: string;
  validators?: ValidatorFn[];
  label?: string;
  desc?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
}


/**
 * @description ControlBase configures a new FormGroup(controls: { [key: string]: AbstractControl })
 */
export class DynamicControl {
  // Config Angular FormControl
  value: any;    // new FormControl(value)
  key: string; // new FormGroup( {key: FormControl} ). Also used in label's for and input's formControlName attributes.
  validators?: ValidatorFn[]; // new FormControl(value, validators)
  disabled: boolean; // If true, use new FormControl({ value: value, disabled; true })

  // Override in subclass
  controlType: ControlType; // Used by subclass in the ngSwitch directive.

  // Config the attributes of HTML element.
  label: string; // If `controls` field exists, this could be used on the legend element.
  desc: string;
  placeholder: string;
  readonly: boolean;

  // Overridable
  type: InputType; // <input>'s type attribute.
  options: OptionElement[]; // <option> tag inside <select>.
  groupedControls: DynamicControl[]; // For nested group.

  constructor(opts: ControlOptions) {
    this.value = opts.value || null;
    this.key = opts.key;
    this.validators = opts.validators;

    this.label = opts.label || '';
    this.desc = opts.desc || '';
    this.placeholder = opts.placeholder || '';
    this.readonly = opts.readonly || false;
    this.disabled = opts.disabled || false;
  }
}

interface InputControlOptions extends ControlOptions {
  type: InputType;
}

export function buildSearchOpts(placeholder: string): ControlOptions {
  return {
    value: '',
    key: 'keyword',
    validators: [
      Validators.required,
      Validators.maxLength(64)
    ],
    placeholder,
  };
}


export class InputControl extends DynamicControl {
  controlType: ControlType = 'textbox';
  type: InputType;

  constructor(opts: InputControlOptions) {
    super(opts);
    this.type = opts.type;
  }

  static search(placeholder: string): InputControl {
    return new InputControl({
      value: '',
      key: 'keyword',
      validators: [
        Validators.required,
        Validators.maxLength(64)
      ],
      placeholder,
      type: 'search'
    });
  }
}

interface DropdownControlOptions extends ControlOptions {
  options: OptionElement[];
}

export class DropdownControl extends DynamicControl {
  controlType: ControlType = 'dropdown';
  options: OptionElement[] = [];

  constructor(opts: DropdownControlOptions) {
    super(opts);
    this.options = opts.options;
  }
}

export class TextareaControl extends DynamicControl {
  controlType: ControlType = 'textarea';

  constructor(opts: ControlOptions) {
    super(opts);
  }
}

interface GroupControlOptions extends ControlOptions {
  controls: DynamicControl[];
}

/**
 * @example
 * new GroupControl({
 *  key: 'formGroupName',
 *  label: 'Shown on the legend element',
 *  controls: [
 *    new InputControl({
 *      value: '',
 *      key: 'street',
 *      label: 'Street'
 *    }),
 *    new InputControl({
 *      value: '',
 *      key: 'zip',
 *      label: 'Zip'
 *    }),
 *  ],
 * });
 */
export class GroupControl extends DynamicControl {
  controlType: ControlType = 'group';

  constructor(opts: GroupControlOptions) {
    super(opts);
    this.groupedControls = opts.controls;
  }
}

export interface FieldsetControl {
  groupName: string;
  legend: string;
  controls: DynamicControl[];
}

export function isControlInvalid(ctrl: AbstractControl): boolean {
  return ctrl.invalid && (ctrl.dirty || ctrl.touched);
}

/**
 * @description Defines the form control error fields.
 */
export interface ControlError {
  min?: {
    min: number;
    actual: number;
  };
  max?: {
    max: number;
    actual: number;
  };
  required?: boolean;
  email?: boolean;
  mismatched?: boolean;
  minLength?: {
    requiredLength: number;
    actualLength: number;
  };
  maxLength?: {
    requiredLength: number;
    actualLength: number;
  };
  pattern?: {
    requiredPattern: string;
    actualValue: string;
  };
  missing?: boolean;
  missing_field?: boolean;
  invalid?: boolean;
  already_exists?: boolean;
}

export function transformErrMsg(label: string, errors: ControlError): string {
  if (errors.required) {
    return `${label} is required`;
  }

  if (errors.email) {
    return 'Please provide a valid email';
  }

  if (errors.mismatched) {
    return `${label} does not match your previous input`;
  }

  if (errors.min) {
    return `${label} should not be lower than ${errors.min.min}`;
  }

  if (errors.max) {
    return `${label} should not be greater than ${errors.max.max}`;
  }

  if (errors.minLength) {
    return `${label} should have a minimum length of ${errors.minLength.requiredLength}`;
  }

  if (errors.maxLength) {
    return `${label} should have a maximun length of ${errors.maxLength.requiredLength}`;
  }

  if (errors.pattern) {
    return 'Pattern mismatched';
  }

  if (errors.missing) {
    return 'The requesting resource does not exist, or is removed';
  }

  if (errors.missing_field) {
    return `${label} is required`;
  }

  if (errors.invalid) {
    return `The value you entered is invalid`;
  }

  if (errors.already_exists) {
    return `The same value for ${label} already exists. Please use another one.`;
  }

  return '';
}

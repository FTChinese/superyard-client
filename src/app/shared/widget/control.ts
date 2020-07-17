import { ValidatorFn } from '@angular/forms';

type ControlType = 'textbox' | 'dropdown' | 'textarea';
type InputType = 'text' | 'email' | 'password' | 'number' | 'url' | 'search' | 'date' | 'datetime-local';

/**
 * @description Represent the <opiton> element.
 */
interface OptionElement {
  disabled: boolean;
  name: string;
  value: string;
}

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

interface InputControlOptions extends ControlOptions {
  type: InputType;
}

interface DropdownControlOptions extends ControlOptions {
  options: OptionElement[];
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

  // Override in suclass
  controlType: ControlType; // Used by subclass in the ngSwitch directive.

  // Config the attributes of HTML element.
  label: string;
  desc: string;
  placeholder: string;
  readonly: boolean;

  // Overridable
  type: InputType; // <input>'s type attribute.
  options: OptionElement[]; // <option> tag inside <select>.

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

export class InputControl extends DynamicControl {
  controlType: ControlType = 'textbox';
  type: InputType;

  constructor(opts: InputControlOptions) {
    super(opts);
    this.type = opts.type;
  }
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

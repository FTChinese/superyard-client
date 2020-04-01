import { ValidatorFn } from '@angular/forms';

type ControlType = 'textbox' | 'dropdown' | 'textarea';
type InputType = 'text' | 'email' | 'password' | 'number' | 'url' | 'search';

/**
 * @description Represent the <opiton> element.
 */
interface OptionElement {
  key: string;
  value: string;
}

interface ControlOptions {
  value?: any;
  key: string;
  validators?: ValidatorFn[];
  label?: string;
  desc?: string;
  placeholder?: string;
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
  value: any;    // new FromControl(value)
  key: string; // new FormGroup( {key: FormControl} ). Also used in label's for and input's formControlName attributes.
  validators?: ValidatorFn[]; // new FormControl(value, validators)

  // Override in suclass
  controlType: ControlType; // Use in the ngSwitch directive.

  // Config the attributes of HTML element.
  label: string;
  desc: string;
  placeholder: string;

  // Overridable
  type: InputType; // <input>'s type attribute.
  options: OptionElement[]; // <option> tag inside <select>.

  constructor(options: ControlOptions) {
    this.value = options.value || null;
    this.key = options.key;
    this.validators = options.validators;

    this.label = options.label || '';
    this.desc = options.desc || '';
    this.placeholder = options.placeholder || '';
  }
}

export class InputControl extends DynamicControl {
  controlType: ControlType = 'textbox';
  type: InputType;

  constructor(options: InputControlOptions) {
    super(options);
    this.type = options.type;
  }
}

export class DropdownControl extends DynamicControl {
  controlType: ControlType = 'dropdown';
  options: OptionElement[] = [];

  constructor(options: DropdownControlOptions) {
    super(options);
    this.options = options.options;
  }
}

export class TextareaControl extends DynamicControl {
  controlType: ControlType = 'textarea';

  constructor(options: ControlOptions) {
    super(options);
  }
}

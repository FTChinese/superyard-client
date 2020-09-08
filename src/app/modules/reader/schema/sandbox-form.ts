import { InputControl, DropdownControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Tier, Cycle, cycleOpts } from 'src/app/data/schema/enum';

export const sandboxSuffix = '.sandbox@ftchinese.com';

export interface SandboxUserForm {
  email: string;
  password: string;
}

export interface SandboxPasswordForm {
  password: string;
}

export interface FtcMemberForm {
  ftcId?: string;
  unionId?: string;
  tier: Tier;
  cycle: Cycle;
  expireDate: string;
  payMethod: string;
}

export const pwControl = new InputControl({
  value: '',
  key: 'password',
  validators: [
    Validators.required
  ],
  label: 'Password *',
  type: 'text',
});

export function buildCycleDropdown(tier?: Tier): DropdownControl {
  return new DropdownControl({
    value: null,
    key: 'cycle',
    validators: [Validators.required],
    label: 'Billing Cycle *',
    options: cycleOpts.map(opt => {
      return {
        disabled: (opt.value === 'month' && tier === 'premium') ? true : opt.disabled,
        name: opt.name,
        value: opt.value,
      };
    })
  });
}

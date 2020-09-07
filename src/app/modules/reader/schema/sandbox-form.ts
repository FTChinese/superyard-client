import { InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Tier, Cycle } from 'src/app/data/schema/enum';

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

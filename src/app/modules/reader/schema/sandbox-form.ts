import { InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';

export const sandboxSuffix = '.sandbox@ftchinese.com';

export interface SandboxUserForm {
  email: string;
  password: string;
}

export interface SandboxPasswordForm {
  password: string;
}

export interface FtcMemberForm {
  ftcPlanId: string;
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

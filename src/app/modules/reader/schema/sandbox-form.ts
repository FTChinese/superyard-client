import { InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';

export const testAccountSuffix = '.test@ftchinese.com';

export interface SandboxUserForm {
  email: string;
  password: string;
}

export interface SandboxPasswordForm {
  password: string;
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



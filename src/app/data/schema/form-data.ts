export interface AccountFields {
  id: string;
  userName: string;
  password: string;
  email: string;
  oldPassword: string;
  confirmPassword: string;
  token: string;
  sourceUrl: string;
}

export type Credentials = Pick<AccountFields, 'userName' | 'password'>;

export type EmailForm = Pick<AccountFields, 'email'>;

export type PasswordResetForm = Pick<AccountFields, 'password' | 'confirmPassword'>;

export type PasswordUpdateForm = Pick<AccountFields, 'oldPassword' | 'password' | 'confirmPassword'>;

export type PasswordResetter = Pick<AccountFields, 'token' | 'password'>;
export type PasswordsUpdater = Pick<AccountFields, 'oldPassword' | 'password'>;

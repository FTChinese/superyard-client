import { Product, Plan } from './product';
import { AndroidRelease } from './android';
import { AccountKind } from './enum';

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

export type PasswordResetLetterReq = EmailForm & {
  sourceUrl?: string
};

export type PasswordUpdateForm = Pick<AccountFields, 'oldPassword' | 'password' | 'confirmPassword'>;

export type PasswordResetter = Pick<AccountFields, 'token' | 'password'>;
export type PasswordsUpdater = Pick<AccountFields, 'oldPassword' | 'password'>;

export interface SearchForm {
  keyword: string;
}

// The parameters used when searching a reader.
export interface ReaderSearchParam {
  q: string;
  kind: AccountKind;
}

type ProductBase = Pick<Product, 'tier' | 'heading' | 'smallPrint'>;

export type ProductForm = ProductBase & {
  description: string;
};

export type ProductReq = ProductBase & {
  description: string[];
};

export type PlanForm = Omit<Plan, 'id' | 'createdUtc' | 'createdBy'>;

export type ReleaseForm = Omit<AndroidRelease, 'createdAt' | 'updatedAt'>;

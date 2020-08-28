import { AndroidRelease } from './android';
import { AccountKind } from './enum';
import { Membership } from './reader';
import { AccessToken, OAuthApp } from './oauth';

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

export type MemberForm = Pick<Membership, 'tier' | 'cycle' | 'expireDate' | 'payMethod'>;

export type ReleaseForm = Omit<AndroidRelease, 'createdAt' | 'updatedAt'>;

export type OAuthAppForm = Pick<OAuthApp, 'name' | 'slug' | 'repoUrl' | 'description' | 'homeUrl' | 'callbackUrl'>;
export type PersonalKeyForm = Pick<AccessToken, 'description'>;
export type AppTokenReq = Pick<AccessToken, 'description' | 'clientId'>;
